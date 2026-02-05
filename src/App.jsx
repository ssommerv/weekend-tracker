import Header from './components/Header';
import WeekendList from './components/WeekendList';
import AuthForm from './components/AuthForm';
import weekends from './data/weekends';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading, toggleComplete, updateNotes } = useProgress();

  // Calculate completed count
  const completedCount = Object.values(progress).filter(p => p.completed).length;

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <AuthForm />
      </div>
    );
  }

  // Show tracker for logged-in users
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header completedCount={completedCount} totalCount={weekends.length} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {progressLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your progress...</p>
          </div>
        ) : (
          <WeekendList
            weekends={weekends}
            progress={progress}
            onToggleComplete={toggleComplete}
            onNotesChange={updateNotes}
          />
        )}
      </main>

      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        AI New Years 10-Week Challenge Tracker
      </footer>
    </div>
  );
}

export default App;
