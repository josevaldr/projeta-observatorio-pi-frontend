import { useState } from "react";
import { Link } from "react-router-dom";

export default function Perfil() {
  // Dados simulados baseados na imagem de perfil fornecida
  const [usuario] = useState({
    nome: "Maria Silva",
    curso: "Engenharia de Software",
    semestre: "5º semestre",
    iniciais: "MS",
    tagsInteresse: ["UX", "React", "IoT"],
    estatisticas: {
      projetos: 12,
      feedbacks: 48,
      visualizacoes: 320
    }
  });

  // Lista de opções de configuração do menu inferior
  const opcoesMenu = [
    { id: "editar", label: "Editar perfil", icone: "👤" },
    { id: "privacidade", label: "Privacidade", icone: "🔒" },
    { id: "notificacoes", label: "Notificações", icone: "🔔" },
    { id: "ajuda", label: "Ajuda e suporte", icone: "❓" }
  ];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {/* 1. CABEÇALHO DA PÁGINA */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-0.5">Perfil</h1>
          <p className="text-xs text-gray-400">Aluno</p>
        </div>
        
        {/* Ícone de Configuração Superior */}
        <button className="text-gray-400 hover:text-gray-600 p-2 text-lg transition-colors">
          ⚙️
        </button>
      </header>

      {/* 2. CARD PRINCIPAL DE IDENTIFICAÇÃO */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex items-center gap-5 mb-8 shadow-sm">
        {/* Avatar Grande */}
        <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
          {usuario.iniciais}
        </div>
        
        {/* Detalhes Académicos */}
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-xl font-bold text-gray-950 leading-tight">{usuario.nome}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {usuario.curso} • {usuario.semestre}
            </p>
          </div>
          
          {/* Tags de Interesse */}
          <div className="flex gap-1.5 flex-wrap">
            {usuario.tagsInteresse.map((tag) => (
              <span 
                key={tag} 
                className="bg-white border border-gray-200 text-slate-600 text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CONTADORES / ESTATÍSTICAS (GRID DE 3 COLUNAS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card Projetos */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm flex flex-col justify-center items-center h-28">
          <span className="text-2xl font-black text-blue-900 block mb-1">
            {usuario.estatisticas.projetos}
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Projetos
          </span>
        </div>

        {/* Card Feedbacks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm flex flex-col justify-center items-center h-28">
          <span className="text-2xl font-black text-blue-900 block mb-1">
            {usuario.estatisticas.feedbacks}
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Feedbacks
          </span>
        </div>

        {/* Card Visualizações */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm flex flex-col justify-center items-center h-28">
          <span className="text-2xl font-black text-blue-900 block mb-1">
            {usuario.estatisticas.visualizacoes}
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Visualizações
          </span>
        </div>

      </div>

      {/* 4. LISTA DE OPÇÕES / MENU DE CONFIGURAÇÕES */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-6">
        {opcoesMenu.map((opcao, index) => (
          <button
            key={opcao.id}
            className={`w-full p-4 flex justify-between items-center text-left hover:bg-slate-50/70 transition-colors ${
              index !== opcoesMenu.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm bg-slate-50 w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100">
                {opcao.icone}
              </span>
              <span className="text-xs font-semibold text-gray-800">{opcao.label}</span>
            </div>
            {/* Seta indicativa para a direita */}
            <span className="text-gray-300 font-bold text-sm select-none">&gt;</span>
          </button>
        ))}
      </div>

      {/* 5. BOTÃO SAIR DA CONTA */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <button className="w-full max-w-none border border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs py-3 rounded-xl transition-all shadow-sm text-center">
          ↪ Sair da conta
        </button>
        
        {/* Rodapé com versão */}
        <span className="text-[10px] text-gray-300 font-medium">
          PROjeta • versão 1.0.0
        </span>
      </div>

    </div>
  );
}