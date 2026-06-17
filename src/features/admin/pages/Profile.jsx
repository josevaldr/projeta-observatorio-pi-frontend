import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";

export default function Profile() {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [nome, setNome] = useState(user.nome_usuario || "Coordenação Geral");
  const [email, setEmail] = useState(user.email || "coordenacao@senac.br");

  const [dadosFixos] = useState({
    tipo_usuario: "coordenação",
    unidade: "Senac Campus Tech",
    departamento: "Projetos Integradores",
  });

  const handleSalvar = (e) => {
    e.preventDefault();
    setEditando(false);
  };

  const handleSair = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex-1 bg-white min-h-screen p-8 text-gray-800 flex flex-col justify-between">
      <div>
        {!editando ? (
          <>
            <header className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                  Perfil Institucional
                </h1>
                <p className="text-xs text-gray-400 capitalize">
                  {dadosFixos.tipo_usuario}
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                fullWidth={false}
                onClick={() => setEditando(true)}
                className="gap-2 shadow-xs"
              >
                Editar Perfil
              </Button>
            </header>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {nome.substring(0, 2).toUpperCase()}
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
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                Editar Perfil
              </h1>
            </header>

            <form onSubmit={handleSalvar} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs max-w-2xl mb-6 space-y-4">
              <InputField
                labelText="Nome do Coordenador / Departamento"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              <InputField
                labelText="E-mail Institucional"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              <div className="flex gap-3 pt-2">
                <Button type="submit" text="Salvar Alterações" variant="primary" fullWidth={false} />
                <Button type="button" text="Cancelar" variant="secondary" fullWidth={false} onClick={() => setEditando(false)} />
              </div>
            </form>
          </>
        )}

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Unidade
            </span>
            <span className="text-sm font-bold text-gray-900">
              {dadosFixos.unidade}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Departamento
            </span>
            <span className="text-sm font-bold text-gray-900">
              {dadosFixos.departamento}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Privilégios
            </span>
            <span className="text-sm font-bold text-blue-600 capitalize flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Administrador do Sistema
            </span>
          </div>
        </div>

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
