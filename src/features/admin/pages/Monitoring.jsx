import { useState, useMemo, useEffect } from "react";
import ProjectModal from "../../projects/components/ProjectModal";

export default function Monitoring() {
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

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      <header className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Monitoramento</h1>
        <p className="text-gray-500">
          Acompanhe as submissões das equipes e supervisione as notas atribuídas pelos professores.
        </p>
      </header>

      {/* TABS NAVIGATION */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("entregas")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === "entregas"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          📦 Entregas e Submissões
        </button>
        <button
          onClick={() => setActiveTab("avaliacoes")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === "avaliacoes"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          📝 Avaliações e Notas
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Turma</label>
          <select value={filterTurma} onChange={(e) => setFilterTurma(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {turmasList.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status da Avaliação</label>
          <select value={filterStatusAvaliacao} onChange={(e) => setFilterStatusAvaliacao(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="Todos">Todos</option>
            <option value="avaliado">Avaliado</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
      </div>

      {/* LIST CONTENT */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Carregando submissões...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="p-4">Projeto / Equipe</th>
                  <th className="p-4">Turma</th>
                  <th className="p-4">Data Envio</th>
                  <th className="p-4">
                    {activeTab === "entregas" ? "Status Entrega" : "Nota / Feedback"}
                  </th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredSubmissions.map((proj) => (
                  <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{proj.titulo}</p>
                      <p className="text-gray-500 text-xs">Equipe: {proj.equipe.nome_equipe}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900">{proj.turma}</p>
                    </td>
                    <td className="p-4 text-gray-700">{proj.data_upload}</td>
                    
                    {/* Dynamic Column based on Tab */}
                    <td className="p-4">
                      {activeTab === "entregas" ? (
                        <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          Submetido
                        </span>
                      ) : (
                        proj.status_avaliacao === "avaliado" && proj.avaliacao ? (
                          <div>
                            <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-1">
                              Nota: {proj.avaliacao.nota.toFixed(1)}
                            </span>
                            <p className="text-xs text-gray-500 line-clamp-1 italic">"{proj.avaliacao.comentarios}"</p>
                          </div>
                        ) : (
                          <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                            Pendente
                          </span>
                        )
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setProjetoSelecionado(proj)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:border-blue-400 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredSubmissions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      Nenhum projeto encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProjectModal
        projetoSelecionado={projetoSelecionado}
        onClose={() => setProjetoSelecionado(null)}
      />
    </div>
  );
}
