import { Link } from "react-router-dom";
import InputField from "../../../shared/components/InputField";
import { useRegister } from "../../../shared/hooks/useRegister.js";
import Button from "../../../shared/components/Button";

export default function Register() {
  const {
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
  } = useRegister();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <Link
          to="/login"
          className="inline-block mb-4 px-4 py-2 bg-[#0F4C8A] text-white font-medium rounded-md hover:bg-[#0D3E70] transition"
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Usuário
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0F4C8A] focus:border-[#0F4C8A]"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>

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

          {userType === "aluno" && (
            <>
              <InputField
                labelText="Matrícula"
                type="number"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Digite sua matrícula"
              />
              <InputField
                labelText="Curso"
                type="text"
                id="curso"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="Digite seu curso"
              />
              <InputField
                labelText="Turma"
                type="text"
                id="turma"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                placeholder="Digite sua turma"
              />
            </>
          )}

          {userType === "professor" && (
            <InputField
              labelText="Especialidade"
              type="text"
              id="especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              placeholder="Digite sua especialidade"
            />
          )}

          {userType === "empresa" && (
            <>
              <InputField
                labelText="CNPJ"
                type="text"
                id="cnpj"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="Digite o CNPJ"
              />
              <InputField
                labelText="Telefone"
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Digite o telefone"
              />
            </>
          )}

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
