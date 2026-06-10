export default function Button({ type, children, onClick}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-[#0F4C8A] text-white font-bold py-2 px-4 rounded hover:bg-[#325d9c]"
    >
      {children}
    </button>
  );
}
