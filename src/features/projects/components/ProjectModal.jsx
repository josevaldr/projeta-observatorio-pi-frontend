import EvaluationDisplay from "../../evaluation/components/EvaluationDisplay";

export default function ProjectModal({ projetoSelecionado, onClose }) {
  if (!projetoSelecionado) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative p-6 flex items-end rounded-t-2xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            Projeto Integrador
          </span>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{projetoSelecionado.titulo}</h2>
              <div className="flex gap-3 text-sm text-gray-500">
                <span>Postado em: {projetoSelecionado.data_upload}</span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  projetoSelecionado.status_projeto === "concluido" ? "bg-green-50 text-green-600" :
                  projetoSelecionado.status_projeto === "em andamento" ? "bg-blue-50 text-blue-600" :
                  projetoSelecionado.status_projeto === "cancelado" ? "bg-red-50 text-red-600" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {projetoSelecionado.status_projeto.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Equipe do Projeto</h3>
            {projetoSelecionado.equipe ? (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  👥 {projetoSelecionado.equipe.nome_equipe}
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {projetoSelecionado.equipe.alunos.map((aluno, index) => (
                    <li key={index}>{aluno}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhuma equipe vinculada.</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição do Projeto</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {projetoSelecionado.descricao}
            </p>
          </div>

          {projetoSelecionado.link_projeto && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Link do Projeto</h3>
              <a href={projetoSelecionado.link_projeto} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                🔗 Acessar Link Externo
              </a>
            </div>
          )}

          <EvaluationDisplay avaliacao={projetoSelecionado.avaliacao} />
        </div>
      </div>
    </div>
  );
}
