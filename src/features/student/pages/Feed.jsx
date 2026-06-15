import { useState } from "react";
import ProjectCard from "../../../components/projects/ProjectCard";
import ProjectModal from "../../../components/projects/ProjectModal";

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
          <ProjectCard 
            key={projeto.id_projeto} 
            projeto={projeto} 
            onClick={() => setProjetoSelecionado(projeto)} 
          />
        ))}
      </div>

      {/* MODAL DE PROJETO */}
      <ProjectModal 
        projetoSelecionado={projetoSelecionado} 
        onClose={() => setProjetoSelecionado(null)} 
      />

    </div>
  );
}