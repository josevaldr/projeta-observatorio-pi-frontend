export default function EvaluationDisplay({ avaliacao }) {
  if (!avaliacao) return null;

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>📋</span> Avaliação do Projeto
      </h3>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">Nota Final</span>
            <span className="text-2xl font-bold text-blue-900">{avaliacao.nota.toFixed(1)} <span className="text-sm font-normal text-blue-700">/ 10.0</span></span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">Avaliador</span>
            <span className="text-sm font-medium text-blue-900">{avaliacao.avaliador}</span>
            <span className="text-[10px] text-blue-500 block">{avaliacao.data}</span>
          </div>
        </div>
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">Comentários</span>
          <p className="text-sm text-blue-800 leading-relaxed bg-white/60 p-3 rounded-lg">
            {avaliacao.comentarios}
          </p>
        </div>
      </div>
    </div>
  );
}
