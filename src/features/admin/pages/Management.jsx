import { useState, useEffect } from "react";
import Button from "../../../shared/components/Button";
import InputField from "../../../shared/components/InputField";

export default function Management() {
  const [activeTab, setActiveTab] = useState("students"); // 'students' | 'teachers'

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for New Teacher
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherPassword, setNewTeacherPassword] = useState("");
  const [newTeacherSpecialty, setNewTeacherSpecialty] = useState("");

  // States for New Student
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");
  const [newStudentRegistration, setNewStudentRegistration] = useState("");
  const [newStudentCourse, setNewStudentCourse] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Alunos
      const alunosRes = await fetch("http://127.0.0.1:8000/alunos/");
      if (alunosRes.ok) {
        const alunosData = await alunosRes.json();
        const listaAlunos = alunosData.alunos || [];
        
        const mappedStudents = listaAlunos.map(a => ({
          id: a.id_aluno,
          name: a.nome_usuario || a.usuario?.nome_usuario || `Aluno #${a.id_aluno}`,
          email: a.usuario?.email || "Sem e-mail",
          registration: a.matricula || "-",
          course: a.curso || "Não Informado",
          turma: a.turma || "Indefinida"
        }));
        setStudents(mappedStudents);
      }

      // 2. Fetch Professores
      const profsRes = await fetch("http://127.0.0.1:8000/professores/");
      if (profsRes.ok) {
        const profsData = await profsRes.json();
        const listProfs = Array.isArray(profsData) ? profsData : (profsData.professores || []);
        
        const mappedTeachers = listProfs.map(p => ({
          id: p.id_professor || p.usuario?.id_usuario,
          name: p.usuario?.nome_usuario || p.nome_usuario || `Prof #${p.id_professor}`,
          email: p.usuario?.email || p.email || "Sem e-mail",
          specialty: p.especialidade || "Geral"
        }));
        setTeachers(mappedTeachers);
      }
    } catch (err) {
      console.error("Erro ao carregar cadastros:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!newTeacherName || !newTeacherEmail || !newTeacherPassword || !newTeacherSpecialty) {
       alert("Preencha todos os campos obrigatórios para o professor.");
       return;
    }
    setSubmitting(true);
    try {
      const payload = {
        nome_usuario: newTeacherName,
        email: newTeacherEmail,
        senha: newTeacherPassword,
        especialidade: newTeacherSpecialty
      };

      const res = await fetch("http://127.0.0.1:8000/professores/completo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Professor cadastrado com sucesso!");
        setNewTeacherName("");
        setNewTeacherEmail("");
        setNewTeacherPassword("");
        setNewTeacherSpecialty("");
        fetchData();
      } else {
        alert("Erro ao cadastrar professor.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro de comunicação.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail || !newStudentPassword || !newStudentRegistration || !newStudentCourse || !newStudentClass) {
       alert("Preencha todos os campos obrigatórios para o aluno.");
       return;
    }
    setSubmitting(true);
    try {
      const payload = {
        nome_usuario: newStudentName,
        email: newStudentEmail,
        senha: newStudentPassword,
        matricula: parseInt(newStudentRegistration, 10),
        curso: newStudentCourse,
        turma: newStudentClass
      };

      const res = await fetch("http://127.0.0.1:8000/alunos/completo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Aluno cadastrado com sucesso!");
        setNewStudentName("");
        setNewStudentEmail("");
        setNewStudentPassword("");
        setNewStudentRegistration("");
        setNewStudentCourse("");
        setNewStudentClass("");
        fetchData();
      } else {
        alert("Erro ao cadastrar aluno.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro de comunicação.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveUser = async (user, type) => {
    if (window.confirm(`Tem certeza que deseja remover o(a) ${type} ${user.name}?`)) {
       alert(`Solicitação para remover ${user.name} enviada (Mock)`);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Cadastros</h1>
        <p className="text-gray-500">Administre os alunos e professores vinculados ao PROjeta.</p>
      </header>

      {/* TABS */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "students" ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Alunos
          {activeTab === "students" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-md"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("teachers")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "teachers" ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Professores Focais
          {activeTab === "teachers" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-md"></span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Carregando cadastros...</div>
      ) : (
        <>
          {/* TAB: STUDENTS */}
          {activeTab === "students" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* LISTA DE ALUNOS */}
              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Alunos Cadastrados</h2>
                    <p className="text-sm text-gray-500">Lista geral de alunos com acesso ao sistema.</p>
                  </div>
                  <div className="overflow-x-auto max-h-[600px]">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-gray-50/95 backdrop-blur z-10">
                        <tr className="text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                          <th className="px-6 py-4">Nome / Matrícula</th>
                          <th className="px-6 py-4">Turma / Curso</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {students.map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">Matrícula: {student.registration}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-medium text-gray-900">{student.turma}</p>
                              <p className="text-xs text-gray-500">{student.course}</p>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleRemoveUser(student, "aluno")}
                                className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                              >
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* FORMULARIO NOVO ALUNO */}
              <div className="xl:col-span-1">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Cadastrar Aluno</h2>
                  <p className="text-sm text-gray-500 mb-6">Insira um novo aluno na plataforma.</p>

                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <InputField
                      labelText="Nome Completo"
                      type="text"
                      id="newStudentName"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      required={true}
                      placeholder="Ex: João Souza"
                      labelClassName="!text-xs"
                    />

                    <InputField
                      labelText="E-mail"
                      type="email"
                      id="newStudentEmail"
                      value={newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                      required={true}
                      placeholder="Ex: joao@aluno.senac.br"
                      labelClassName="!text-xs"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        labelText="Senha de Acesso"
                        type="password"
                        id="newStudentPassword"
                        value={newStudentPassword}
                        onChange={(e) => setNewStudentPassword(e.target.value)}
                        required={true}
                        placeholder="Mínimo 6"
                        labelClassName="!text-xs"
                      />
                      <InputField
                        labelText="Matrícula"
                        type="number"
                        id="newStudentRegistration"
                        value={newStudentRegistration}
                        onChange={(e) => setNewStudentRegistration(e.target.value)}
                        required={true}
                        placeholder="Ex: 12345"
                        labelClassName="!text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        labelText="Curso"
                        type="text"
                        id="newStudentCourse"
                        value={newStudentCourse}
                        onChange={(e) => setNewStudentCourse(e.target.value)}
                        required={true}
                        placeholder="Ex: TADS"
                        labelClassName="!text-xs"
                      />
                      <InputField
                        labelText="Turma"
                        type="text"
                        id="newStudentClass"
                        value={newStudentClass}
                        onChange={(e) => setNewStudentClass(e.target.value)}
                        required={true}
                        placeholder="Ex: TADS25"
                        labelClassName="!text-xs"
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="primary" fullWidth={true} disabled={submitting}>
                        {submitting ? "Cadastrando..." : "Cadastrar Aluno"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          )}

          {/* TAB: TEACHERS */}
          {activeTab === "teachers" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* LISTA DE PROFESSORES */}
              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Professores Cadastrados</h2>
                    <p className="text-sm text-gray-500">Equipe docente habilitada para avaliar projetos.</p>
                  </div>
                  <div className="overflow-x-auto max-h-[600px]">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-gray-50/95 backdrop-blur z-10">
                        <tr className="text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">E-mail de Acesso</th>
                          <th className="px-6 py-4">Especialidade</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {teachers.map((prof) => (
                          <tr key={prof.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{prof.name}</td>
                            <td className="px-6 py-4 text-gray-600">{prof.email}</td>
                            <td className="px-6 py-4 text-gray-600">{prof.specialty}</td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleRemoveUser(prof, "professor")}
                                className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                              >
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* FORMULARIO NOVO PROFESSOR */}
              <div className="xl:col-span-1">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Cadastrar Professor</h2>
                  <p className="text-sm text-gray-500 mb-6">Adicione um novo avaliador à plataforma.</p>

                  <form onSubmit={handleAddTeacher} className="space-y-4">
                    <InputField
                      labelText="Nome Completo"
                      type="text"
                      id="newTeacherName"
                      value={newTeacherName}
                      onChange={(e) => setNewTeacherName(e.target.value)}
                      required={true}
                      placeholder="Ex: Ana Maria Silva"
                      labelClassName="!text-xs"
                    />

                    <InputField
                      labelText="E-mail"
                      type="email"
                      id="newTeacherEmail"
                      value={newTeacherEmail}
                      onChange={(e) => setNewTeacherEmail(e.target.value)}
                      required={true}
                      placeholder="Ex: ana@instituicao.edu.br"
                      labelClassName="!text-xs"
                    />

                    <InputField
                      labelText="Senha de Acesso"
                      type="password"
                      id="newTeacherPassword"
                      value={newTeacherPassword}
                      onChange={(e) => setNewTeacherPassword(e.target.value)}
                      required={true}
                      placeholder="Mínimo 6 caracteres"
                      labelClassName="!text-xs"
                    />

                    <InputField
                      labelText="Especialidade"
                      type="text"
                      id="newTeacherSpecialty"
                      value={newTeacherSpecialty}
                      onChange={(e) => setNewTeacherSpecialty(e.target.value)}
                      required={true}
                      placeholder="Ex: Desenvolvimento Web"
                      labelClassName="!text-xs"
                    />

                    <div className="pt-2">
                      <Button type="submit" variant="primary" fullWidth={true} disabled={submitting}>
                        {submitting ? "Cadastrando..." : "Cadastrar Professor"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          )}
        </>
      )}
    </div>
  );
}
