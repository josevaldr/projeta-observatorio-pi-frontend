import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      
      // Redireciona o usuário para o painel correspondente ao seu cargo
      switch (user.tipo_usuario) {
        case "aluno":
          return <Navigate to="/aluno" replace />;
        case "professor":
          return <Navigate to="/professor" replace />;
        case "admin":
        case "coordenacao":
        case "coordenador":
          return <Navigate to="/admin" replace />;
        case "empresa":
          return <Navigate to="/empresa" replace />;
        default:
          // Se for um cargo desconhecido, limpa e deixa logar de novo
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          return children;
      }
    } catch (error) {
      // Se der erro ao ler o JSON, o dado pode estar corrompido.
      // Limpamos a sujeira e deixamos ele acessar a tela de login.
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      return children;
    }
  }

  // Se NÃO estiver logado, deixa renderizar a página (Login ou Cadastro)
  return children;
}
