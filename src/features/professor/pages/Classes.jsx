import { useState } from "react";
import Button from "../../../shared/components/Button";
import InputField from "../../../shared/components/InputField";

const MOCK_CLASSES = [
  {
    id: 1,
    name: "TADS25.103",
    course: "Análise e Desenvolvimento de Sistemas",
    period: "Noturno",
    studentsCount: 45,
  },
  {
    id: 2,
    name: "TADS25.104",
    course: "Análise e Desenvolvimento de Sistemas",
    period: "Matutino",
    studentsCount: 38,
  },
  {
    id: 3,
    name: "TSI24.201",
    course: "Sistemas para Internet",
    period: "Noturno",
    studentsCount: 25,
  },
];

export default function Classes() {
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [view, setView] = useState("list"); // 'list' | 'new'

  // New Class Form State
  const [newClassName, setNewClassName] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newPeriod, setNewPeriod] = useState("");

  const handleRemoveClass = (id, name) => {
    if (window.confirm(`Tem certeza que deseja remover a turma ${name}?`)) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: Date.now(),
      name: newClassName,
      course: newCourse,
      period: newPeriod,
      studentsCount: 0,
    };
    setClasses([...classes, newClass]);
    setNewClassName("");
    setNewCourse("");
    setNewPeriod("");
    setView("list");
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      {view === "list" && (
        <>
          {/* HEADER */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Minhas Turmas
              </h1>
              <p className="text-sm text-gray-500">
                Gerencie as turmas pelas quais você é responsável.
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              fullWidth={false}
              onClick={() => setView("new")}
              className="gap-2 shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Adicionar Turma
            </Button>
          </header>

          {/* CLASSES LIST */}
          {classes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {cls.name}
                      </h2>
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {cls.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{cls.course}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                      <svg
                        className="w-5 h-5"
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
                      {cls.studentsCount} Alunos
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    fullWidth={true}
                    onClick={() => handleRemoveClass(cls.id, cls.name)}
                    className="!py-2"
                  >
                    Remover Turma
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <p className="text-gray-500 mb-4">
                Você não possui turmas cadastradas.
              </p>
              <Button
                type="button"
                variant="primary"
                fullWidth={false}
                onClick={() => setView("new")}
              >
                Adicionar minha primeira turma
              </Button>
            </div>
          )}
        </>
      )}

      {view === "new" && (
        <>
          {/* NEW CLASS HEADER */}
          <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <div>
              <button
                onClick={() => setView("list")}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2 transition-colors"
              >
                &larr; Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Adicionar Nova Turma
              </h1>
            </div>
          </header>

          {/* NEW CLASS FORM */}
          <form
            onSubmit={handleAddClass}
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm max-w-2xl"
          >
            <div className="space-y-6">
              <InputField
                labelText="Código/Nome da Turma"
                type="text"
                id="className"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                required={true}
                placeholder="Ex: TADS25.103"
                labelClassName="!text-sm"
              />

              <InputField
                labelText="Curso"
                type="text"
                id="course"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                required={true}
                placeholder="Ex: Análise e Desenvolvimento de Sistemas"
                labelClassName="!text-sm"
              />

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Período
                </label>
                <select
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-blue-600 text-sm bg-white"
                >
                  <option value="" disabled>
                    Selecione o período
                  </option>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Noturno">Noturno</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
              <Button
                type="submit"
                variant="primary"
                fullWidth={false}
                className="px-8"
              >
                Salvar Turma
              </Button>
              <Button
                type="button"
                variant="secondary"
                fullWidth={false}
                onClick={() => setView("list")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
