import { useState, useMemo } from "react";
import ProjectModal from "../../projects/components/ProjectModal";
import Button from "../../../shared/components/Button";

const MOCK_SHOWCASE_PROJECTS = [
  {
    id: 1,
    titulo: "Sistema de Gestão Escolar Integrado",
    descricao: "Um sistema completo para gerenciar matrículas, notas e faltas com dashboard analítico em tempo real.",
    data_upload: "02/11/2023",
    status_projeto: "concluido",
    link_projeto: "https://github.com/projeto/gestao-escolar",
    area: "Desenvolvimento Web",
    turma: "TADS25.103",
    autorizado_exibicao: true,
    contatos: ["ana.beatriz@email.mock", "carlos.edu@email.mock"],
    equipe: {
      nome_equipe: "Code Masters",
      alunos: ["Ana Beatriz", "Carlos Eduardo"],
    },
    avaliacao: {
      nota: 9.8,
      avaliador: "Prof. Silva",
      data: "10/11/2023",
      comentarios: "Arquitetura impecável e excelente código.",
    },
  },
  {
    id: 2,
    titulo: "App de Doação de Sangue Solidário",
    descricao: "Aplicativo mobile que conecta doadores a hemocentros, enviando notificações push de acordo com o tipo sanguíneo em falta.",
    data_upload: "30/10/2023",
    status_projeto: "concluido",
    link_projeto: "https://github.com/projeto/doacao-sangue",
    area: "Desenvolvimento Mobile",
    turma: "TADS25.103",
    autorizado_exibicao: true,
    contatos: ["lucas.almeida@email.mock"],
    equipe: {
      nome_equipe: "Save Lives",
      alunos: ["Lucas Almeida", "Mariana Costa"],
    },
    avaliacao: {
      nota: 9.5,
      avaliador: "Prof. Oliveira",
      data: "05/11/2023",
      comentarios: "Ótima iniciativa e UX muito bem desenhada.",
    },
  },
  {
    id: 3,
    titulo: "IoT na Agricultura Familiar",
    descricao: "Rede de sensores de baixo custo para monitoramento de umidade do solo, ajudando pequenos produtores a economizar água.",
    data_upload: "05/11/2023",
    status_projeto: "concluido",
    link_projeto: "https://github.com/projeto/agro-iot",
    area: "Internet das Coisas",
    turma: "TSI24.201",
    autorizado_exibicao: true,
    contatos: ["joao.pedro@email.mock"],
    equipe: {
      nome_equipe: "AgroTech",
      alunos: ["João Pedro"],
    },
    avaliacao: {
      nota: 8.9,
      avaliador: "Prof. Mendes",
      data: "12/11/2023",
      comentarios: "Protótipo funcional, ótimo impacto social.",
    },
  },
  {
    id: 4,
    titulo: "E-commerce não autorizado",
    descricao: "Este projeto não deve aparecer na vitrine.",
    data_upload: "01/11/2023",
    status_projeto: "concluido",
    link_projeto: "",
    area: "Desenvolvimento Web",
    turma: "TSI24.201",
    autorizado_exibicao: false,
    contatos: [],
    equipe: {
      nome_equipe: "Secret Team",
      alunos: ["Anon"],
    },
    avaliacao: {
      nota: 10,
      avaliador: "Prof. Mendes",
      data: "02/11/2023",
      comentarios: "Perfeito.",
    },
  },
];

export default function Showcase() {
  const [filterArea, setFilterArea] = useState("Todas");
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  // Apenas projetos autorizados para exibição
  const authorizedProjects = MOCK_SHOWCASE_PROJECTS.filter(
    (p) => p.autorizado_exibicao
  );

  const areasList = ["Todas", ...new Set(authorizedProjects.map((p) => p.area))];

  const filteredProjects = useMemo(() => {
    return authorizedProjects.filter((p) => {
      const matchArea = filterArea === "Todas" || p.area === filterArea;
      const matchScore = (p.avaliacao?.nota || 0) >= filterMinScore;
      return matchArea && matchScore;
    });
  }, [filterArea, filterMinScore, authorizedProjects]);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      {/* HEADER & FILTERS */}
      <header className="mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vitrine de Projetos Destacados
          </h1>
          <p className="text-gray-500">
            Descubra soluções inovadoras criadas por nossos alunos e encontre
            talentos para sua empresa.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Área de Atuação
            </label>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {areasList.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Nota Mínima na Avaliação: {filterMinScore}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filterMinScore}
              onChange={(e) => setFilterMinScore(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </header>

      {/* SHOWCASE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setProjetoSelecionado(project)}
          >
            {/* CARD BANNER (Decorative) */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative p-4 flex items-start justify-between">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                {project.area}
              </span>
              <span className="flex items-center gap-1 bg-white text-indigo-700 text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
                ⭐ {project.avaliacao.nota.toFixed(1)}
              </span>
            </div>

            {/* CARD BODY */}
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {project.titulo}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                {project.descricao}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {project.equipe.nome_equipe.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {project.equipe.nome_equipe}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{project.turma}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros de busca para encontrar mais projetos.
            </p>
            <Button
              type="button"
              variant="secondary"
              fullWidth={false}
              className="mt-6"
              onClick={() => {
                setFilterArea("Todas");
                setFilterMinScore(0);
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* MODAL DETALHADO DO PROJETO */}
      <ProjectModal
        projetoSelecionado={projetoSelecionado}
        onClose={() => setProjetoSelecionado(null)}
      />
    </div>
  );
}
