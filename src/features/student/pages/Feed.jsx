import ProjectCard from "../../projects/components/ProjectCard";
import ProjectModal from "../../projects/components/ProjectModal";
import { useFeed } from "../hooks/useFeed";

export default function Feed() {
  const {
    projetos,
    loading,
    projetoSelecionado, setProjetoSelecionado,
    userName
  } = useFeed();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {/* 1. CABEÇALHO DA PÁGINA */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {/* Avatar do Usuário */}
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Olá, {userName.split(" ")[0]} <span role="img" aria-label="wave">👋</span>
            </p>
            <h1 className="text-xl font-bold text-gray-900">O que vamos descobrir hoje?</h1>
          </div>
        </div>
      </header>

      {/* 4. GRADE DE PROJETOS (GRID) */}
      {loading ? (
        <div className="text-center p-10 text-gray-500">Carregando projetos...</div>
      ) : projetos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <ProjectCard 
              key={projeto.id_projeto} 
              projeto={projeto} 
              onClick={() => setProjetoSelecionado(projeto)} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
        </div>
      )}

      {/* MODAL DE PROJETO */}
      <ProjectModal 
        projetoSelecionado={projetoSelecionado} 
        onClose={() => setProjetoSelecionado(null)} 
      />

    </div>
  );
}