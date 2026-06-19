import { useState, useMemo, useEffect } from "react";

export function useProfessorProjects() {
  const [projects, setProjects] = useState([]);
  const [filterClass, setFilterClass] = useState("Todas");
  const [classesList, setClassesList] = useState(["Todas"]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Project Details Modal State
  const [projetoDetalhado, setProjetoDetalhado] = useState(null);

  // Evaluation Modal State
  const [selectedProject, setSelectedProject] = useState(null);
  const [score, setScore] = useState("");
  const [comments, setComments] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id_professor || user.id_usuario || user.id || 16; 

  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      setLoadingInitial(true);
      setErrorMsg("");

      // 1. Fetch alunos map (to discover turmas)
      const resAlunos = await fetch("http://127.0.0.1:8000/alunos/");
      const alunosData = await resAlunos.json();
      const mapTurmas = {};
      (alunosData.alunos || []).forEach(a => {
          mapTurmas[a.id_aluno] = a.turma;
      });

      // 2. Fetch projetos
      const resProjetos = await fetch("http://127.0.0.1:8000/projetos/");
      const projetosData = await resProjetos.json();
      const lista = Array.isArray(projetosData) ? projetosData : (projetosData.value || []);
      
      // 3. Populate turma and evaluation
      const enrichedProjetos = [];
      const turmasSet = new Set();
      
      for (const p of lista) {
          // find turma
          let turma = "Sem turma";
          if (p.equipe && Array.isArray(p.equipe.id_alunos)) {
              for (const id of p.equipe.id_alunos) {
                  if (mapTurmas[id]) {
                      turma = mapTurmas[id];
                      break;
                  }
              }
          }
          if (turma !== "Sem turma") {
             turmasSet.add(String(turma));
          }

          // find evaluation
          let evaluation = null;
          if (p.cod_id_avaliacao) {
              try {
                  const resEval = await fetch(`http://127.0.0.1:8000/avaliacoes/${p.cod_id_avaliacao}`);
                  if (resEval.ok) {
                      const evalData = await resEval.json();
                      evaluation = {
                          score: parseFloat(evalData.conceito) || 0,
                          comments: evalData.feedback || ""
                      };
                  }
              } catch(e) {
                 console.error("Erro ao buscar avaliacao", e);
              }
          }
          
          enrichedProjetos.push({
              id: p.id_projeto || Date.now() + Math.random(),
              title: p.titulo || "Projeto sem título",
              teamName: p.equipe?.nome_equipe || "Sem Equipe",
              class: String(turma),
              uploadDate: p.data_upload || new Date().toISOString().split('T')[0],
              dueDate: "2026-12-31", // Fixed due date for now
              status: evaluation ? "avaliado" : (p.status_projeto ? String(p.status_projeto).toLowerCase() : "aguardando_avaliacao"),
              link: p.link_projeto || "#",
              evaluation: evaluation,
              original: p
          });
      }

      setProjects(enrichedProjetos);
      setClassesList(["Todas", ...Array.from(turmasSet)]);
    } catch (err) {
      console.error("Erro ao carregar projetos:", err);
      setErrorMsg(err.message || "Erro desconhecido ao carregar");
    } finally {
      setLoadingInitial(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (filterClass === "Todas") return projects;
    return projects.filter((p) => String(p.class) === String(filterClass));
  }, [projects, filterClass]);

  const openEvaluation = (project) => {
    setSelectedProject(project);
    setScore(project.evaluation?.score || "");
    setComments(project.evaluation?.comments || "");
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find a valid professor ID to associate with the evaluation
      let finalProfId = userId;
      try {
        const resProfs = await fetch("http://127.0.0.1:8000/professores/");
        if (resProfs.ok) {
           const profsList = await resProfs.json();
           const profs = Array.isArray(profsList) ? profsList : (profsList.value || []);
           const isProf = profs.find(p => p.id_professor === userId || p.id_usuario === userId);
           if (isProf) {
               finalProfId = isProf.id_professor;
           } else if (profs.length > 0) {
               finalProfId = profs[0].id_professor;
           }
        }
      } catch (e) {
         console.warn("Could not fetch professors, using default ID", e);
      }

      // 1. Post evaluation
      const avaliacaoRes = await fetch("http://127.0.0.1:8000/avaliacoes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cod_id_professor: finalProfId,
          conceito: score.toString(),
          feedback: comments
        })
      });

      if (!avaliacaoRes.ok) throw new Error("Erro ao salvar avaliação. Verifique se o professor existe no banco de dados.");
      
      const avaliacaoData = await avaliacaoRes.json();
      const idAvaliacao = avaliacaoData.avaliacao?.id_avaliacao || avaliacaoData.id_avaliacao;

      if (!idAvaliacao) {
         throw new Error("A avaliação foi criada, mas a API não retornou o ID. Tente novamente.");
      }

      // 2. Put projeto update
      const selectedOrig = selectedProject.original;
      const projetoRes = await fetch(`http://127.0.0.1:8000/projetos/${selectedProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: selectedOrig.titulo,
          descricao: selectedOrig.descricao,
          status_projeto: "Avaliado",
          link_projeto: selectedOrig.link_projeto,
          cod_id_avaliacao: idAvaliacao
        })
      });

      if (!projetoRes.ok) throw new Error("Erro ao vincular avaliação ao projeto");

      // Refetch
      alert("Avaliação salva com sucesso!");
      fetchDados();
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao avaliar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isLate = (uploadDate, dueDate) => {
    return new Date(uploadDate) > new Date(dueDate);
  };

  const handleOpenDetails = (project) => {
    setProjetoDetalhado({
      titulo: project.title,
      descricao: project.original.descricao || "Sem descrição disponível.",
      data_upload: project.uploadDate.split("-").reverse().join("/"),
      status_projeto: project.status === "avaliado" ? "concluido" : "em andamento",
      link_projeto: project.link,
      equipe: {
        nome_equipe: project.teamName,
        alunos: project.original.equipe?.alunos || ["Membros não especificados"],
      },
      avaliacao: project.evaluation ? {
        nota: project.evaluation.score,
        comentarios: project.evaluation.comments,
        avaliador: "Professor",
        data: new Date().toLocaleDateString("pt-BR")
      } : null
    });
  };

  return {
    filterClass,
    setFilterClass,
    classesList,
    loadingInitial,
    loading,
    errorMsg,
    projetoDetalhado,
    setProjetoDetalhado,
    selectedProject,
    setSelectedProject,
    score,
    setScore,
    comments,
    setComments,
    filteredProjects,
    openEvaluation,
    handleEvaluate,
    isLate,
    handleOpenDetails
  };
}
