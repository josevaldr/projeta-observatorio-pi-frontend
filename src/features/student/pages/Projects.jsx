import { useState, useEffect } from "react";
import ProjectCard from "../../projects/components/ProjectCard";
import ProjectModal from "../../projects/components/ProjectModal";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";

export default function ProjetosAluno() {
  const [view, setView] = useState("list"); // 'list' | 'new'
  const [meusProjetos, setMeusProjetos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  // Estados do Formulário de Projeto
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [nomeEquipe, setNomeEquipe] = useState("");

  // Estados de Alunos para a Equipe
  const [allAlunos, setAllAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [alunosDaTurma, setAlunosDaTurma] = useState([]);
  const [selectedMembros, setSelectedMembros] = useState([]); // array de id_aluno
  const [searchTerm, setSearchTerm] = useState(""); // Filtro por nome

  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // O id do usuário logado:
  const userId = user.id_usuario || user.id || 0; 

  useEffect(() => {
    fetchProjetos();
    fetchAlunos();
  }, []);

  const fetchProjetos = async () => {
    try {
      setLoadingInitial(true);
      const response = await fetch("http://127.0.0.1:8000/projetos/");
      if (response.ok) {
        const resData = await response.json();
        const data = Array.isArray(resData) ? resData : (resData.value || []);
        
        // Filtra para exibir apenas os projetos que contêm o id do usuário atual na equipe
        const meus = data.filter(p => p.equipe && p.equipe.id_alunos && p.equipe.id_alunos.includes(userId));
        
        // Enriquecer com avaliações e formatar campos para a UI
        const enriched = await Promise.all(meus.map(async p => {
          let avaliacaoFormatada = null;
          if (p.cod_id_avaliacao) {
            try {
               const evalRes = await fetch(`http://127.0.0.1:8000/avaliacoes/${p.cod_id_avaliacao}`);
               if (evalRes.ok) {
                  const evalData = await evalRes.json();
                  avaliacaoFormatada = {
                     nota: parseFloat(evalData.conceito) || 0,
                     comentarios: evalData.feedback || "",
                     avaliador: "Professor(a)",
                     data: evalData.data_avaliacao ? evalData.data_avaliacao.split("-").reverse().join("/") : new Date().toLocaleDateString("pt-BR")
                  };
               }
            } catch (e) {
               console.error("Erro ao carregar avaliacao", e);
            }
          }

          let rawStatus = String(p.status_projeto || "pendente").toLowerCase();
          if (rawStatus === "avaliado") rawStatus = "concluido";

          return {
            ...p,
            status_projeto: rawStatus,
            data_upload: p.data_upload ? p.data_upload.split("-").reverse().join("/") : "Sem data",
            avaliacao: avaliacaoFormatada
          };
        }));

        setMeusProjetos(enriched);
      }
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
    } finally {
      setLoadingInitial(false);
    }
  };

  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/alunos/");
      if (response.ok) {
        const data = await response.json();
        const listaAlunos = data.alunos || [];
        setAllAlunos(listaAlunos);

        // Extrair turmas únicas (ignorando vazias/nulas)
        const turmasUnicas = [...new Set(listaAlunos.map(a => a.turma).filter(Boolean))];
        setTurmas(turmasUnicas);
      }
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
    }
  };

  // Atualiza lista de alunos disponíveis quando a turma é selecionada
  useEffect(() => {
    if (selectedTurma) {
      // Agora incluímos o próprio aluno na lista para exibição visual
      const filtrados = allAlunos.filter(a => a.turma === selectedTurma);
      setAlunosDaTurma(filtrados);
    } else {
      setAlunosDaTurma([]);
    }
  }, [selectedTurma, allAlunos]);

  const handleToggleMembro = (idAluno) => {
    if (selectedMembros.includes(idAluno)) {
      setSelectedMembros(selectedMembros.filter(id => id !== idAluno));
    } else {
      setSelectedMembros([...selectedMembros, idAluno]);
    }
  };

  const handleSubmeterProjeto = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Criar Projeto
      const projetoRes = await fetch("http://127.0.0.1:8000/projetos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descricao,
          link_projeto: link,
          status_projeto: "Pendente"
        })
      });
      if (!projetoRes.ok) throw new Error("Erro ao criar projeto");
      const projetoData = await projetoRes.json();
      const idProjeto = projetoData.id_projeto;

      // 2. Criar Equipe vinculada ao projeto
      const equipeRes = await fetch("http://127.0.0.1:8000/equipes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_equipe: nomeEquipe || "Equipe do Projeto",
          cod_id_projeto: idProjeto
        })
      });
      if (!equipeRes.ok) throw new Error("Erro ao criar equipe");
      const equipeData = await equipeRes.json();
      const idEquipe = equipeData.id_equipe;

      // 3. Adicionar Usuário Atual e Membros Selecionados à Equipe
      const semestre = "2026.1";
      // Garantir que não existam duplicatas caso o userId esteja em selectedMembros de alguma forma
      const todosMembros = [...new Set([userId, ...selectedMembros])];

      for (const membroId of todosMembros) {
        if (!membroId) continue;
        
        await fetch(`http://127.0.0.1:8000/equipes/${idEquipe}/alunos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cod_id_aluno: membroId,
            semestre: semestre
          })
        });
      }

      alert("Projeto submetido com sucesso!");

      // Limpar formulário e voltar
      setTitulo("");
      setDescricao("");
      setLink("");
      setNomeEquipe("");
      setSelectedTurma("");
      setSelectedMembros([]);
      setSearchTerm("");
      setView("list");
      
      // Recarregar a lista
      fetchProjetos();
    } catch (err) {
      console.error(err);
      alert("Houve um erro na submissão: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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