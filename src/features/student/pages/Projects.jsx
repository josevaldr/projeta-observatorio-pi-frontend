import { useState } from "react";
import { Link } from "react-router-dom";

// Mock de dados de um projeto específico (ex: Sensor IoT)
const PROJETO_DETALHES_MOCK = {
  id: 1,
  titulo: "Sensor IoT para monitoramento de hortas urbanas",
  disciplina: "PI III (Projeto Integrador)",
  ano: "2026.1",
  status: "Publicado", // Publicado | Em avaliação | Rascunho
  nota: 4.8,
  corCapa: "bg-blue-600",
  descricaoCompleta: "Este projeto consiste no desenvolvimento de um dispositivo de baixo custo baseado em IoT para medir a umidade do solo em tempo real e enviar alertas automatizados via aplicativo móvel. Foi validado e testado com sucesso em 3 hortas comunitárias da região, ajudando a otimizar o consumo de água.",
  tags: ["IoT", "Arduino", "Sustentabilidade", "Engenharia"],
  feedbacks: [
    {
      id: 101,
      autor: "Prof. Carlos Silva",
      papel: "Orientador",
      data: "Há 2 dias",
      comentario: "Excelente escolha de componentes. Recomendo apenas calibrar o sensor de umidade para solos mais argilosos na próxima versão do relatório.",
      avatar: "CS"
    },
    {
      id: 102,
      autor: "Mariana Souza",
      papel: "Avaliadora",
      data: "Ontem",
      comentario: "A interface do aplicativo está muito intuitiva e os alertas via push funcionaram sem atrasos durante a demonstração.",
      avatar: "MS"
    }
  ]
};

export default function ProjetoDetalhes() {
  const [novoComentario, setNovoComentario] = useState("");

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
      
      {/* 1. BOTÃO VOLTAR E ACÕES */}
      <header className="flex justify-between items-center mb-6">
        <button className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2 transition-colors">
          &larr; Voltar para Projetos
        </button>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors">
            Editar Projeto
          </button>
          <button className="bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors">
            Compartilhar
          </button>
        </div>
      </header>

      {/* 2. GRID PRINCIPAL (CONTEÚDO VS DETALHES LATERAIS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA ESQUERDA (CONTEÚDO PRINCIPAL) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Banner de Capa */}
          <div className={`h-64 ${PROJETO_DETALHES_MOCK.corCapa} rounded-2xl relative p-6 flex items-end shadow-sm`}>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
              {PROJETO_DETALHES_MOCK.disciplina}
            </span>
          </div>

          {/* Título e Descrição */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{PROJETO_DETALHES_MOCK.titulo}</h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {PROJETO_DETALHES_MOCK.descricaoCompleta}
            </p>
            
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {PROJETO_DETALHES_MOCK.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* SESSÃO DE FEEDBACKS */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-lg font-bold text-gray-900 border-bottom border-gray-100 pb-2">
              Feedbacks e Comentários ({PROJETO_DETALHES_MOCK.feedbacks.length})
            </h2>

            {/* Lista de Comentários */}
            <div className="flex flex-col gap-4">
              {PROJETO_DETALHES_MOCK.feedbacks.map((fb) => (
                <div key={fb.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
                        {fb.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{fb.autor}</h4>
                        <p className="text-[10px] text-gray-400">{fb.papel}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{fb.data}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pl-11">{fb.comentario}</p>
                </div>
              ))}
            </div>

            {/* Campo para Adicionar Novo Comentário */}
            <div className="mt-2 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                MS
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  placeholder="Escreva uma resposta ou dúvida sobre o feedback..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-900 resize-none h-20 transition-colors"
                />
                <button className="self-end bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors">
                  Enviar Mensagem
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* COLUNA DA DIREITA (METADADOS E STATUS) */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider text-gray-400">Status do Projeto</h3>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(PROJETO_DETALHES_MOCK.status)}`}>
                {PROJETO_DETALHES_MOCK.status}
              </span>
              
              {PROJETO_DETALHES_MOCK.nota && (
                <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                  <span className="text-amber-500">⭐</span> {PROJETO_DETALHES_MOCK.nota.toFixed(1)} / 5.0
                </div>
              )}
            </div>

            <hr className="border-gray-100 my-2" />

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <span className="text-gray-400 block mb-0.5">Semestre Letivo</span>
                <span className="font-semibold text-gray-800">{PROJETO_DETALHES_MOCK.ano}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Componente Curricular</span>
                <span className="font-semibold text-gray-800">{PROJETO_DETALHES_MOCK.disciplina}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Última Atualização</span>
                <span className="font-semibold text-gray-800">10 de Jun. de 2026</span>
              </div>
            </div>
          </div>

          {/* Card de Informações Extras da Categoria */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-sm mb-2">Visibilidade Pública</h4>
            <p className="text-xs text-blue-200 leading-relaxed mb-4">
              Este projeto está listado no Feed Global e pode ser visualizado por outros alunos e professores da instituição.
            </p>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2 rounded-xl transition-colors">
              Alterar para Privado
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}