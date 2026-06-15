import React from "react";

export default function Button({ 
  type = "submit", 
  loading = false, 
  loadingText = "Carregando...", 
  text, 
  variant = "primary",
  fullWidth = true,
  className = "",
  children,
  ...props 
}) {
  const baseClasses = "font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer flex justify-center items-center text-sm";
  const widthClass = fullWidth ? "w-full" : "";
  
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "bg-[#0F4C8A] hover:bg-[#0D3E70] text-white";
  } else if (variant === "secondary") {
    variantClasses = "border border-gray-200 hover:bg-gray-50 text-gray-600";
  } else if (variant === "danger") {
    variantClasses = "border border-red-100 hover:bg-red-50 text-red-600";
  }

  const stateClasses = loading ? "bg-gray-400 cursor-not-allowed opacity-70 hover:bg-gray-400" : "";

  return (
    <button
      type={type}
      disabled={loading}
      className={`${baseClasses} ${widthClass} ${variantClasses} ${stateClasses} ${className}`}
      {...props}
    >
      {loading ? loadingText : (children || text)}
    </button>
  );
}