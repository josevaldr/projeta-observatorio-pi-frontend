import Button from "../../../shared/components/Button";
import InputField from "../../../shared/components/InputField";
import ProjectModal from "../../projects/components/ProjectModal";
import { useProfessorProjects } from "../hooks/useProfessorProjects";

export default function Projects() {
  const {
    filterClass,
    setFilterClass,
    classesList,
    loadingInitial,
    loading,
    errorMsg,
    projetoDetalhado,
    setProjetoDetalhado,
    selectedProject,
    setSelectedProject,
    score,
    setScore,
    comments,
    setComments,
    filteredProjects,
    openEvaluation,
    handleEvaluate,
    isLate,
    handleOpenDetails
  } = useProfessorProjects();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Avaliação de Projetos
          </h1>
          <p className="text-sm text-gray-500">
            Acompanhe e avalie os projetos integradores submetidos pelas equipes.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-sm text-gray-500 font-medium pl-2">Turma:</span>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="border-none bg-gray-50 rounded-lg px-3 py-1.5 text-sm focus:ring-0 cursor-pointer"
          >
            {classesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* PROJECTS LIST */}
      {errorMsg ? (
        <div className="text-center p-10 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-red-700 font-bold mb-2">Ops! Ocorreu um erro ao carregar os projetos.</p>
          <p className="text-red-600 text-sm">{errorMsg}</p>
        </div>
      ) : loadingInitial ? (
        <div className="text-center p-10 text-gray-500">Carregando projetos...</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const late = isLate(project.uploadDate, project.dueDate);

            return (
              <div
                key={project.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      {project.title}
                    </h2>
                    {late && (
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-md shrink-0 ml-4 border border-red-100">
                        Entregue c/ Atraso
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {project.teamName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-sm text-blue-600 font-medium">
                      {project.class}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="block text-xs text-gray-500 mb-1">
                        Data Limite
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {project.dueDate.split("-").reverse().join("/")}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border ${
                        late
                          ? "bg-red-50 border-red-100"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <span className="block text-xs text-gray-500 mb-1">
                        Data de Envio
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          late ? "text-red-700" : "text-gray-800"
                        }`}
                      >
                        {project.uploadDate.split("-").reverse().join("/")}
                      </span>
                    </div>
                  </div>

                  {project.status === "avaliado" && project.evaluation && (
                    <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-green-800">
                          Nota Atribuída
                        </span>
                        <span className="text-lg font-black text-green-700">
                          {project.evaluation.score.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-green-700 italic">
                        "{project.evaluation.comments}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth={false}
                    className="flex-1 text-xs px-2"
                    onClick={() => handleOpenDetails(project)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    type="button"
                    variant={project.status === "avaliado" ? "secondary" : "primary"}
                    fullWidth={false}
                    className="flex-[2]"
                    onClick={() => openEvaluation(project)}
                  >
                    {project.status === "avaliado" ? "Reavaliar" : "Avaliar Projeto"}
                  </Button>
                </div>
              </div>
            );
          })}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-100 rounded-2xl">
              Nenhum projeto encontrado.
            </div>
          )}
        </div>
      )}

      {/* EVALUATION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Avaliar Projeto
              </h3>
              <p className="text-sm text-gray-500">
                {selectedProject.title} ({selectedProject.teamName})
              </p>
            </div>
            <form onSubmit={handleEvaluate} className="p-6 flex flex-col gap-5">
              <InputField
                labelText="Nota (0 a 10)"
                type="number"
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required={true}
                placeholder="Ex: 9.5"
                labelClassName="!text-sm"
              />
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Comentários / Feedback
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                  placeholder="Escreva um feedback construtivo para a equipe..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-blue-600 text-sm h-32 resize-none bg-gray-50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" fullWidth={false} className="flex-1" disabled={loading} loading={loading}>
                  Salvar Avaliação
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth={false}
                  className="flex-1"
                  onClick={() => setSelectedProject(null)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}
      <ProjectModal 
        projetoSelecionado={projetoDetalhado} 
        onClose={() => setProjetoDetalhado(null)} 
      />
    </div>
  );
}
