import { useState } from "react";
import ProjectModal from "../../projects/components/ProjectModal";

const MOCK_CURATION_PROJECTS = [
  {
    id: 1,
    titulo: "Sistema de Gestão Escolar",
    descricao: "Um sistema completo para gerenciar matrículas, notas e faltas com dashboard analítico em tempo real.",
    area: "Desenvolvimento Web",
    turma: "TADS25.103",
    equipe: { nome_equipe: "Code Masters", alunos: ["Ana Beatriz", "Carlos Eduardo"] },
    avaliacao: { nota: 9.8 },
    autorizado_equipe: true,
    autorizado_coordenacao: true,
  },
  {
    id: 3,
    titulo: "IoT na Agricultura Familiar",
    descricao: "Rede de sensores de baixo custo para monitoramento de umidade do solo.",
    area: "Internet das Coisas",
    turma: "TSI24.201",
    equipe: { nome_equipe: "AgroTech", alunos: ["João Pedro"] },
    avaliacao: { nota: 8.9 },
    autorizado_equipe: true,
    autorizado_coordenacao: false,
  },
  {
    id: 4,
    titulo: "E-commerce Secreto",
    descricao: "Plataforma de vendas com gateway de pagamento mockado.",
    area: "Desenvolvimento Web",
    turma: "TSI24.201",
    equipe: { nome_equipe: "Secret Team", alunos: ["Anon"] },
    avaliacao: { nota: 10 },
    autorizado_equipe: false, // EQUIPE NÃO AUTORIZOU DIVULGAÇÃO
    autorizado_coordenacao: false,
  },
];

export default function Curation() {
  const [projetos, setProjetos] = useState(MOCK_CURATION_PROJECTS);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const toggleCuration = (proj) => {
    if (!proj.autorizado_equipe) {
      alert("⚠️ Bloqueio: Este projeto não pode ser exposto pois os estudantes não autorizaram a divulgação externa.");
      return;
    }

    setProjetos(projetos.map(p => 
      p.id === proj.id ? { ...p, autorizado_coordenacao: !p.autorizado_coordenacao } : p
    ));
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Curadoria de Projetos</h1>
        <p className="text-gray-500">
          Aprove os melhores projetos para serem exibidos na Vitrine Corporativa. Apenas projetos autorizados pelos alunos podem ser publicados.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projetos.map((proj) => (
          <div key={proj.id} className={`bg-white rounded-2xl p-6 border ${proj.autorizado_coordenacao ? 'border-green-400 ring-1 ring-green-400 shadow-md' : 'border-gray-200 shadow-sm'} flex flex-col relative`}>
            
            {/* BADGES */}
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">{proj.turma}</span>
              <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md">⭐ {proj.avaliacao.nota.toFixed(1)}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{proj.titulo}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{proj.descricao}</p>

            {/* STATUS EQUIPE */}
            <div className="mb-4 text-xs font-medium">
              Permissão da Equipe: {" "}
              {proj.autorizado_equipe ? (
                <span className="text-green-600">✅ Concedida</span>
              ) : (
                <span className="text-red-500">❌ Recusada</span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              <button
                onClick={() => toggleCuration(proj)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                  !proj.autorizado_equipe
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : proj.autorizado_coordenacao
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                }`}
              >
                {proj.autorizado_coordenacao ? "Remover da Vitrine" : "Aprovar para Vitrine"}
              </button>
              
              <button
                onClick={() => setProjetoSelecionado(proj)}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                title="Ver Detalhes do Projeto"
              >
                🔍
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        projetoSelecionado={projetoSelecionado}
        onClose={() => setProjetoSelecionado(null)}
      />
    </div>
  );
}
