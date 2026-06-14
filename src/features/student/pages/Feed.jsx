import { useState } from "react";

const PROJETOS_MOCK = [
  {
    id_projeto: 1,
    cod_id_avaliacao: null,
    titulo: "Sensor IoT para monitoramento de hortas urbanas",
    descricao: "Dispositivo de baixo custo que mede umidade do solo e envia alertas via app — testado em 3 hortas comunitárias.",
    data_upload: "2023-10-25",
    status_projeto: "concluido",
    link_projeto: "https://github.com/projeto/sensor-iot",
    equipe: {
      nome_equipe: "Equipe 1",
      alunos: ["João Pereira", "Maria Silva"]
    }
  },
  {
    id_projeto: 2,
    cod_id_avaliacao: 1,
    titulo: "Redesign do app da biblioteca universitária",
    descricao: "Pesquisa com 80 estudantes, novo fluxo de reservas e protótipo testado em duas rodadas de usabilidade.",
    data_upload: "2023-11-02",
    status_projeto: "em andamento",
    link_projeto: "https://figma.com/file/redesign",
    equipe: {
      nome_equipe: "Designers do Futuro",
      alunos: ["Camila Rocha", "Ana Beatriz", "Carlos Souza"]
    }
  },
  {
    id_projeto: 3,
    cod_id_avaliacao: null,
    titulo: "Modelo de ML para previsão de evasão escolar",
    descricao: "Pipeline em Python com dados anonimizados de 4 semestres. Acurácia de 87% no conjunto de validação.",
    data_upload: "2023-11-10",
    status_projeto: "em andamento",
    link_projeto: "https://github.com/projeto/ml-evasao",
    equipe: {
      nome_equipe: "Data Wizards",
      alunos: ["Lucas Almeida"]
    }
  },
  {
    id_projeto: 4,
    cod_id_avaliacao: 2,
    titulo: "Plataforma de troca de livros didáticos",
    descricao: "MVP em React + Supabase que conecta estudantes para emprestar, vender ou doar materiais por disciplina.",
    data_upload: "2023-11-15",
    status_projeto: "não iniciado",
    link_projeto: "https://github.com/projeto/troca-livros",
    equipe: {
      nome_equipe: "EcoBooks",
      alunos: ["Ana Beatriz", "João Pereira", "Marcos Oliveira"]
    }
  }
];

export default function Feed() {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.nome || user.name || "Aluno";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJETOS_MOCK.map((projeto) => (
          <div 
            key={projeto.id_projeto} 
            onClick={() => setProjetoSelecionado(projeto)}
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
        ))}
      </div>

      {/* MODAL DE PROJETO */}
      {projetoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setProjetoSelecionado(null)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative p-6 flex items-end rounded-t-2xl">
              <button 
                onClick={() => setProjetoSelecionado(null)}
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
            </div>
          </div>
        </div>
      )}

    </div>
  );
}