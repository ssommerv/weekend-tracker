import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useTimeTracking = (weekendId) => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = useCallback(async () => {
    if (!user || !weekendId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('time_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('weekend_id', weekendId)
        .order('clock_in', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setSessions(data || []);

      // Check for active session (clock_out is null)
      const active = (data || []).find(session => session.clock_out === null);
      setActiveSession(active || null);
    } catch (err) {
      setError(err.message || 'Failed to fetch sessions');
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  }, [user, weekendId]);

  const clockIn = useCallback(async () => {
    if (!user || !weekendId) {
      setError('User or weekend ID is missing');
      return;
    }

    if (activeSession) {
      setError('You already have an active session. Please clock out first.');
      return;
    }

    try {
      setError(null);

      const { data, error: clockInError } = await supabase
        .from('time_sessions')
        .insert({
          user_id: user.id,
          weekend_id: weekendId,
          clock_in: new Date().toISOString(),
          clock_out: null
        })
        .select()
        .single();

      if (clockInError) {
        throw clockInError;
      }

      // Update state
      setActiveSession(data);
      setSessions(prev => [data, ...prev]);
    } catch (err) {
      setError(err.message || 'Failed to clock in');
      console.error('Error clocking in:', err);
      throw err;
    }
  }, [user, weekendId, activeSession]);

  const clockOut = useCallback(async () => {
    if (!activeSession) {
      setError('No active session to clock out from');
      return;
    }

    try {
      setError(null);

      const clockOutTime = new Date().toISOString();

      const { data, error: clockOutError } = await supabase
        .from('time_sessions')
        .update({ clock_out: clockOutTime })
        .eq('id', activeSession.id)
        .select()
        .single();

      if (clockOutError) {
        throw clockOutError;
      }

      // Update state
      setActiveSession(null);
      setSessions(prev => prev.map(session => 
        session.id === activeSession.id ? data : session
      ));
    } catch (err) {
      setError(err.message || 'Failed to clock out');
      console.error('Error clocking out:', err);
      throw err;
    }
  }, [activeSession]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    activeSession,
    loading,
    error,
    clockIn,
    clockOut,
    fetchSessions
  };
};
