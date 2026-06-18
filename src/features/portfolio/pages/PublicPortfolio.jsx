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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/alunos/publico/${username}`)
      .then(res => {
        if (!res.ok) throw new Error("Portfólio não encontrado");
        return res.json();
      })
      .then(apiData => {
        setData(apiData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Carregando portfólio...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <h1 className="text-3xl font-bold mb-2">Ops! 😕</h1>
        <p className="text-gray-500 mb-6">Não conseguimos encontrar o portfólio de <strong>{username}</strong>.</p>
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition">
          Voltar à Plataforma
        </Link>
      </div>
    );
  }

  const { usuario, perfil, projetos } = data;
  const themeColors = THEME_MAP[perfil.tema] || THEME_MAP["blue"];
  const skillsArray = perfil.habilidades ? perfil.habilidades.split(",").map(s => s.trim()).filter(s => s.length > 0) : [];

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
            {usuario.nome_usuario.substring(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight capitalize mb-2">
              {usuario.nome_usuario}
            </h1>
            <p className="text-slate-500 font-medium mb-6 leading-relaxed max-w-2xl">
              {perfil.bio || "Sem biografia cadastrada."}
            </p>

            {/* Links Sociais */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {perfil.linkedin && (
                <a href={perfil.linkedin.startsWith('http') ? perfil.linkedin : `https://${perfil.linkedin}`} target="_blank" rel="noreferrer" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md ${themeColors.bgLight} ${themeColors.text} hover:opacity-80`}>
                  LinkedIn
                </a>
              )}
              {perfil.github && (
                <a href={perfil.github.startsWith('http') ? perfil.github : `https://${perfil.github}`} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full text-sm font-semibold bg-slate-900 text-white transition-all shadow-sm hover:shadow-md hover:opacity-80">
                  GitHub
                </a>
              )}
              <a href={`mailto:${usuario.email}`} className="px-4 py-2 flex items-center gap-2 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 transition-all shadow-sm hover:shadow-md hover:bg-slate-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400">
                  <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm0 1.068L9.61 9.382a1 1 0 00.78 0L17 5.068V14a1 1 0 01-1 1H4a1 1 0 01-1-1V5.068z" />
                </svg>
                Enviar E-mail
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
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Projetos Recentes</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projetos && projetos.length > 0 ? (
                projetos.map((projeto) => (
                  <a href={projeto.link_projeto || "#"} target={projeto.link_projeto ? "_blank" : "_self"} rel="noreferrer" key={projeto.id} className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer block">
                    
                    {/* Imagem/Capa do Projeto */}
                    <div className={`w-full h-32 rounded-xl mb-4 ${themeColors.bg} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center relative overflow-hidden`}>
                      <span className="text-white/30 font-black text-4xl rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                        {projeto.disciplina ? projeto.disciplina.substring(0, 3).toUpperCase() : "PROJ"}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-bold text-slate-900 mb-1 group-hover:${themeColors.text} transition-colors line-clamp-1`}>
                        {projeto.titulo}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {projeto.disciplina || "Sem descrição"}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-auto">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${themeColors.bgLight} ${themeColors.text}`}>
                          {projeto.nome_equipe || "Equipe"}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-slate-100 text-slate-500">
                          {projeto.ano ? new Date(projeto.ano).getFullYear() : "-"}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full py-10 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
                  <p className="text-slate-400">Este aluno ainda não participou de nenhum projeto.</p>
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
