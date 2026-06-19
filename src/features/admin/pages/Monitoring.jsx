import ProjectModal from "../../projects/components/ProjectModal";
import { useAdminMonitoring } from "../hooks/useAdminMonitoring";

export default function Monitoring() {
  const {
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
  } = useAdminMonitoring();

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
