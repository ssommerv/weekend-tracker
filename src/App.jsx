import Header from './components/Header';
import WeekendList from './components/WeekendList';
import weekends from './data/weekends';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  // Initialize progress state with localStorage persistence
  const [progress, setProgress] = useLocalStorage('weekend-tracker-progress', {});

  // Calculate completed count
  const completedCount = Object.values(progress).filter(p => p.completed).length;

  // Handler for toggling weekend completion
  const handleToggleComplete = (weekendId) => {
    setProgress(prev => ({
      ...prev,
      [weekendId]: {
        ...prev[weekendId],
        completed: !prev[weekendId]?.completed,
        notes: prev[weekendId]?.notes || ''
      }
    }));
  };

  // Handler for updating notes
  const handleNotesChange = (weekendId, notes) => {
    setProgress(prev => ({
      ...prev,
      [weekendId]: {
        ...prev[weekendId],
        completed: prev[weekendId]?.completed || false,
        notes
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header completedCount={completedCount} totalCount={weekends.length} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <WeekendList
          weekends={weekends}
          progress={progress}
          onToggleComplete={handleToggleComplete}
          onNotesChange={handleNotesChange}
        />
      </main>

      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        AI New Years 10-Week Challenge Tracker
      </footer>
    </div>
  );
}

export default App;
