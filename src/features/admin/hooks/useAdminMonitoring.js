import { useState, useMemo, useEffect } from "react";

export function useAdminMonitoring() {
  const [activeTab, setActiveTab] = useState("entregas"); // 'entregas' | 'avaliacoes'
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterTurma, setFilterTurma] = useState("Todas");
  const [filterStatusAvaliacao, setFilterStatusAvaliacao] = useState("Todos");

  useEffect(() => {
    fetchMonitoringData();
  }, []);

  const fetchMonitoringData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Alunos (para mapear turmas)
      const alunosRes = await fetch("http://127.0.0.1:8000/alunos/");
      let alunosMap = {};
      if (alunosRes.ok) {
        const alunosData = await alunosRes.json();
        const listaAlunos = alunosData.alunos || [];
        listaAlunos.forEach(a => {
          alunosMap[a.id_aluno] = {
            nome: a.nome_usuario || a.usuario?.nome_usuario || `Aluno #${a.id_aluno}`,
            turma: a.turma || "Turma Indefinida"
          };
        });
      }

      // 2. Fetch Projetos
      const projRes = await fetch("http://127.0.0.1:8000/projetos/");
      if (projRes.ok) {
        const resData = await projRes.json();
        const data = Array.isArray(resData) ? resData : (resData.value || []);

        const enriched = await Promise.all(data.map(async p => {
          let avaliacaoFormatada = null;
          let statusAvaliacao = "pendente";

          if (p.cod_id_avaliacao) {
            statusAvaliacao = "avaliado";
            try {
              const evalRes = await fetch(`http://127.0.0.1:8000/avaliacoes/${p.cod_id_avaliacao}`);
              if (evalRes.ok) {
                const evalData = await evalRes.json();
                avaliacaoFormatada = {
                  nota: parseFloat(evalData.conceito) || 0,
                  avaliador: "Professor(a)",
                  data: evalData.data_avaliacao ? evalData.data_avaliacao.split("-").reverse().join("/") : new Date().toLocaleDateString("pt-BR"),
                  comentarios: evalData.feedback || ""
                };
              }
            } catch (e) {
              console.error("Erro avaliacao", e);
            }
          }

          let turmaProjeto = "Não Especificada";
          let membrosNomes = [];

          if (p.equipe && p.equipe.id_alunos) {
            p.equipe.id_alunos.forEach(id_aluno => {
              const alunoData = alunosMap[id_aluno];
              if (alunoData) {
                if (turmaProjeto === "Não Especificada" && alunoData.turma) {
                  turmaProjeto = alunoData.turma;
                }
                membrosNomes.push(alunoData.nome);
              }
            });
          }

          if (membrosNomes.length === 0 && p.equipe?.alunos) {
             membrosNomes = p.equipe.alunos;
          }

          return {
            id: p.id_projeto,
            titulo: p.titulo,
            descricao: p.descricao || "Sem descrição.",
            data_upload: p.data_upload ? p.data_upload.split("-").reverse().join("/") : "Sem data",
            status_projeto: String(p.status_projeto || "pendente").toLowerCase(),
            status_avaliacao: statusAvaliacao,
            link_projeto: p.link_projeto || "",
            turma: turmaProjeto,
            equipe: {
              nome_equipe: p.equipe?.nome_equipe || "Equipe",
              alunos: membrosNomes
            },
            avaliacao: avaliacaoFormatada
          };
        }));

        setSubmissions(enriched);
      }
    } catch (err) {
      console.error("Erro ao carregar monitoramento:", err);
    } finally {
      setLoading(false);
    }
  };

  const turmasList = ["Todas", ...new Set(submissions.map((p) => p.turma))];

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((p) => {
      const matchTurma = filterTurma === "Todas" || p.turma === filterTurma;
      let matchStatus = true;
      if (filterStatusAvaliacao !== "Todos") {
        matchStatus = p.status_avaliacao === filterStatusAvaliacao;
      }
      return matchTurma && matchStatus;
    });
  }, [filterTurma, filterStatusAvaliacao, submissions]);

  return {
    activeTab,
    setActiveTab,
    projetoSelecionado,
    setProjetoSelecionado,
    loading,
    filterTurma,
    setFilterTurma,
    filterStatusAvaliacao,
    setFilterStatusAvaliacao,
    turmasList,
    filteredSubmissions
  };
}
