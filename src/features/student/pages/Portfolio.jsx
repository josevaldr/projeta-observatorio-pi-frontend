import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";
import { usePortfolioForm, TEMAS } from "../hooks/usePortfolioForm";

export default function Portfolio() {
  const {
    bio, setBio,
    habilidades, setHabilidades,
    linkedin, setLinkedin,
    github, setGithub,
    temaSelecionado, setTemaSelecionado,
    loading,
    handleSalvar,
    handleVisualizar
  } = usePortfolioForm();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-8 text-gray-800">
      
      {/* CABEÇALHO */}
      <header className="flex justify-between items-start mb-8 max-w-4xl mx-auto">
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
            loading={loading}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
          
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
    </div>
  );
}
