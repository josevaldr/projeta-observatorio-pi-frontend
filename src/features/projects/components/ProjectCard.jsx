export default function ProjectCard({ projeto, onClick }) {
  return (
    <div 
      onClick={() => onClick(projeto)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow"
    >
      
      {/* Header do Card (Data e Status) */}
      <div className="p-4 flex justify-between items-start">
        <span className="text-[10px] text-gray-400 font-medium">Postado em: {projeto.data_upload}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
          projeto.status_projeto === "concluido" ? "bg-green-50 text-green-600" :
          projeto.status_projeto === "em andamento" ? "bg-blue-50 text-blue-600" :
          projeto.status_projeto === "cancelado" ? "bg-red-50 text-red-600" :
          "bg-gray-100 text-gray-600"
        }`}>
          {projeto.status_projeto.toUpperCase()}
        </span>
      </div>

      {/* Imagem/Capa do Projeto (Padrão) */}
      <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-900 relative p-4 flex items-end">
        <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          Projeto Integrador
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-2">{projeto.titulo}</h3>
          <p className="text-xs text-gray-500 line-clamp-3 mb-4">{projeto.descricao}</p>
        </div>

        {/* Rodapé com Link */}
        <div>
          <hr className="border-gray-100 mb-3" />
          <div className="flex justify-between items-center text-xs text-gray-400">
            {projeto.link_projeto ? (
              <a 
                href={projeto.link_projeto} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                🔗 Acessar Projeto
              </a>
            ) : (
              <span className="text-gray-400 italic">Sem link disponível</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
