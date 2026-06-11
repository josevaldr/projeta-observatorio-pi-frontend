import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_usuario: name,
          email: email,
          senha: password,
          tipo_usuario: "aluno",
        }),
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

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Retornamos tudo o que o componente visual vai precisar acessar
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleRegister,
  };
}
