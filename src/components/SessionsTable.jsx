import React, { useState, useEffect } from 'react';

// Helper function to format date from timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to format time from timestamp
const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Helper function to format duration in seconds to human readable format
const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0m';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h 0m`;
  } else {
    return `${minutes}m`;
  }
};

// Helper function to calculate duration in seconds between two timestamps
const calculateDuration = (clock_in, clock_out) => {
  if (!clock_in) return 0;
  
  const start = new Date(clock_in);
  const end = clock_out ? new Date(clock_out) : new Date();
  
  return Math.floor((end - start) / 1000);
};

const SessionsTable = ({ sessions }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for live duration updates
  useEffect(() => {
    const hasInProgressSession = sessions.some(session => !session.clock_out);
    
    if (hasInProgressSession) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [sessions]);

  // Don't render if no sessions
  if (!sessions || sessions.length === 0) {
    return null;
  }

  // Calculate total duration for completed sessions
  const totalDuration = sessions
    .filter(session => session.clock_out)
    .reduce((total, session) => {
      return total + calculateDuration(session.clock_in, session.clock_out);
    }, 0);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Start Time
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              End Time
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Duration
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {sessions.map((session, index) => {
            const isInProgress = !session.clock_out;
            const duration = calculateDuration(session.clock_in, session.clock_out);
            
            return (
              <tr
                key={session.id}
                className={`
                  border-b border-gray-200 dark:border-gray-700 transition-colors
                  ${index % 2 === 0 
                    ? 'bg-white dark:bg-gray-800' 
                    : 'bg-gray-50 dark:bg-gray-900'
                  }
                  hover:bg-gray-100 dark:hover:bg-gray-700
                `}
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {formatDate(session.clock_in)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {formatTime(session.clock_in)}
                </td>
                <td className="px-4 py-3 text-sm">
                  {isInProgress ? (
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      In Progress
                    </span>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatTime(session.clock_out)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {isInProgress ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {formatDuration(calculateDuration(session.clock_in, null))}
                    </span>
                  ) : (
                    formatDuration(duration)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>

        {/* Table Footer with Total */}
        <tfoot>
          <tr className="bg-gray-100 dark:bg-gray-700 border-t-2 border-gray-300 dark:border-gray-600">
            <td 
              colSpan="3" 
              className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 text-right"
            >
              Total Time:
            </td>
            <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100">
              {formatDuration(totalDuration)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SessionsTable;
