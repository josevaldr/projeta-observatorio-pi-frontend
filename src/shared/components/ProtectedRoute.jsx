import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  // Recupera as credenciais e dados do localStorage
  const userStr = localStorage.getItem("user");
  const authToken = localStorage.getItem("authToken");

  // Se não tem dados do usuário, não está logado
  if (!userStr) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const user = JSON.parse(userStr);

    // Se foram especificadas permissões, verifica se o tipo do usuário está na lista
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.tipo_usuario)) {
        // Se não tem o tipo correto, desloga ou volta para o login
        return <Navigate to="/login" replace />;
      }
    }

    // Se está autenticado e com permissão, renderiza o componente filho (a rota protegida)
    return children;
  } catch (error) {
    // Se der erro no parse do JSON, limpa dados corrompidos e manda pro login
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
