import { useTimeTracking } from '../hooks/useTimeTracking';
import TimeTracker from './TimeTracker';
import SessionsTable from './SessionsTable';

const WeekendCard = ({ 
  weekend, 
  isCompleted,
  isSuggested,
  notes, 
  onToggleComplete, 
  onNotesChange 
}) => {
  const { id, title, description, deliverable } = weekend;
  const { sessions, activeSession, loading, clockIn, clockOut } = useTimeTracking(id);

  // Determine card border styling based on state
  const getCardBorderClass = () => {
    if (isCompleted) {
      return 'opacity-75 border-2 border-green-300 dark:border-green-700';
    }
    if (isSuggested) {
      return 'border-2 border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/20 dark:shadow-blue-400/20 ring-2 ring-blue-500/20 dark:ring-blue-400/20';
    }
    return 'border-2 border-transparent hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700';
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300
        ${getCardBorderClass()}
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
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Weekend {id}
            </span>
            {isCompleted && (
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                ✓ Complete
              </span>
            )}
            {isSuggested && !isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 animate-pulse">
                ★ UP NEXT
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

      {/* Time Tracking Section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Time Tracking:
          </label>
          <TimeTracker
            activeSession={activeSession}
            onClockIn={clockIn}
            onClockOut={clockOut}
            loading={loading}
          />
        </div>
        
        {/* Sessions Table - only shows after first clock in */}
        <SessionsTable sessions={sessions} />
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
