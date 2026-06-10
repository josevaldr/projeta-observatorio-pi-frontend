import { useState } from "react";
import { Link } from "react-router-dom";

// Dados simulados baseados na nova imagem
const MEUS_PROJETOS_MOCK = [
  {
    id: 1,
    titulo: "Sensor IoT para hortas urbanas",
    disciplina: "PI III",
    ano: "2026.1",
    descricao: "Monitora humidade e envia alertas via app móvel.",
    status: "Publicado", // Publicado | Em avaliação | Rascunho
    nota: 4.8,
    corCapa: "bg-blue-600"
  },
  {
    id: 2,
    titulo: "App de troca de livros",
    disciplina: "DSW",
    ano: "2025.2",
    descricao: "Plataforma comunitária com Supabase e React.",
    status: "Em avaliação",
    nota: 4.5,
    corCapa: "bg-amber-500"
  },
  {
    id: 3,
    titulo: "Dashboard de evasão",
    disciplina: "Ciência de Dados",
    ano: "2025.2",
    descricao: "Visualização interativa para coordenação.",
    status: "Publicado",
    nota: 4.6,
    corCapa: "bg-blue-900"
  },
  {
    id: 4,
    titulo: "Estudo de caso — banco digital",
    disciplina: "UX Research",
    ano: "2025.1",
    descricao: "Pesquisa qualitativa com 12 entrevistas.",
    status: "Rascunho",
    nota: null, // Sem nota por ser rascunho
    corCapa: "bg-amber-600"
  }
];

export default function Projetos() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const filtros = ["Todos", "Publicados", "Rascunhos", "Em avaliação"];

  // Função para estilizar as etiquetas de status dinamicamente
  const getStatusStyle = (status) => {
    switch (status) {
      case "Publicado":
        return "bg-green-50 text-green-600 border border-green-200";
      case "Em avaliação":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Rascunho":
        return "bg-gray-100 text-gray-500 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {/* 1. CABEÇALHO DA PÁGINA */}
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Meus projetos</h1>
          <p className="text-xs text-gray-400">4 projetos • 1 rascunho</p>
        </div>

        {/* Botão + Novo */}
        <button className="bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm transition-colors">
          <span className="text-lg leading-none">+</span> Novo
        </button>
      </header>

      {/* 2. FILTROS / ABAS */}
      <div className="flex gap-2 mb-8">
        {filtros.map((filtro) => {
          // Mapeamento simples para bater com o estado do mock se quiseres filtrar no futuro
          const isActive = filtroAtivo === filtro;
          return (
            <button
              key={filtro}
              onClick={() => setFiltroAtivo(filtro)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {filtro}
            </button>
          );
        })}
      </div>

      {/* 3. BANNER DE FEEDBACKS RECEBIDOS */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center mb-8 hover:bg-slate-100/50 cursor-pointer transition-colors shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-900 text-white p-3 rounded-xl flex items-center justify-center">
            💬 {/* Ícone de mensagem/chat */}
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">Feedbacks recebidos</h3>
            <p className="text-xs text-gray-400">3 novos comentários • 1 avaliação</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wider">
            Novo
          </span>
          <span className="text-gray-400 font-bold text-sm">&gt;</span>
        </div>
      </div>

      {/* 4. GRELHA DE PROJETOS (GRID DE 2 COLUNAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MEUS_PROJETOS_MOCK.map((projeto) => (
          <div 
            key={projeto.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow"
          >
            {/* Miniatura à esquerda */}
            <div className={`w-28 h-28 rounded-xl ${projeto.corCapa} shrink-0`}></div>

            {/* Conteúdo do Projeto à direita */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                <h2 className="font-bold text-sm text-gray-900 mb-0.5">{projeto.titulo}</h2>
                <p className="text-[11px] text-gray-400 mb-2">
                  {projeto.disciplina} • {projeto.ano}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {projeto.descricao}
                </p>
              </div>

              {/* Rodapé do Card (Status e Nota) */}
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${getStatusStyle(projeto.status)}`}>
                  {projeto.status}
                </span>

                {projeto.nota && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-600">
                    <span className="text-amber-500">⭐</span> {projeto.nota.toFixed(1)}
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
