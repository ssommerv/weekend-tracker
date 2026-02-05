import React from 'react';

const ProgressBar = ({ completed, total = 10 }) => {
  const percentage = Math.min(100, Math.max(0, (completed / total) * 100));
  
  return (
    <div className="w-full">
      {/* Progress text */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {completed}/{total} Weekends Complete
        </span>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          {Math.round(percentage)}%
        </span>
      </div>
      
      {/* Progress bar container */}
      <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        {/* Progress bar fill */}
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-md relative"
          style={{
            width: `${percentage}%`,
          }}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
