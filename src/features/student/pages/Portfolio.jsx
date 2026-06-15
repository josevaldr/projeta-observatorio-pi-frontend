import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";

// Dados simulados baseados nos projetos do aluno
const MEUS_PROJETOS_MOCK = [
  {
    id: 1,
    titulo: "Sensor IoT para hortas urbanas",
    disciplina: "PI III",
    ano: "2026.1",
    publicado: true,
  },
  {
    id: 2,
    titulo: "App de troca de livros",
    disciplina: "DSW",
    ano: "2025.2",
    publicado: false,
  },
  {
    id: 3,
    titulo: "Dashboard de evasão",
    disciplina: "Ciência de Dados",
    ano: "2025.2",
    publicado: true,
  },
  {
    id: 4,
    titulo: "Estudo de caso — banco digital",
    disciplina: "UX Research",
    ano: "2025.1",
    publicado: false,
  }
];

const TEMAS = [
  { id: "blue", nome: "Azul Profissional", cor: "bg-blue-600" },
  { id: "amber", nome: "Âmbar Criativo", cor: "bg-amber-500" },
  { id: "emerald", nome: "Esmeralda Tech", cor: "bg-emerald-600" },
  { id: "violet", nome: "Violeta Moderno", cor: "bg-violet-600" },
  { id: "slate", nome: "Cinza Minimalista", cor: "bg-slate-800" },
];

export default function Portfolio() {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.nome_usuario ? user.nome_usuario.toLowerCase().replace(/\s+/g, '-') : "mariasilva";

  const [bio, setBio] = useState("Desenvolvedor apaixonado por tecnologia e inovação, buscando criar soluções que impactam a sociedade.");
  const [habilidades, setHabilidades] = useState("React, Node.js, UI/UX, Python");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/mariasilva");
  const [github, setGithub] = useState("https://github.com/mariasilva");
  
  const [temaSelecionado, setTemaSelecionado] = useState("blue");
  const [projetos, setProjetos] = useState(MEUS_PROJETOS_MOCK);

  const toggleProjeto = (id) => {
    setProjetos(projetos.map(p => 
      p.id === id ? { ...p, publicado: !p.publicado } : p
    ));
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    // Simular o salvamento num estado global ou backend
    // Como é frontend-only no momento, os dados vivem no state do componente.
    // O ideal seria usar Redux ou Context, mas para o mock vamos passar os dados via LocalStorage ou State if needed.
    // Vamos salvar no localStorage para que a página pública possa ler!
    const portfolioData = { bio, habilidades, linkedin, github, tema: temaSelecionado, projetos };
    localStorage.setItem(`portfolio_${username}`, JSON.stringify(portfolioData));
    alert("Portfólio atualizado com sucesso!");
  };

  const handleVisualizar = () => {
    // Garante que os dados mais recentes estejam no storage antes de visualizar
    const portfolioData = { bio, habilidades, linkedin, github, tema: temaSelecionado, projetos };
    localStorage.setItem(`portfolio_${username}`, JSON.stringify(portfolioData));
    navigate(`/portfolio/${username}`);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {/* CABEÇALHO */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Personalizar Portfólio</h1>
          <p className="text-sm text-gray-500">Configure como o mundo vê seus projetos e habilidades.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="secondary" 
            fullWidth={false}
            onClick={handleVisualizar}
            className="flex items-center gap-2"
          >
            <span>👁️</span> Visualizar
          </Button>
          <Button 
            type="button" 
            variant="primary" 
            fullWidth={false}
            onClick={handleSalvar}
          >
            Salvar Alterações
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA (Formulário) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Seção 1: Informações Pessoais */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👤</span> Informações Básicas
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Biografia
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Escreva um breve resumo sobre você e seus objetivos..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-blue-600 text-sm h-24 resize-none"
                />
              </div>

              <InputField
                labelText="Habilidades (separadas por vírgula)"
                type="text"
                id="habilidades"
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}
                placeholder="Ex: JavaScript, Figma, Gestão de Projetos"
                labelClassName="!text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  labelText="Perfil do LinkedIn"
                  type="url"
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  labelClassName="!text-sm"
                />
                <InputField
                  labelText="Perfil do GitHub"
                  type="url"
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  labelClassName="!text-sm"
                />
              </div>
            </div>
          </section>

          {/* Seção 2: Aparência */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎨</span> Aparência
            </h2>
            <p className="text-sm text-gray-500 mb-4">Escolha a cor principal que será usada no seu portfólio.</p>
            
            <div className="flex flex-wrap gap-4">
              {TEMAS.map((tema) => (
                <button
                  key={tema.id}
                  onClick={() => setTemaSelecionado(tema.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    temaSelecionado === tema.id ? "border-blue-500 bg-blue-50/50" : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full shadow-sm ${tema.cor}`}></div>
                  <span className="text-xs font-medium text-gray-700">{tema.nome}</span>
                </button>
              ))}
            </div>
          </section>

        </div>

        {/* COLUNA DIREITA (Projetos) */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span>📂</span> Projetos em Destaque
            </h2>
            <p className="text-sm text-gray-500 mb-6">Selecione quais projetos devem aparecer publicamente.</p>
            
            <div className="space-y-3">
              {projetos.map((projeto) => (
                <div 
                  key={projeto.id}
                  className={`p-4 rounded-xl border transition-colors flex items-center justify-between cursor-pointer ${
                    projeto.publicado ? "border-blue-200 bg-blue-50/30" : "border-gray-100 bg-gray-50/50 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleProjeto(projeto.id)}
                >
                  <div>
                    <h3 className={`font-bold text-sm ${projeto.publicado ? "text-gray-900" : "text-gray-600"}`}>
                      {projeto.titulo}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{projeto.disciplina} • {projeto.ano}</p>
                  </div>
                  
                  {/* Toggle Switch Simples */}
                  <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${
                    projeto.publicado ? "bg-blue-600" : "bg-gray-300"
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
                      projeto.publicado ? "translate-x-4" : "translate-x-0"
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
