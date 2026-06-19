import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";
import { useCompanyProfile } from "../hooks/useCompanyProfile";

export default function Profile() {
  const {
    editando,
    setEditando,
    loading,
    user,
    nomeContato,
    setNomeContato,
    email,
    setEmail,
    empresaData,
    handleSalvar,
    handleSair
  } = useCompanyProfile();

  return (
    <div className="flex-1 bg-white min-h-screen p-8 text-gray-800 flex flex-col justify-between">
      <div>
        {!editando ? (
          <>
            <header className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                  Perfil Corporativo
                </h1>
                <p className="text-xs text-gray-400 capitalize">
                  {user.tipo_usuario || "empresa parceira"}
                </p>
              </div>

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
                Editar contato
              </Button>
            </header>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {nomeContato
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2)}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-950 leading-tight">
                  {nomeContato}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{email}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                Editar Contato
              </h1>
              <p className="text-xs text-gray-400">
                Atualize o responsável pelo recrutamento
              </p>
            </header>

            <form
              onSubmit={handleSalvar}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs max-w-2xl mb-6 space-y-4"
            >
              <InputField
                labelText="Nome do Responsável / Departamento"
                type="text"
                id="nomeContato"
                value={nomeContato}
                onChange={(e) => setNomeContato(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              <InputField
                labelText="E-mail de Contato"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  text={loading ? "Salvando..." : "Salvar Alterações"}
                  variant="primary"
                  fullWidth={false}
                  disabled={loading}
                />
                <Button
                  type="button"
                  text="Cancelar"
                  variant="secondary"
                  fullWidth={false}
                  onClick={() => setEditando(false)}
                  disabled={loading}
                />
              </div>
            </form>
          </>
        )}

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              CNPJ
            </span>
            <span className="text-sm font-bold text-gray-900">
              {empresaData.cnpj || "-"}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Status da Conta
            </span>
            <span className="text-sm font-bold text-green-600 capitalize flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Parceiro Homologado
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
