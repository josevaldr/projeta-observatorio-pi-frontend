import { useState } from "react";
import ProjectCard from "../../projects/components/ProjectCard";
import ProjectModal from "../../projects/components/ProjectModal";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";

// Mock inicial de projetos submetidos pelo aluno
const PROJETOS_MOCK_INICIAL = [
  {
    id_projeto: 1,
    titulo: "Sensor IoT para monitoramento de hortas urbanas",
    descricao: "Dispositivo de baixo custo que mede umidade do solo e envia alertas via app.",
    data_upload: "2023-10-25",
    status_projeto: "concluido",
    link_projeto: "https://github.com/projeto/sensor-iot",
    equipe: {
      nome_equipe: "Minha Equipe",
      alunos: ["Maria Silva", "João Pereira"]
    },
    avaliacao: {
      nota: 9.5,
      avaliador: "Prof. Carlos Silva",
      data: "2023-11-05",
      comentarios: "Excelente trabalho. O protótipo funciona perfeitamente e o relatório técnico está muito bem escrito. Recomendo pensar em uma versão alimentada por energia solar no futuro."
    }
  },
  {
    id_projeto: 2,
    titulo: "Aplicativo de Doação de Sangue",
    descricao: "Um app móvel para conectar doadores e hemocentros da região.",
    data_upload: "2024-02-15",
    status_projeto: "em andamento",
    link_projeto: "https://figma.com/file/doacao-sangue",
    equipe: {
      nome_equipe: "Equipe Alpha",
      alunos: ["Maria Silva", "Lucas Almeida"]
    }
  },
  {
    id_projeto: 3,
    titulo: "Sistema de Gestão de Estoque com IA",
    descricao: "Plataforma web que prevê demanda de produtos baseada no histórico de vendas utilizando machine learning.",
    data_upload: "2023-06-10",
    status_projeto: "concluido",
    link_projeto: "https://github.com/projeto/gestao-estoque-ia",
    equipe: {
      nome_equipe: "Tech Innovators",
      alunos: ["Maria Silva", "Ana Beatriz"]
    },
    avaliacao: {
      nota: 8.0,
      avaliador: "Profa. Mariana Souza",
      data: "2023-06-30",
      comentarios: "O modelo de machine learning está bem ajustado, mas a interface do usuário precisa de melhorias na usabilidade. Faltou também um tratamento de erros mais robusto."
    }
  }
];

export default function ProjetosAluno() {
  const [view, setView] = useState("list"); // 'list' | 'new'
  const [meusProjetos, setMeusProjetos] = useState(PROJETOS_MOCK_INICIAL);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  // Estados do Formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [equipe, setEquipe] = useState("");

  const handleSubmeterProjeto = (e) => {
    e.preventDefault();
    
    const novoProjeto = {
      id_projeto: Date.now(),
      titulo,
      descricao,
      data_upload: new Date().toISOString().split("T")[0],
      status_projeto: "em andamento",
      link_projeto: link,
      equipe: {
        nome_equipe: nomeEquipe || "Sem nome",
        alunos: equipe.split(",").map(aluno => aluno.trim()).filter(aluno => aluno.length > 0)
      }
    };

    setMeusProjetos([novoProjeto, ...meusProjetos]);
    
    // Limpar formulário e voltar
    setTitulo("");
    setDescricao("");
    setLink("");
    setNomeEquipe("");
    setEquipe("");
    setView("list");
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {view === "list" && (
        <>
          {/* CABEÇALHO */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Meus Projetos</h1>
              <p className="text-sm text-gray-500">Acompanhe seus projetos submetidos e envie novos trabalhos.</p>
            </div>
            <Button
              type="button"
              variant="primary"
              fullWidth={false}
              onClick={() => setView("new")}
              className="gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submeter Projeto
            </Button>
          </header>

          {/* LISTAGEM DE PROJETOS */}
          {meusProjetos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meusProjetos.map((projeto) => (
                <ProjectCard 
                  key={projeto.id_projeto} 
                  projeto={projeto} 
                  onClick={() => setProjetoSelecionado(projeto)} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-gray-500 mb-4">Você ainda não submeteu nenhum projeto.</p>
              <Button type="button" variant="primary" fullWidth={false} onClick={() => setView("new")}>
                Submeter meu primeiro projeto
              </Button>
            </div>
          )}

          {/* MODAL DE DETALHES */}
          <ProjectModal 
            projetoSelecionado={projetoSelecionado} 
            onClose={() => setProjetoSelecionado(null)} 
          />
        </>
      )}

      {view === "new" && (
        <>
          {/* CABEÇALHO FORMULÁRIO */}
          <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <div>
              <button 
                onClick={() => setView("list")}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2 transition-colors"
              >
                &larr; Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Submeter Novo Projeto</h1>
            </div>
          </header>

          {/* FORMULÁRIO */}
          <form 
            onSubmit={handleSubmeterProjeto}
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm max-w-3xl"
          >
            <div className="space-y-6">
              
              <InputField
                labelText="Título do Projeto"
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required={true}
                placeholder="Ex: Sistema de Gestão para Bibliotecas"
                labelClassName="!text-sm"
              />

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Descrição
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                  placeholder="Explique detalhadamente o objetivo e funcionamento do projeto..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-blue-600 text-sm h-32 resize-none"
                />
              </div>

              <InputField
                labelText="Link do Repositório / Projeto"
                type="url"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://github.com/..."
                labelClassName="!text-sm"
              />

              <InputField
                labelText="Nome da Equipe"
                type="text"
                id="nomeEquipe"
                value={nomeEquipe}
                onChange={(e) => setNomeEquipe(e.target.value)}
                placeholder="Ex: Data Wizards"
                labelClassName="!text-sm"
              />

              <InputField
                labelText="Nomes dos Integrantes da Equipe"
                type="text"
                id="equipe"
                value={equipe}
                onChange={(e) => setEquipe(e.target.value)}
                placeholder="Ex: Maria Silva, João Pereira (separados por vírgula)"
                labelClassName="!text-sm"
              />

            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
              <Button type="submit" variant="primary" fullWidth={false} className="px-8">
                Submeter
              </Button>
              <Button type="button" variant="secondary" fullWidth={false} onClick={() => setView("list")}>
                Cancelar
              </Button>
            </div>
          </form>
        </>
      )}

    </div>
  );
}