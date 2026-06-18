import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";

export default function Profile() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  
  const userId = user.id_usuario || user.id || 0;

  const [nome, setNome] = useState(user.nome_usuario || user.nome || "");
  const [email, setEmail] = useState(user.email || "");

  // dados do professor que vêm da API
  const [profData, setProfData] = useState({
    especialidade: "",
  });

  useEffect(() => {
    fetchProfessorData();
  }, [userId]);

  const fetchProfessorData = async () => {
    try {
      const resProfs = await fetch("http://127.0.0.1:8000/professores/");
      if (resProfs.ok) {
         const profsList = await resProfs.json();
         const profs = Array.isArray(profsList) ? profsList : (profsList.value || []);
         const myProf = profs.find(p => p.id_professor === userId || p.id_usuario === userId) || profs[0];
         if (myProf) {
            setProfData({
               especialidade: myProf.especialidade || "Não informada",
            });
         }
      }
    } catch (e) {
       console.error("Erro ao carregar dados do professor", e);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nome_usuario: nome,
        email: email,
        senha: "not_updated", // dummy para passar na validação do backend
        tipo_usuario: user.tipo_usuario || "professor"
      };

      const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedUser = { ...user, nome_usuario: nome, nome: nome, email: email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditando(false);
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar o perfil. Verifique os dados.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // handler de logout (sair)
  const handleSair = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
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
                  {user.tipo_usuario || "professor"}
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
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2)}
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

        {/* 3. DETALHES ADICIONAIS */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Área de Atuação
            </span>
            <span className="text-sm font-bold text-gray-900">
              {profData.especialidade || "-"}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
              Tipo de Conta
            </span>
            <span className="text-sm font-bold text-gray-900 capitalize">
              {user.tipo_usuario || "professor focal"}
            </span>
          </div>
        </div>

        {/* 4. BOTÃO SAIR */}
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
