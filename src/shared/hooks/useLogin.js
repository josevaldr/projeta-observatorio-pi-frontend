import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro no login:", data);
        throw new Error(data.detail || "E-mail ou senha incorretos.");
      }

      setSuccess("Login realizado com sucesso!");

      // Salva os dados do usuário que o backend retornou
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("authToken", data.token || "");

      setEmail("");
      setPassword("");

      navigate("/aluno");
      
    } catch (err) {
      setError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    handleLogin,
  };
}
