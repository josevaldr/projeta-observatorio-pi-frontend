import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCompanyProfile() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const userId = user.id_usuario || user.id || 0;

  const [nomeContato, setNomeContato] = useState(user.nome_usuario || user.nome || "");
  const [email, setEmail] = useState(user.email || "");

  // dados da empresa da API
  const [empresaData, setEmpresaData] = useState({
    cnpj: "",
  });

  useEffect(() => {
    fetchEmpresaData();
  }, [userId]);

  const fetchEmpresaData = async () => {
    try {
      const resEmpresas = await fetch("http://127.0.0.1:8000/empresas/");
      if (resEmpresas.ok) {
         const list = await resEmpresas.json();
         const empresas = Array.isArray(list) ? list : (list.empresas || list.value || []);
         // encontra a empresa pelo usuario logado (ou a primeira, caso id nao bata para debug)
         const myEmpresa = empresas.find(e => e.id_empresa === userId || e.id_usuario === userId) || empresas[0];
         if (myEmpresa) {
            setEmpresaData({
               cnpj: myEmpresa.cnpj || "Não informado",
            });
         }
      }
    } catch (e) {
       console.error("Erro ao carregar dados da empresa", e);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nome_usuario: nomeContato,
        email: email,
        senha: "not_updated",
        tipo_usuario: user.tipo_usuario || "empresa"
      };

      const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedUser = { ...user, nome_usuario: nomeContato, nome: nomeContato, email: email };
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

  const handleSair = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return {
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
  };
}
