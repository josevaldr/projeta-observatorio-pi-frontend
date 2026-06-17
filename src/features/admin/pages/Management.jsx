import { useState } from "react";
import Button from "../../../shared/components/Button";
import InputField from "../../../shared/components/InputField";

// Mock Data
const MOCK_CLASSES = [
  { id: 1, name: "TADS25.103", course: "Análise e Desenvolvimento de Sistemas", period: "Noturno", teacher: "Prof. Marcos", activeProjects: 5 },
  { id: 2, name: "TSI24.201", course: "Sistemas para Internet", period: "Matutino", teacher: "Prof. Marcos", activeProjects: 2 },
  { id: 3, name: "REDES25.101", course: "Redes de Computadores", period: "Noturno", teacher: "Profa. Ana", activeProjects: 0 },
];

const MOCK_TEACHERS = [
  { id: 101, name: "Prof. Marcos", email: "marcos@senac.br", linkedClasses: 2 },
  { id: 102, name: "Profa. Ana", email: "ana@senac.br", linkedClasses: 1 },
  { id: 103, name: "Prof. Carlos", email: "carlos@senac.br", linkedClasses: 0 },
];

export default function Management() {
  const [activeTab, setActiveTab] = useState("classes"); // 'classes' | 'teachers'

  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [teachers, setTeachers] = useState(MOCK_TEACHERS);

  // States for New Class
  const [newClassName, setNewClassName] = useState("");
  const [newClassCourse, setNewClassCourse] = useState("");
  const [newClassTeacher, setNewClassTeacher] = useState("");

  // States for New Teacher
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");

  // --- ACTIONS ---
  const handleRemoveClass = (cls) => {
    if (cls.activeProjects > 0) {
      alert(`⚠️ Bloqueio: A turma ${cls.name} não pode ser removida pois possui ${cls.activeProjects} projetos vinculados ativamente.`);
      return;
    }
    if (window.confirm(`Tem certeza que deseja remover a turma ${cls.name}?`)) {
      setClasses(classes.filter((c) => c.id !== cls.id));
    }
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: Date.now(),
      name: newClassName,
      course: newClassCourse,
      period: "A Definir",
      teacher: newClassTeacher || "Sem Professor",
      activeProjects: 0,
    };
    setClasses([...classes, newClass]);
    setNewClassName("");
    setNewClassCourse("");
    setNewClassTeacher("");
  };

  const handleRemoveTeacher = (teacher) => {
    if (teacher.linkedClasses > 0) {
      alert(`⚠️ Bloqueio: Não é possível remover o professor(a) ${teacher.name} pois ele possui ${teacher.linkedClasses} turmas vinculadas que ficariam sem professor focal.`);
      return;
    }
    if (window.confirm(`Tem certeza que deseja remover o professor(a) ${teacher.name}?`)) {
      setTeachers(teachers.filter((t) => t.id !== teacher.id));
    }
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: Date.now(),
      name: newTeacherName,
      email: newTeacherEmail,
      linkedClasses: 0,
    };
    setTeachers([...teachers, newTeacher]);
    setNewTeacherName("");
    setNewTeacherEmail("");
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      <header className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão e Cadastros</h1>
        <p className="text-gray-500">
          Gerencie o catálogo de turmas e o corpo docente responsável pelos Projetos Integradores.
        </p>
      </header>

      {/* TABS NAVIGATION */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("classes")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === "classes"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          🎓 Turmas e Períodos
        </button>
        <button
          onClick={() => setActiveTab("teachers")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === "teachers"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          👨‍🏫 Professores Focais
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LIST SECTION */}
        <div className="xl:col-span-2">
          {activeTab === "classes" ? (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Turmas Ativas ({classes.length})</h2>
              {classes.map((cls) => (
                <div key={cls.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{cls.name} <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">{cls.period}</span></h3>
                    <p className="text-sm text-gray-600 mb-2">{cls.course}</p>
                    <div className="flex gap-4 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1">👨‍🏫 {cls.teacher}</span>
                      <span className="flex items-center gap-1">📂 {cls.activeProjects} Projetos</span>
                    </div>
                  </div>
                  <Button type="button" variant="danger" fullWidth={false} className="!py-1.5 !px-4 text-xs shrink-0" onClick={() => handleRemoveClass(cls)}>
                    Remover
                  </Button>
                </div>
              ))}
              {classes.length === 0 && <p className="text-gray-500 italic">Nenhuma turma cadastrada.</p>}
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Corpo Docente ({teachers.length})</h2>
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{teacher.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{teacher.email}</p>
                    <div className="flex gap-4 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
                      🎓 Vinculado a {teacher.linkedClasses} turmas
                    </div>
                  </div>
                  <Button type="button" variant="danger" fullWidth={false} className="!py-1.5 !px-4 text-xs shrink-0" onClick={() => handleRemoveTeacher(teacher)}>
                    Remover
                  </Button>
                </div>
              ))}
              {teachers.length === 0 && <p className="text-gray-500 italic">Nenhum professor cadastrado.</p>}
            </div>
          )}
        </div>

        {/* ADD NEW ITEM SECTION */}
        <div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
            {activeTab === "classes" ? (
              <form onSubmit={handleAddClass} className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Adicionar Turma</h2>
                <InputField labelText="Código da Turma" type="text" id="newClassName" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} required placeholder="Ex: TADS25" labelClassName="!text-xs" />
                <InputField labelText="Curso" type="text" id="newClassCourse" value={newClassCourse} onChange={(e) => setNewClassCourse(e.target.value)} required placeholder="Ex: Sistemas" labelClassName="!text-xs" />
                
                <div>
                  <label className="block text-gray-700 font-semibold text-xs uppercase mb-2">Professor Focal</label>
                  <select value={newClassTeacher} onChange={(e) => setNewClassTeacher(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-blue-600 text-sm bg-white">
                    <option value="" disabled>Selecione um professor</option>
                    {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                
                <Button type="submit" variant="primary" fullWidth={true} className="mt-4">Registrar Turma</Button>
              </form>
            ) : (
              <form onSubmit={handleAddTeacher} className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Adicionar Professor Focal</h2>
                <InputField labelText="Nome do Professor" type="text" id="newTeacherName" value={newTeacherName} onChange={(e) => setNewTeacherName(e.target.value)} required placeholder="Ex: Prof. João" labelClassName="!text-xs" />
                <InputField labelText="E-mail" type="email" id="newTeacherEmail" value={newTeacherEmail} onChange={(e) => setNewTeacherEmail(e.target.value)} required placeholder="joao@senac.br" labelClassName="!text-xs" />
                
                <Button type="submit" variant="primary" fullWidth={true} className="mt-4">Cadastrar Professor</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
