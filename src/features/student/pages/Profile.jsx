import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState("Maria Silva");
  const [email, setEmail] = useState("maria.silva@email.com");

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
              <button
                onClick={() => setEditando(true)}
                className="flex items-center gap-2 bg-[#0F4C8A] hover:bg-[#0D3E70] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
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
              </button>
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
              <div>
                <label className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-blue-600"
                  required
                />
              </div>

              {/* Campo E-mail */}
              <div>
                <label className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-blue-600"
                  required
                />
              </div>

              {/* Botões do Formulário */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#0F4C8A] hover:bg-[#0D3E70] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Cancelar
                </button>
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
          <button
            onClick={handleSair}
            className="w-full border border-red-100 hover:bg-red-50 text-red-600 font-semibold text-xs py-3 rounded-xl transition-all text-center cursor-pointer"
          >
            Sair da conta
          </button>
        )}
      </div>
    </div>
  );
}
