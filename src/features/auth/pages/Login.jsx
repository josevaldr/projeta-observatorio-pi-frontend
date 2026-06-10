import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);
    // Adicionar lógica de login aqui
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Bem-vindo
        </h2>
        <p className="text-md text-center text-gray-600 mb-8">
          Acesse sua conta para continuar
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField
            labelText="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />

          <InputField
            labelText="Senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          <Button type="submit" onClick={handleLogin}>
            Entrar
          </Button>
        </form>
        <Link
          to="/register"
          className="w-full block border border-gray-300 text-center mt-3 bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-100"
        >
          Criar conta gratuita
        </Link>
      </div>
    </div>
  );
}
