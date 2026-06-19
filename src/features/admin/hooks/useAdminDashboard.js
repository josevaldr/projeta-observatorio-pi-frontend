import { useState, useEffect } from "react";

export function useAdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalClasses: 0,
    totalTeachers: 0,
    projectsSubmitted: 0,
    pendingEvaluations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Turmas (baseado nos alunos)
      let uniqueClasses = new Set();
      const alunosRes = await fetch("http://127.0.0.1:8000/alunos/");
      if (alunosRes.ok) {
        const alunosData = await alunosRes.json();
        const listaAlunos = alunosData.alunos || [];
        listaAlunos.forEach(a => {
          if (a.turma) uniqueClasses.add(a.turma);
        });
      }

      // 2. Fetch Professores
      let teachersCount = 0;
      const profsRes = await fetch("http://127.0.0.1:8000/professores/");
      if (profsRes.ok) {
        const profsData = await profsRes.json();
        const listProfs = Array.isArray(profsData) ? profsData : (profsData.professores || []);
        teachersCount = listProfs.length;
      }

      // 3. Fetch Projetos (Submetidos e Pendentes de Avaliação)
      let projectsCount = 0;
      let pendingCount = 0;
      const projRes = await fetch("http://127.0.0.1:8000/projetos/");
      if (projRes.ok) {
        const resData = await projRes.json();
        const projetos = Array.isArray(resData) ? resData : (resData.value || []);
        projectsCount = projetos.length;
        
        pendingCount = projetos.filter(p => {
          const status = String(p.status_projeto || "").toLowerCase();
          return status === "pendente" || !p.cod_id_avaliacao;
        }).length;
      }

      setMetrics({
        totalClasses: uniqueClasses.size,
        totalTeachers: teachersCount,
        projectsSubmitted: projectsCount,
        pendingEvaluations: pendingCount,
      });

    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    loading
  };
}
