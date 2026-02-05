import ProgressBar from './ProgressBar';
import UserMenu from './UserMenu';

const Header = ({ completedCount = 0, totalCount = 10 }) => {
  return (
    <header className="w-full py-8 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* User Menu - Top Right */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4">
        <UserMenu />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* App Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            AI New Years Challenge
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
            {totalCount}-Week Progress Tracker
          </p>
        </div>

        {/* Progress Bar */}
        <div className="pt-4">
          <ProgressBar completed={completedCount} total={totalCount} />
        </div>
      </div>
    </header>
  );
};

export default Header;
