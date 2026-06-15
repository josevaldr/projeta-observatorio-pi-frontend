import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Mapping themes to Tailwind colors
const THEME_MAP = {
  blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-600", gradient: "from-blue-600 to-blue-400", bgLight: "bg-blue-50" },
  amber: { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500", gradient: "from-amber-500 to-amber-300", bgLight: "bg-amber-50" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-600", gradient: "from-emerald-600 to-emerald-400", bgLight: "bg-emerald-50" },
  violet: { bg: "bg-violet-600", text: "text-violet-600", border: "border-violet-600", gradient: "from-violet-600 to-violet-400", bgLight: "bg-violet-50" },
  slate: { bg: "bg-slate-800", text: "text-slate-800", border: "border-slate-800", gradient: "from-slate-800 to-slate-600", bgLight: "bg-slate-50" },
};

export default function PublicPortfolio() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Busca dados simulados do localStorage
    const saved = localStorage.getItem(`portfolio_${username}`);
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      // Mock de fallback se o usuário visitar sem ter salvo antes
      setData({
        bio: "Estudante e desenvolvedor em evolução. Apaixonado por transformar ideias complexas em interfaces simples e intuitivas.",
        habilidades: "React, Design de Interfaces, Gestão de Projetos, Python",
        linkedin: "#",
        github: "#",
        tema: "blue",
        projetos: [
          {
            id: 1,
            titulo: "Sensor IoT para hortas urbanas",
            disciplina: "PI III",
            ano: "2026.1",
            publicado: true,
          }
        ]
      });
    }
  }, [username]);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Carregando...</div>;

  const themeColors = THEME_MAP[data.tema] || THEME_MAP["blue"];
  const publicProjects = data.projetos.filter(p => p.publicado);
  const skillsArray = data.habilidades.split(",").map(s => s.trim()).filter(s => s.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-black selection:text-white pb-20">
      
      {/* Header com Gradiente */}
      <header className={`w-full h-64 bg-gradient-to-r ${themeColors.gradient} relative overflow-hidden shadow-sm`}>
        {/* Micro-padrões decorativos */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        
        {/* Navbar Simples */}
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <Link to="/login" className="text-white/80 hover:text-white font-medium text-sm transition-colors flex items-center gap-2">
            &larr; Voltar à plataforma
          </Link>
        </nav>
      </header>

      {/* Conteúdo Principal (Overlap com o Header) */}
      <main className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        
        {/* Cartão de Perfil */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 transform transition-transform hover:-translate-y-1 duration-300">
          
          {/* Avatar Generativo/Simples */}
          <div className={`w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-4xl font-black text-white shrink-0 ${themeColors.bg}`}>
            {username.substring(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight capitalize mb-2">
              {username.replace("-", " ")}
            </h1>
            <p className="text-slate-500 font-medium mb-6 leading-relaxed max-w-2xl">
              {data.bio}
            </p>

            {/* Links Sociais */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noreferrer" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md ${themeColors.bgLight} ${themeColors.text} hover:opacity-80`}>
                  LinkedIn
                </a>
              )}
              {data.github && (
                <a href={data.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full text-sm font-semibold bg-slate-900 text-white transition-all shadow-sm hover:shadow-md hover:opacity-80">
                  GitHub
                </a>
              )}
              <a href={`mailto:${username}@example.com`} className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 transition-all shadow-sm hover:shadow-md hover:bg-slate-50">
                Contato
              </a>
            </div>
          </div>
        </div>

        {/* Seção Habilidades e Projetos */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Coluna Lateral */}
          <div className="space-y-10">
            <section>
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {skillsArray.length > 0 ? skillsArray.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">
                    {skill}
                  </span>
                )) : (
                  <span className="text-slate-400 text-sm">Nenhuma habilidade informada.</span>
                )}
              </div>
            </section>
          </div>

          {/* Coluna Principal */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Projetos em Destaque</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {publicProjects.length > 0 ? (
                publicProjects.map((projeto) => (
                  <div key={projeto.id} className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer">
                    
                    {/* Imagem/Capa do Projeto */}
                    <div className={`w-full h-32 rounded-xl mb-4 ${themeColors.bg} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center relative overflow-hidden`}>
                      <span className="text-white/30 font-black text-4xl rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                        {projeto.disciplina.substring(0, 3).toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-bold text-slate-900 mb-1 group-hover:${themeColors.text} transition-colors`}>
                        {projeto.titulo}
                      </h3>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${themeColors.bgLight} ${themeColors.text}`}>
                          {projeto.disciplina}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-slate-100 text-slate-500">
                          {projeto.ano}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
                  <p className="text-slate-400">Nenhum projeto selecionado para o portfólio.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>

      </main>

      {/* Footer Simples */}
      <footer className="mt-24 py-8 text-center text-slate-400 text-sm">
        Criado com <span className="font-bold text-slate-500">PROjeta</span>
      </footer>

    </div>
  );
}
