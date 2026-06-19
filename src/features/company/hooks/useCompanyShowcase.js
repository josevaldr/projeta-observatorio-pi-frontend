import { useState, useMemo, useEffect } from "react";

export function useCompanyShowcase() {
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

  return {
    filterMinScore,
    setFilterMinScore,
    projetoSelecionado,
    setProjetoSelecionado,
    showcaseProjects,
    loading,
    filteredProjects,
    fetchShowcaseData
  };
}
