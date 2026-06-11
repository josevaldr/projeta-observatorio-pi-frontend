import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import logo from "../../../assets/Frame 1.png";

import { useLogin } from "../../../shared/hooks/useLogin.js";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    handleLogin,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        {/* Logo */}
        <div className="mb-6 flex justify-start">
          <img
            src={logo}
            alt="Logo Observatório PI"
            className="h-27 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo</h2>

        <p className="text-md text-gray-600 mb-8">
          Acesse sua conta para continuar.
        </p>

        {error && (
          <div className="mb-4 text-center text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-center text-green-600 bg-green-100 p-2 rounded">
            {success}
          </div>
        )}

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

          <Button
            loading={loading}
            loadingText="Verificando..."
            text="Entrar"
          />
        </form>

        <Link
          to="/cadastrar"
          className="w-full block border border-gray-300 text-center mt-3 bg-white text-[#0F4C8A] font-bold py-2 px-4 rounded hover:bg-gray-100"
        >
          Criar conta gratuita
        </Link>
      </div>
    </div>
  );
}
