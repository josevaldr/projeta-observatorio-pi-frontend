import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";

export default function Perfil() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [nome, setNome] = useState(user.nome_usuario || "Maria Silva");
  const [email, setEmail] = useState(user.email || "maria.silva@email.com");

  // mock dados do aluno
  const [dadosFixos] = useState({
    tipo_usuario: "aluno",
    matricula: 23232277,
    curso: "Análise e Desenvolvimento de Sistemas",
    turma: "TADS25.103",
  });

  // handler provisório sem integração
  const handleSalvar = (e) => {
    e.preventDefault();
    setEditando(false); 
  };

  // handler provisório sem integração
  const handleSair = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex-1 bg-white min-h-screen p-8 text-gray-800 flex flex-col justify-between">
      <div>
        {/* Renderização Condicional: Se NÃO estiver editando, mostra o Perfil normal */}
        {!editando ? (
          <>
            {/* --- TELA DE VISUALIZAÇÃO --- */}
            <header className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                  Perfil
                </h1>
                <p className="text-xs text-gray-400 capitalize">
                  {dadosFixos.tipo_usuario}
                </p>
              </div>

              {/* Botão que ativa o modo de edição */}
              <Button
                type="button"
                variant="primary"
                fullWidth={false}
                onClick={() => setEditando(true)}
                className="gap-2 shadow-xs"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Editar perfil
              </Button>
            </header>

            {/* Card Principal */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-950 leading-tight">
                  {nome}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{email}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* --- TELA DO FORMULÁRIO DE EDIÇÃO --- */}
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                Editar Perfil
              </h1>
              <p className="text-xs text-gray-400">
                Atualize suas informações de contato
              </p>
            </header>

            <form
              onSubmit={handleSalvar}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs max-w-2xl mb-6 space-y-4"
            >
              {/* Campo Nome */}
              <InputField
                labelText="Nome Completo"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              {/* Campo E-mail */}
              <InputField
                labelText="E-mail"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              {/* Botões do Formulário */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  text="Salvar Alterações"
                  variant="primary"
                  fullWidth={false}
                />
                <Button
                  type="button"
                  text="Cancelar"
                  variant="secondary"
                  fullWidth={false}
                  onClick={() => setEditando(false)}
                />
              </div>
            </form>
          </>
        )}

        {/* 3. DETALHES ADICIONAIS (Fica visível em ambos os modos, pois são dados acadêmicos fixos) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Curso
            </span>
            <span className="text-sm font-bold text-gray-900">
              {dadosFixos.curso}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Turma
            </span>
            <span className="text-sm font-bold text-gray-900">
              {dadosFixos.turma}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Matrícula
            </span>
            <span className="text-sm font-bold text-gray-900">
              {dadosFixos.matricula}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Tipo de Conta
            </span>
            <span className="text-sm font-bold text-gray-900 capitalize">
              {dadosFixos.tipo_usuario}
            </span>
          </div>
        </div>

        {/* 4. BOTÃO SAIR (Escondido temporariamente se estiver editando para limpar o visual) */}
        {!editando && (
          <Button
            type="button"
            text="Sair da conta"
            variant="danger"
            fullWidth={true}
            onClick={handleSair}
          />
        )}
      </div>
    </div>
  );
}
