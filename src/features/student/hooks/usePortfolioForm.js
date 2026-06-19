import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TEMAS = [
  { id: "blue", nome: "Azul Profissional", cor: "bg-blue-600" },
  { id: "amber", nome: "Âmbar Criativo", cor: "bg-amber-500" },
  { id: "emerald", nome: "Esmeralda Tech", cor: "bg-emerald-600" },
  { id: "violet", nome: "Violeta Moderno", cor: "bg-violet-600" },
  { id: "slate", nome: "Cinza Minimalista", cor: "bg-slate-800" },
];

export function usePortfolioForm() {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.nome_usuario || "mariasilva";
  const userId = user.id_usuario || user.id || 0;

  const [bio, setBio] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [temaSelecionado, setTemaSelecionado] = useState("blue");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/alunos/${userId}/perfil`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.message) {
            setBio(data.bio || "");
            setHabilidades(data.habilidades || "");
            setLinkedin(data.linkedin || "");
            setGithub(data.github || "");
            setTemaSelecionado(data.tema || "blue");
          }
        })
        .catch(err => console.error("Erro ao carregar perfil:", err));
    }
  }, [userId]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        bio,
        habilidades,
        linkedin,
        github,
        tema: temaSelecionado
      };
      
      const response = await fetch(`http://127.0.0.1:8000/alunos/${userId}/perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("Portfólio atualizado com sucesso!");
      } else {
        alert("Erro ao salvar o portfólio.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro na conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleVisualizar = () => {
    navigate(`/portfolio/${username}`);
  };

  return {
    bio, setBio,
    habilidades, setHabilidades,
    linkedin, setLinkedin,
    github, setGithub,
    temaSelecionado, setTemaSelecionado,
    loading,
    handleSalvar,
    handleVisualizar
  };
}
