import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="bg-blue-600">
      <div className="container mx-auto p-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:underline"
            >
              Home
            </Link>
            <Link
              to="/roster"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:underline"
            >
              Roster
            </Link>
            <Link
              to="/battle"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:underline"
            >
              Battle
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:underline"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
