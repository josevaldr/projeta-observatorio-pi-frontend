import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/PROjeta logo.svg";

export default function Sidebar({ links }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const nome = user.nome_usuario || "Usuário";
  const tipo = user.tipo_usuario || "";

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col justify-between">
      
      <div>
        <div className="p-6 flex flex-col items-center justify-center border-b border-gray-200">
          <img
            src={logo}
            alt="PROjeta"
            className="h-16 w-auto object-contain"
          />
        </div>

        <nav className="px-4 space-y-2 mt-4">
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
      </div>

      {/* Perfil na base da Sidebar */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            {nome.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-gray-900 truncate" title={nome}>
              {nome}
            </span>
            {tipo && (
              <span className="text-xs text-gray-500 capitalize truncate">
                {tipo}
              </span>
            )}
          </div>
        </div>
      </div>
      
    </aside>
  );
}
