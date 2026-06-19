import ProjectCard from "../../projects/components/ProjectCard";
import ProjectModal from "../../projects/components/ProjectModal";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";
import { useStudentProjects } from "../hooks/useStudentProjects";

export default function ProjetosAluno() {
  const {
    view, setView,
    meusProjetos,
    projetoSelecionado, setProjetoSelecionado,
    titulo, setTitulo,
    descricao, setDescricao,
    link, setLink,
    nomeEquipe, setNomeEquipe,
    turmas, selectedTurma, setSelectedTurma,
    alunosDaTurma, selectedMembros, handleToggleMembro,
    searchTerm, setSearchTerm,
    loading, loadingInitial,
    userId,
    handleSubmeterProjeto
  } = useStudentProjects();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {view === "list" && (
        <>
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

          {loadingInitial ? (
            <div className="text-center p-10 text-gray-500">Carregando projetos...</div>
          ) : meusProjetos.length > 0 ? (
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

          <ProjectModal 
            projetoSelecionado={projetoSelecionado} 
            onClose={() => setProjetoSelecionado(null)} 
          />
        </>
      )}

      {view === "new" && (
        <>
          <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <div>
              <button 
                onClick={() => setView("list")}
                className="text-sm font-medium text-[#0F4C8A] hover:text-blue-800 flex items-center gap-2 mb-2 transition-colors"
              >
                &larr; Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Submeter Novo Projeto</h1>
            </div>
          </header>

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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-[#0F4C8A] focus:border-[#0F4C8A] text-sm h-32 resize-none"
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

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Membros da Equipe</h3>
                
                <InputField
                  labelText="Nome da Equipe"
                  type="text"
                  id="nomeEquipe"
                  value={nomeEquipe}
                  onChange={(e) => setNomeEquipe(e.target.value)}
                  placeholder="Ex: Data Wizards"
                  labelClassName="!text-sm"
                  required={true}
                />

                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Selecionar Turma para convidar membros
                  </label>
                  <select
                    value={selectedTurma}
                    onChange={(e) => {
                      setSelectedTurma(e.target.value);
                      setSelectedMembros([]); // limpa a seleção ao trocar de turma
                      setSearchTerm(""); // limpa o filtro
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#0F4C8A] focus:border-[#0F4C8A] text-sm mb-4"
                  >
                    <option value="">Selecione uma turma</option>
                    {turmas.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {selectedTurma && alunosDaTurma.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-80 overflow-y-auto">
                    <div className="mb-4">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Pesquisar aluno por nome..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0F4C8A] focus:border-[#0F4C8A] text-sm"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">Alunos da turma {selectedTurma}:</p>
                    <div className="space-y-2">
                      {alunosDaTurma
                        .filter(aluno => {
                          const nome = aluno.nome_usuario || aluno.usuario?.nome_usuario || `Aluno #${aluno.id_aluno}`;
                          return nome.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                        .map(aluno => {
                          const isLogado = aluno.id_aluno === userId;
                          return (
                            <label 
                              key={aluno.id_aluno} 
                              className={`flex items-center gap-3 p-2 rounded border border-transparent transition ${
                                isLogado ? 'bg-blue-50 cursor-default' : 'hover:bg-white hover:border-gray-200 cursor-pointer'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isLogado ? true : selectedMembros.includes(aluno.id_aluno)}
                                disabled={isLogado}
                                onChange={() => handleToggleMembro(aluno.id_aluno)}
                                className="w-4 h-4 text-[#0F4C8A] border-gray-300 rounded focus:ring-[#0F4C8A]"
                              />
                              <div>
                                <span className="text-sm font-medium text-gray-900 block flex items-center gap-2">
                                  {aluno.nome_usuario || aluno.usuario?.nome_usuario || `Aluno #${aluno.id_aluno}`}
                                  {isLogado && <span className="text-[10px] uppercase font-bold tracking-wider text-[#0F4C8A] bg-blue-100 px-2 py-0.5 rounded-full">Você</span>}
                                </span>
                                <span className="text-xs text-gray-500">Matrícula: {aluno.matricula}</span>
                              </div>
                            </label>
                          )
                        })}
                    </div>
                  </div>
                )}
                {selectedTurma && alunosDaTurma.length === 0 && (
                  <p className="text-sm text-gray-500">Nenhum aluno encontrado nesta turma.</p>
                )}
                
                {selectedMembros.length > 0 && (
                  <p className="text-sm text-[#0F4C8A] font-medium mt-3">
                    {selectedMembros.length} colega(s) selecionado(s) para a equipe.
                  </p>
                )}
              </div>

            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
              <Button type="submit" variant="primary" fullWidth={false} className="px-8" loading={loading} loadingText="Submetendo...">
                Submeter
              </Button>
              <Button type="button" variant="secondary" fullWidth={false} onClick={() => setView("list")} disabled={loading}>
                Cancelar
              </Button>
            </div>
          </form>
        </>
      )}

    </div>
  );
}