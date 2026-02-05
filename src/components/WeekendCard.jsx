import React from 'react';

const WeekendCard = ({ 
  weekend, 
  isCompleted, 
  notes, 
  onToggleComplete, 
  onNotesChange 
}) => {
  const { id, title, description, deliverable } = weekend;

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300
        ${isCompleted 
          ? 'opacity-75 border-2 border-green-300 dark:border-green-700' 
          : 'border-2 border-transparent hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700'
        }
      `}
    >
      {/* Header with checkbox and weekend number */}
      <div className="flex items-start gap-4 mb-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            id={`weekend-${id}`}
            checked={isCompleted}
            onChange={onToggleComplete}
            className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-all"
          />
        </div>

        {/* Weekend number and title */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Weekend {id}
            </span>
            {isCompleted && (
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                ✓ Complete
              </span>
            )}
          </div>
          <h3
            className={`
              text-xl font-bold mb-2 transition-all
              ${isCompleted 
                ? 'line-through text-gray-500 dark:text-gray-500' 
                : 'text-gray-900 dark:text-gray-100'
              }
            `}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        className={`
          mb-4 text-gray-700 dark:text-gray-300 leading-relaxed
          ${isCompleted ? 'opacity-70' : ''}
        `}
      >
        {description}
      </p>

      {/* Deliverable */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mr-2">
          Deliverable:
        </span>
        <span
          className={`
            text-sm font-medium
            ${isCompleted 
              ? 'text-gray-500 dark:text-gray-500 line-through' 
              : 'text-blue-600 dark:text-blue-400'
            }
          `}
        >
          {deliverable}
        </span>
      </div>

      {/* Notes section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <label
          htmlFor={`notes-${id}`}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Notes:
        </label>
        <textarea
          id={`notes-${id}`}
          value={notes || ''}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add your notes, thoughts, or progress updates here..."
          rows={4}
          className={`
            w-full px-4 py-3 rounded-lg border-2 resize-y
            bg-gray-50 dark:bg-gray-900
            border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${isCompleted ? 'opacity-80' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default WeekendCard;
