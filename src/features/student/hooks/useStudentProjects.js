import { useState, useEffect } from "react";

export function useStudentProjects() {
  const [view, setView] = useState("list"); // 'list' | 'new'
  const [meusProjetos, setMeusProjetos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  // Estados do Formulário de Projeto
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [nomeEquipe, setNomeEquipe] = useState("");

  // Estados de Alunos para a Equipe
  const [allAlunos, setAllAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [alunosDaTurma, setAlunosDaTurma] = useState([]);
  const [selectedMembros, setSelectedMembros] = useState([]); // array de id_aluno
  const [searchTerm, setSearchTerm] = useState(""); // Filtro por nome

  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id_usuario || user.id || 0; 

  useEffect(() => {
    fetchProjetos();
    fetchAlunos();
  }, []);

  const fetchProjetos = async () => {
    try {
      setLoadingInitial(true);
      const response = await fetch("http://127.0.0.1:8000/projetos/");
      if (response.ok) {
        const resData = await response.json();
        const data = Array.isArray(resData) ? resData : (resData.value || []);
        
        const meus = data.filter(p => p.equipe && p.equipe.id_alunos && p.equipe.id_alunos.includes(userId));
        
        const enriched = await Promise.all(meus.map(async p => {
          let avaliacaoFormatada = null;
          if (p.cod_id_avaliacao) {
            try {
               const evalRes = await fetch(`http://127.0.0.1:8000/avaliacoes/${p.cod_id_avaliacao}`);
               if (evalRes.ok) {
                  const evalData = await evalRes.json();
                  avaliacaoFormatada = {
                     nota: parseFloat(evalData.conceito) || 0,
                     comentarios: evalData.feedback || "",
                     avaliador: "Professor(a)",
                     data: evalData.data_avaliacao ? evalData.data_avaliacao.split("-").reverse().join("/") : new Date().toLocaleDateString("pt-BR")
                  };
               }
            } catch (e) {
               console.error("Erro ao carregar avaliacao", e);
            }
          }

          let rawStatus = String(p.status_projeto || "pendente").toLowerCase();
          if (rawStatus === "avaliado") rawStatus = "concluido";

          return {
            ...p,
            status_projeto: rawStatus,
            data_upload: p.data_upload ? p.data_upload.split("-").reverse().join("/") : "Sem data",
            avaliacao: avaliacaoFormatada
          };
        }));

        setMeusProjetos(enriched);
      }
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
    } finally {
      setLoadingInitial(false);
    }
  };

  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/alunos/");
      if (response.ok) {
        const data = await response.json();
        const listaAlunos = data.alunos || [];
        setAllAlunos(listaAlunos);

        const turmasUnicas = [...new Set(listaAlunos.map(a => a.turma).filter(Boolean))];
        setTurmas(turmasUnicas);
      }
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
    }
  };

  useEffect(() => {
    if (selectedTurma) {
      const filtrados = allAlunos.filter(a => a.turma === selectedTurma);
      setAlunosDaTurma(filtrados);
    } else {
      setAlunosDaTurma([]);
    }
  }, [selectedTurma, allAlunos]);

  const handleToggleMembro = (idAluno) => {
    if (selectedMembros.includes(idAluno)) {
      setSelectedMembros(selectedMembros.filter(id => id !== idAluno));
    } else {
      setSelectedMembros([...selectedMembros, idAluno]);
    }
  };

  const handleSubmeterProjeto = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const projetoRes = await fetch("http://127.0.0.1:8000/projetos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descricao,
          link_projeto: link,
          status_projeto: "Pendente"
        })
      });
      if (!projetoRes.ok) throw new Error("Erro ao criar projeto");
      const projetoData = await projetoRes.json();
      const idProjeto = projetoData.id_projeto;

      const equipeRes = await fetch("http://127.0.0.1:8000/equipes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_equipe: nomeEquipe || "Equipe do Projeto",
          cod_id_projeto: idProjeto
        })
      });
      if (!equipeRes.ok) throw new Error("Erro ao criar equipe");
      const equipeData = await equipeRes.json();
      const idEquipe = equipeData.id_equipe;

      const semestre = "2026.1";
      const todosMembros = [...new Set([userId, ...selectedMembros])];

      for (const membroId of todosMembros) {
        if (!membroId) continue;
        
        await fetch(`http://127.0.0.1:8000/equipes/${idEquipe}/alunos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cod_id_aluno: membroId,
            semestre: semestre
          })
        });
      }

      alert("Projeto submetido com sucesso!");

      setTitulo("");
      setDescricao("");
      setLink("");
      setNomeEquipe("");
      setSelectedTurma("");
      setSelectedMembros([]);
      setSearchTerm("");
      setView("list");
      
      fetchProjetos();
    } catch (err) {
      console.error(err);
      alert("Houve um erro na submissão: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    view, setView,
    meusProjetos, setMeusProjetos,
    projetoSelecionado, setProjetoSelecionado,
    titulo, setTitulo,
    descricao, setDescricao,
    link, setLink,
    nomeEquipe, setNomeEquipe,
    turmas, selectedTurma, setSelectedTurma,
    alunosDaTurma, selectedMembros, setSelectedMembros, handleToggleMembro,
    searchTerm, setSearchTerm,
    loading, loadingInitial,
    userId,
    handleSubmeterProjeto
  };
}
