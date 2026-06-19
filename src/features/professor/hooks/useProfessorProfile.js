import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useProfessorProfile() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  
  const userId = user.id_usuario || user.id || 0;

  const [nome, setNome] = useState(user.nome_usuario || user.nome || "");
  const [email, setEmail] = useState(user.email || "");

  // dados do professor que vêm da API
  const [profData, setProfData] = useState({
    especialidade: "",
  });

  useEffect(() => {
    fetchProfessorData();
  }, [userId]);

  const fetchProfessorData = async () => {
    try {
      const resProfs = await fetch("http://127.0.0.1:8000/professores/");
      if (resProfs.ok) {
         const profsList = await resProfs.json();
         const profs = Array.isArray(profsList) ? profsList : (profsList.value || []);
         const myProf = profs.find(p => p.id_professor === userId || p.id_usuario === userId) || profs[0];
         if (myProf) {
            setProfData({
               especialidade: myProf.especialidade || "Não informada",
            });
         }
      }
    } catch (e) {
       console.error("Erro ao carregar dados do professor", e);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nome_usuario: nome,
        email: email,
        senha: "not_updated", // dummy para passar na validação do backend
        tipo_usuario: user.tipo_usuario || "professor"
      };

      const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedUser = { ...user, nome_usuario: nome, nome: nome, email: email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditando(false);
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar o perfil. Verifique os dados.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // handler de logout (sair)
  const handleSair = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return {
    editando,
    setEditando,
    loading,
    user,
    nome,
    setNome,
    email,
    setEmail,
    profData,
    handleSalvar,
    handleSair
  };
}
