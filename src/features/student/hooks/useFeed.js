import { useState, useEffect } from "react";

export function useFeed() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.nome_usuario || user.nome || user.name || "Aluno";

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/projetos/");
        if (response.ok) {
          const data = await response.json();
          setProjetos(data);
        }
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);

  return {
    projetos, setProjetos,
    loading, setLoading,
    projetoSelecionado, setProjetoSelecionado,
    userName
  };
}
