export default function InputField({
  labelText,
  type,
  value,
  onChange,
  placeholder,
  id,
  required,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
