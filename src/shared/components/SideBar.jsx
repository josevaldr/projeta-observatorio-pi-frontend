import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">PROjeta</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          // Check if the current URL matches the link's path to highlight it
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
