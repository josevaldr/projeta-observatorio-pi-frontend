import { Link } from "react-router-dom";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function Dashboard() {
  const { metrics, loading } = useAdminDashboard();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Geral</h1>
        <p className="text-gray-500">
          Visão geral do andamento dos Projetos Integradores na instituição.
        </p>
      </header>

      {/* METRICS GRID */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Carregando métricas...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Turmas Ativas
              </p>
              <h3 className="text-3xl font-black text-gray-900">
                {metrics.totalClasses}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              🏫
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Professores Focais
              </p>
              <h3 className="text-3xl font-black text-gray-900">
                {metrics.totalTeachers}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
              👨‍🏫
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Projetos Submetidos
              </p>
              <h3 className="text-3xl font-black text-gray-900">
                {metrics.projectsSubmitted}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              🚀
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Avaliações Pendentes
              </p>
              <h3 className="text-3xl font-black text-amber-600">
                {metrics.pendingEvaluations}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
              ⏳
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Link
            to="/admin/cadastros"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-gray-700 font-medium"
          >
            <span className="text-2xl">⚙️</span> Gerenciar Cadastros
          </Link>
          <Link
            to="/admin/acompanhamento"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-gray-700 font-medium"
          >
            <span className="text-2xl">📊</span> Monitorar Entregas
          </Link>
        </div>
      </div>
    </div>
  );
}
