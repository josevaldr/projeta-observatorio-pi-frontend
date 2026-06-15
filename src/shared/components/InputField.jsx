export default function InputField({
  labelText,
  type,
  value,
  onChange,
  placeholder,
  id,
  required,
  className = "",
  labelClassName = "",
}) {
  return (
    <div>
      <label htmlFor={id} className={`block text-gray-700 font-medium mb-2 ${labelClassName}`}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-blue-600 text-sm ${className}`}
      />
    </div>
  );
}
