import { useState, useMemo, useEffect } from "react";
import ProjectModal from "../../projects/components/ProjectModal";
import Button from "../../../shared/components/Button";

export default function Showcase() {
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowcaseData();
  }, []);

  const fetchShowcaseData = async () => {
    try {
      setLoading(true);
      // 1. Fetch Alunos (para descobrir as turmas)
      const alunosRes = await fetch("http://127.0.0.1:8000/alunos/");
      let alunosMap = {};
      if (alunosRes.ok) {
         const alunosData = await alunosRes.json();
         const listaAlunos = alunosData.alunos || [];
         listaAlunos.forEach(a => {
            alunosMap[a.id_aluno] = {
              nome: a.nome_usuario || a.usuario?.nome_usuario || `Aluno #${a.id_aluno}`,
              email: a.usuario?.email || "",
              turma: a.turma || "Turma Indefinida"
            };
         });
      }

      // 2. Fetch Projetos
      const projRes = await fetch("http://127.0.0.1:8000/projetos/");
      if (projRes.ok) {
         const resData = await projRes.json();
         const data = Array.isArray(resData) ? resData : (resData.value || []);
         
         // Pegar apenas projetos avaliados/concluidos
         const avaliados = data.filter(p => String(p.status_projeto || "").toLowerCase() === "avaliado" || String(p.status_projeto || "").toLowerCase() === "concluido");

         // 3. Enriquecer com avaliações e montar o objeto final
         const enriched = await Promise.all(avaliados.map(async p => {
            let avaliacaoFormatada = null;
            if (p.cod_id_avaliacao) {
               try {
                  const evalRes = await fetch(`http://127.0.0.1:8000/avaliacoes/${p.cod_id_avaliacao}`);
                  if (evalRes.ok) {
                     const evalData = await evalRes.json();
                     avaliacaoFormatada = {
                        nota: parseFloat(evalData.conceito) || 0,
                        avaliador: "Professor(a)",
                        data: evalData.data_avaliacao ? evalData.data_avaliacao.split("-").reverse().join("/") : new Date().toLocaleDateString("pt-BR"),
                        comentarios: evalData.feedback || ""
                     };
                  }
               } catch (e) {
                 console.error("Erro avaliacao", e);
               }
            }

            // Identificar turma com base no primeiro membro da equipe
            let turmaProjeto = "Não Especificada";
            let contatosEmail = [];
            let membrosNomes = [];

            if (p.equipe && p.equipe.id_alunos) {
               p.equipe.id_alunos.forEach(id_aluno => {
                  const alunoData = alunosMap[id_aluno];
                  if (alunoData) {
                     if (turmaProjeto === "Não Especificada" && alunoData.turma) {
                        turmaProjeto = alunoData.turma;
                     }
                     if (alunoData.email) contatosEmail.push(alunoData.email);
                     membrosNomes.push(alunoData.nome);
                  }
               });
            }

            if (membrosNomes.length === 0 && p.equipe?.alunos) {
               membrosNomes = p.equipe.alunos; // Fallback para array de strings se existir
            }

            return {
               id: p.id_projeto,
               titulo: p.titulo,
               descricao: p.descricao || "Sem descrição.",
               data_upload: p.data_upload ? p.data_upload.split("-").reverse().join("/") : "Sem data",
               status_projeto: "concluido",
               link_projeto: p.link_projeto || "",
               turma: turmaProjeto,
               contatos: contatosEmail,
               equipe: {
                  nome_equipe: p.equipe?.nome_equipe || "Equipe",
                  alunos: membrosNomes
               },
               avaliacao: avaliacaoFormatada || { nota: 0, avaliador: "-", data: "-", comentarios: "" }
            };
         }));

         setShowcaseProjects(enriched);
      }
    } catch (err) {
      console.error("Erro ao carregar vitrine:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return showcaseProjects.filter((p) => {
      const matchScore = (p.avaliacao?.nota || 0) >= filterMinScore;
      return matchScore;
    });
  }, [filterMinScore, showcaseProjects]);

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

        <div className="flex flex-col md:flex-row gap-6 max-w-md">
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
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Carregando projetos de destaque...
        </div>
      ) : (
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
                  Destaque
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
                Tente ajustar o filtro de nota para encontrar mais projetos.
              </p>
              <Button
                type="button"
                variant="secondary"
                fullWidth={false}
                className="mt-6"
                onClick={() => setFilterMinScore(0)}
              >
                Limpar Filtro
              </Button>
            </div>
          )}
        </div>
      )}

      {/* MODAL DETALHADO DO PROJETO */}
      <ProjectModal
        projetoSelecionado={projetoSelecionado}
        onClose={() => setProjetoSelecionado(null)}
      />
    </div>
  );
}
