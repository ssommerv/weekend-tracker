import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useAdvancedTasks = (weekendId) => {
  const { user } = useAuth();
  const [taskState, setTaskState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!user || !weekendId) {
      setTaskState({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_advanced_tasks')
        .select('task_index, completed')
        .eq('user_id', user.id)
        .eq('weekend_id', weekendId);

      if (fetchError) throw fetchError;

      const stateMap = {};
      (data || []).forEach((row) => {
        stateMap[row.task_index] = row.completed;
      });

      setTaskState(stateMap);
    } catch (err) {
      console.error('Error fetching advanced tasks:', err);
      setError(err.message || 'Failed to fetch advanced tasks');
    } finally {
      setLoading(false);
    }
  }, [user, weekendId]);

  const toggleTask = useCallback(async (taskIndex, currentValue) => {
    if (!user || !weekendId) {
      setError('User or weekend ID is missing');
      return;
    }

    const nextValue = !currentValue;
    setTaskState((prev) => ({ ...prev, [taskIndex]: nextValue }));

    try {
      const { error: upsertError } = await supabase
        .from('user_advanced_tasks')
        .upsert(
          {
            user_id: user.id,
            weekend_id: weekendId,
            task_index: taskIndex,
            completed: nextValue,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id,weekend_id,task_index' }
        );

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('Error updating advanced task:', err);
      setTaskState((prev) => ({ ...prev, [taskIndex]: currentValue }));
      setError(err.message || 'Failed to update advanced task');
    }
  }, [user, weekendId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    taskState,
    loading,
    error,
    toggleTask,
    refetch: fetchTasks
  };
};
