import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAdminProfile() {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const userId = user.id_usuario || user.id || 0;

  const [nome, setNome] = useState(user.nome_usuario || user.nome || "");
  const [email, setEmail] = useState(user.email || "");
  const [curso, setCurso] = useState("");

  const tipoUsuario = user.tipo_usuario || "coordenação";

  useEffect(() => {
    fetchCoordenadorData();
  }, []);

  const fetchCoordenadorData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/coordenadores/");
      if (res.ok) {
        const data = await res.json();
        const listaCoords = Array.isArray(data) ? data : (data.value || []);
        // Find by ID or email
        const myCoord = listaCoords.find(c => c.id_coordenador === userId || c.email === user.email);
        if (myCoord && myCoord.curso) {
          setCurso(myCoord.curso);
        }
      }
    } catch (err) {
      console.error("Erro ao buscar curso do coordenador", err);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Update basic user data
      const payloadUser = {
        nome_usuario: nome,
        email: email,
        senha: "not_updated",
        tipo_usuario: tipoUsuario
      };

      const responseUser = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadUser)
      });

      // 2. Update coord specific data (curso)
      let coordSuccess = true;
      if (curso) {
        const payloadCoord = {
          id_coordenador: userId,
          curso: curso
        };
        const resCoord = await fetch(`http://127.0.0.1:8000/coordenadores/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadCoord)
        });
        if (!resCoord.ok) {
           coordSuccess = false;
        }
      }

      if (responseUser.ok && coordSuccess) {
        const updatedUser = { ...user, nome_usuario: nome, nome: nome, email: email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditando(false);
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Perfil atualizado parcialmente ou com erro.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

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
    tipoUsuario,
    nome,
    setNome,
    email,
    setEmail,
    curso,
    setCurso,
    handleSalvar,
    handleSair
  };
}
