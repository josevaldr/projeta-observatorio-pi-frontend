import { useState, useEffect } from "react";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTurma, setSelectedTurma] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/alunos/");
      if (response.ok) {
        const data = await response.json();
        const listaAlunos = data.alunos || [];
        
        // Group students by turma
        const turmasMap = {};
        listaAlunos.forEach(aluno => {
          if (!aluno.turma) return;
          if (!turmasMap[aluno.turma]) {
            turmasMap[aluno.turma] = {
              id: aluno.turma,
              name: aluno.turma,
              course: aluno.curso || "Curso não especificado",
              students: [],
            };
          }
          turmasMap[aluno.turma].students.push({
            id: aluno.id_aluno,
            name: aluno.nome_usuario || aluno.usuario?.nome_usuario || `Aluno #${aluno.id_aluno}`,
            matricula: aluno.matricula
          });
        });

        setClasses(Object.values(turmasMap));
      }
    } catch (error) {
      console.error("Erro ao buscar alunos/turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      {selectedTurma ? (
        // DETAILD VIEW FOR A CLASS
        <>
          <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <div>
              <button
                onClick={() => setSelectedTurma(null)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2 transition-colors"
              >
                &larr; Voltar para Turmas
              </button>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Turma {selectedTurma.name}
              </h1>
              <p className="text-sm text-gray-500">
                Alunos matriculados nesta turma ({selectedTurma.students.length}).
              </p>
            </div>
          </header>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {selectedTurma.students.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-semibold">Nome do Aluno</th>
                    <th className="p-4 font-semibold">Matrícula</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTurma.students.map((aluno, index) => (
                    <tr 
                      key={aluno.id} 
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index === selectedTurma.students.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <td className="p-4 text-sm font-medium text-gray-900">{aluno.name}</td>
                      <td className="p-4 text-sm text-gray-600">{aluno.matricula || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-gray-500">
                Nenhum aluno encontrado para esta turma.
              </div>
            )}
          </div>
        </>
      ) : (
        // CLASSES LIST VIEW
        <>
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Turmas
              </h1>
              <p className="text-sm text-gray-500">
                Acompanhe as turmas registradas no sistema.
              </p>
            </div>
          </header>

          {loading ? (
            <div className="text-center p-10 text-gray-500">Carregando turmas...</div>
          ) : classes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => setSelectedTurma(cls)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {cls.name}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{cls.course}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">{cls.students.length}</span> Alunos
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                    <span className="text-sm text-blue-600 font-semibold group-hover:underline">Ver Alunos &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-gray-500">
                Nenhuma turma cadastrada no sistema.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
