import { useState, useEffect } from "react";

export function useAdminManagement() {
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

  return {
    activeTab,
    setActiveTab,
    students,
    teachers,
    loading,
    newTeacherName,
    setNewTeacherName,
    newTeacherEmail,
    setNewTeacherEmail,
    newTeacherPassword,
    setNewTeacherPassword,
    newTeacherSpecialty,
    setNewTeacherSpecialty,
    newStudentName,
    setNewStudentName,
    newStudentEmail,
    setNewStudentEmail,
    newStudentPassword,
    setNewStudentPassword,
    newStudentRegistration,
    setNewStudentRegistration,
    newStudentCourse,
    setNewStudentCourse,
    newStudentClass,
    setNewStudentClass,
    submitting,
    handleAddTeacher,
    handleAddStudent,
    handleRemoveUser
  };
}
