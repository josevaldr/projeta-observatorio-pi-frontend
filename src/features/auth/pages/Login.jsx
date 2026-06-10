import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import logo from "../../../assets/Frame 1.png";

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
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">

  {/* Logo */}
  <div className="mb-6 flex justify-start">
    <img
      src={logo}
      alt="Logo Observatório PI"
      className="h-30 object-contain"
    />
  </div>

  <h2 className="text-3xl font-bold text-gray-800 mb-2">
    Bem-vindo
  </h2>

  <p className="text-md text-gray-600 mb-8">
    Acesse sua conta para continuar.
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

    <Button type="submit">
      Entrar
    </Button>
  </form>

  <Link
    to="/cadastrar"
    className="w-full block border border-gray-300 text-center mt-3 bg-white text-[#0F4C8A] font-bold py-2 px-4 rounded hover:bg-[#325d9c]"
  >
    Criar conta gratuita
  </Link>

</div>
  );
}
