import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../shared/components/InputField";
import { useRegister } from "../../../shared/hooks/useRegister.js";
import Button from "../../../shared/components/Button";

export default function Register() {
  const {
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
  } = useRegister();

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <Link
          to="/login"
          className="inline-block mt-4 px-4 py-2 bg-[#0F4C8A] text-white font-medium rounded-md hover:bg-[#0D3E70] transition"
        >
          Voltar
        </Link>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Registrar
        </h2>

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

        <form onSubmit={handleRegister} className="space-y-6">
          <InputField
            labelText="Nome"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />

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

          <InputField
            labelText="Confirmar Senha"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />

          <Button
            loading={loading}
            loadingText="Cadastrando..."
            text="Registrar"
          />
        </form>
      </div>
    </div>
  );
}
