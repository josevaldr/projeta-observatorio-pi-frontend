import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar({ links }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      
      <div className="p-6 flex-col items-center justify-center border-b border-gray-200">
        <img
          src={logo}
          alt="PROjeta"
          className="h-16 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-[#0F4C8A] text-white"
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
