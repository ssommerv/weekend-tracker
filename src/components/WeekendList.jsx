import React from 'react';
import WeekendCard from './WeekendCard';

const WeekendList = ({ weekends, progress, onToggleComplete, onNotesChange }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
      {weekends.map((weekend) => {
        const weekendProgress = progress[weekend.id] || { completed: false, notes: '' };
        
        return (
          <WeekendCard
            key={weekend.id}
            weekend={weekend}
            isCompleted={weekendProgress.completed}
            notes={weekendProgress.notes}
            onToggleComplete={() => onToggleComplete(weekend.id)}
            onNotesChange={(notes) => onNotesChange(weekend.id, notes)}
          />
        );
      })}
    </div>
  );
};

export default WeekendList;
