import { useState } from "react";
import { Link } from "react-router-dom";


const PROJETOS_MOCK = [
  {
    id: 1,
    autor: "João Pereira",
    curso: "Eng. de Software • 6º sem",
    tempo: "há 2h",
    titulo: "Sensor IoT para monitoramento de hortas urbanas",
    descricao: "Dispositivo de baixo custo que mede umidade do solo e envia alertas via app — testado em 3 hortas comunitárias.",
    tags: ["IoT", "Arduino", "Sustentabilidade"],
    likes: 124,
    comentarios: 18,
    corCapa: "bg-blue-600" // Cor simulando o banner azul
  },
  {
    id: 2,
    autor: "Camila Rocha",
    curso: "Design • 4º sem",
    tempo: "há 5h",
    titulo: "Redesign do app da biblioteca universitária",
    descricao: "Pesquisa com 80 estudantes, novo fluxo de reservas e protótipo testado em duas rodadas de usabilidade.",
    tags: ["UX", "Figma", "Pesquisa"],
    likes: 86,
    comentarios: 12,
    corCapa: "bg-amber-500" // Cor simulando o banner laranja
  },
  {
    id: 3,
    autor: "Lucas Almeida",
    curso: "Ciência da Computação • 7º sem",
    tempo: "ontem",
    titulo: "Modelo de ML para previsão de evasão escolar",
    descricao: "Pipeline em Python com dados anonimizados de 4 semestres. Acurácia de 87% no conjunto de validação.",
    tags: ["Machine Learning", "Python", "Educação"],
    likes: 201,
    comentarios: 34,
    corCapa: "bg-blue-900"
  },
  {
    id: 4,
    autor: "Ana Beatriz",
    curso: "Eng. de Software • 5º sem",
    tempo: "ontem",
    titulo: "Plataforma de troca de livros didáticos",
    descricao: "MVP em React + Supabase que conecta estudantes para emprestar, vender ou doar materiais por disciplina.",
    tags: ["React", "Supabase", "Comunidade"],
    likes: 67,
    comentarios: 9,
    corCapa: "bg-amber-600"
  }
];

export default function Feed() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const filtros = ["Todos", "Tendências", "Minha área", "Recentes", "Avaliados"];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {/* 1. CABEÇALHO DA PÁGINA */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {/* Avatar da Maria */}
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
            MS
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Olá, Maria <span role="img" aria-label="wave">👋</span>
            </p>
            <h1 className="text-xl font-bold text-gray-900">O que vamos descobrir hoje?</h1>
          </div>
        </div>

        {/* Ícones de Busca e Notificação (Simulados) */}
        <div className="flex items-center gap-4 text-gray-500">
          <button className="hover:text-gray-700">🔍</button>
          <button className="hover:text-gray-700 relative">
            🔔
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* 2. FILTROS / ABAS */}
      <div className="flex gap-2 mb-6">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            onClick={() => setFiltroAtivo(filtro)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filtroAtivo === filtro
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>

      {/* 3. BANNER DE RECOMENDAÇÃO */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 mb-8 shadow-sm">
        <div className="bg-blue-950 text-white p-3 rounded-lg">
          ✨ {/* Substitua por um ícone real como o Sparkles do Lucide-react */}
        </div>
        <div>
          <h3 className="font-semibold text-sm text-gray-900">3 projetos novos na sua área hoje</h3>
          <p className="text-xs text-gray-500">Baseado nos seus interesses: UX, React, IoT</p>
        </div>
      </div>

      {/* 4. GRADE DE PROJETOS (GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJETOS_MOCK.map((projeto) => (
          <div key={projeto.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
            
            {/* Header do Card */}
            <div className="p-4 flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">
                  {projeto.autor.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{projeto.autor}</h4>
                  <p className="text-[10px] text-gray-400">{projeto.curso}</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400">{projeto.tempo}</span>
            </div>

            {/* Imagem/Capa do Projeto */}
            <div className={`h-44 ${projeto.corCapa} relative p-4 flex items-end`}>
              <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                Projeto Integrador
              </span>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">{projeto.titulo}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{projeto.descricao}</p>
              </div>

              {/* Tags e Interações */}
              <div>
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {projeto.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <hr className="border-gray-100 mb-3" />

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 hover:text-gray-600">
                      ❤️ <span className="text-[11px] font-medium text-gray-500">{projeto.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-600">
                      💬 <span className="text-[11px] font-medium text-gray-500">{projeto.comentarios}</span>
                    </button>
                  </div>
                  <button className="hover:text-gray-600">🔖</button>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}