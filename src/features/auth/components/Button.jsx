import React from "react";

export default function Button({ 
  type = "submit", 
  loading = false, 
  loadingText = "Carregando...", 
  text, 
  ...props 
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full text-white font-bold py-2 px-4 rounded transition ${
        loading 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-[#0F4C8A] hover:bg-[#0D3E70]"
      }`}
      {...props} // Permite passar onClick ou outras propriedades nativas se necessário
    >
      {loading ? loadingText : text}
    </button>
  );
}