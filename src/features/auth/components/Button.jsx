export default function Button({ type, children, onClick}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
