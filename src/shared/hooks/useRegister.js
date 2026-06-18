import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Tipo de usuário
  const [userType, setUserType] = useState("aluno");

  // Campos de Aluno
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [turma, setTurma] = useState("");

  // Campos de Professor
  const [especialidade, setEspecialidade] = useState("");

  // Campos de Empresa
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      let endpoint = "";
      let payload = {
        nome_usuario: name,
        email: email,
        senha: password,
      };

      if (userType === "aluno") {
        endpoint = "http://127.0.0.1:8000/alunos/completo";
        payload = {
          ...payload,
          matricula: parseInt(matricula) || 0,
          curso: curso,
          turma: turma,
        };
      } else if (userType === "professor") {
        endpoint = "http://127.0.0.1:8000/professores/completo";
        payload = {
          ...payload,
          especialidade: especialidade,
        };
      } else if (userType === "empresa") {
        endpoint = "http://127.0.0.1:8000/empresas/completo";
        payload = {
          ...payload,
          telefone: telefone,
          cnpj: cnpj,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("Erro detalhado do servidor:", data);
        const errorMsg =
          data.detail?.[0]?.msg ||
          data.detail ||
          data.message ||
          "Erro na validação dos campos.";
        const errorField = data.detail?.[0]?.loc?.[1] || "";
        throw new Error(
          errorField ? `${errorMsg} no campo: ${errorField}` : errorMsg,
        );
      }

      setSuccess("Cadastro realizado com sucesso!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMatricula("");
      setCurso("");
      setTurma("");
      setEspecialidade("");
      setTelefone("");
      setCnpj("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    userType, setUserType,
    matricula, setMatricula,
    curso, setCurso,
    turma, setTurma,
    especialidade, setEspecialidade,
    telefone, setTelefone,
    cnpj, setCnpj,
    loading,
    error,
    success,
    handleRegister,
  };
}
