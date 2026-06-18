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
  const [curso, setCurso] = useState("");

  const tipoUsuario = user.tipo_usuario || "coordenação";

  useEffect(() => {
    fetchCoordenadorData();
  }, []);

  const fetchCoordenadorData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/coordenadores/");
      if (res.ok) {
        const data = await res.json();
        const listaCoords = Array.isArray(data) ? data : (data.value || []);
        // Find by ID or email
        const myCoord = listaCoords.find(c => c.id_coordenador === userId || c.email === user.email);
        if (myCoord && myCoord.curso) {
          setCurso(myCoord.curso);
        }
      }
    } catch (err) {
      console.error("Erro ao buscar curso do coordenador", err);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Update basic user data
      const payloadUser = {
        nome_usuario: nome,
        email: email,
        senha: "not_updated",
        tipo_usuario: tipoUsuario
      };

      const responseUser = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadUser)
      });

      // 2. Update coord specific data (curso)
      let coordSuccess = true;
      if (curso) {
        const payloadCoord = {
          id_coordenador: userId,
          curso: curso
        };
        const resCoord = await fetch(`http://127.0.0.1:8000/coordenadores/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadCoord)
        });
        if (!resCoord.ok) {
           coordSuccess = false;
        }
      }

      if (responseUser.ok && coordSuccess) {
        const updatedUser = { ...user, nome_usuario: nome, nome: nome, email: email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditando(false);
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Perfil atualizado parcialmente ou com erro.");
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
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
                  {tipoUsuario}
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
                Editar Perfil
              </Button>
            </header>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shrink-0">
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
              {curso && (
                <div className="mt-2 border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
                    Curso Vinculado
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {curso}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                Editar Perfil
              </h1>
              <p className="text-xs text-gray-400">
                Atualize as informações do seu acesso
              </p>
            </header>

            <form
              onSubmit={handleSalvar}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs max-w-2xl mb-8 space-y-4"
            >
              <InputField
                labelText="Nome Completo"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              <InputField
                labelText="E-mail de Acesso"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                labelClassName="!text-xs !font-semibold !text-gray-400 !uppercase !tracking-wider !mb-2"
              />

              <InputField
                labelText="Curso Vinculado"
                type="text"
                id="curso"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                required={true}
                placeholder="Ex: TADS"
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
