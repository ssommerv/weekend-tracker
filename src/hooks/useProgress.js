import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

/**
 * Custom hook to manage user progress with Supabase
 * Fetches progress on mount and provides methods to update it
 */
export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's progress from Supabase
  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgress({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_progress')
        .select('weekend_id, completed, notes')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      // Convert array to object keyed by weekend_id
      const progressMap = {};
      data?.forEach(item => {
        progressMap[item.weekend_id] = {
          completed: item.completed,
          notes: item.notes || ''
        };
      });

      setProgress(progressMap);
    } catch (err) {
      console.error('Error fetching progress:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch progress when user changes
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Toggle completion status for a weekend
  const toggleComplete = useCallback(async (weekendId) => {
    if (!user) return;

    const currentProgress = progress[weekendId] || { completed: false, notes: '' };
    const newCompleted = !currentProgress.completed;

    // Optimistic update
    setProgress(prev => ({
      ...prev,
      [weekendId]: {
        ...currentProgress,
        completed: newCompleted
      }
    }));

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          weekend_id: weekendId,
          completed: newCompleted,
          notes: currentProgress.notes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,weekend_id'
        });

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('Error updating completion:', err);
      // Revert optimistic update on error
      setProgress(prev => ({
        ...prev,
        [weekendId]: currentProgress
      }));
      setError(err.message);
    }
  }, [user, progress]);

  // Update notes for a weekend
  const updateNotes = useCallback(async (weekendId, notes) => {
    if (!user) return;

    const currentProgress = progress[weekendId] || { completed: false, notes: '' };

    // Optimistic update
    setProgress(prev => ({
      ...prev,
      [weekendId]: {
        ...currentProgress,
        notes
      }
    }));

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          weekend_id: weekendId,
          completed: currentProgress.completed,
          notes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,weekend_id'
        });

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('Error updating notes:', err);
      // Revert optimistic update on error
      setProgress(prev => ({
        ...prev,
        [weekendId]: currentProgress
      }));
      setError(err.message);
    }
  }, [user, progress]);

  return {
    progress,
    loading,
    error,
    toggleComplete,
    updateNotes,
    refetch: fetchProgress
  };
}
