import React, { useState, useEffect } from 'react';

const TimeTracker = ({ activeSession, onClockIn, onClockOut, loading = false }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Calculate and update elapsed time every second
  useEffect(() => {
    if (!activeSession?.clock_in) {
      setElapsedTime(0);
      return;
    }

    const calculateElapsed = () => {
      const clockInTime = new Date(activeSession.clock_in).getTime();
      const now = Date.now();
      const elapsed = Math.floor((now - clockInTime) / 1000); // elapsed time in seconds
      setElapsedTime(elapsed);
    };

    // Calculate immediately
    calculateElapsed();

    // Update every second
    const interval = setInterval(calculateElapsed, 1000);

    // Cleanup interval on unmount or when activeSession changes
    return () => clearInterval(interval);
  }, [activeSession?.clock_in]);

  // Format elapsed time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isClockedIn = !!activeSession?.clock_in;

  return (
    <div className="flex items-center gap-4">
      {isClockedIn ? (
        <>
          {/* Timer Display */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-mono font-bold text-gray-900 dark:text-gray-100">
              {formatTime(elapsedTime)}
            </span>
          </div>

          {/* Clock Out Button */}
          <button
            onClick={onClockOut}
            disabled={loading}
            className={`
              px-6 py-2 rounded-lg font-semibold text-white
              bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              transition-all duration-200
              flex items-center gap-2
              ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Clock Out...</span>
              </>
            ) : (
              <>
                <span>⏹</span>
                <span>Clock Out</span>
              </>
            )}
          </button>
        </>
      ) : (
        /* Clock In Button */
        <button
          onClick={onClockIn}
          disabled={loading}
          className={`
            px-6 py-2 rounded-lg font-semibold text-white
            bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            transition-all duration-200
            flex items-center gap-2
            ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Clock In...</span>
            </>
          ) : (
            <>
              <span>▶</span>
              <span>Clock In</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TimeTracker;
