import React from "react";

const InputField = ({
  type,
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full p-2 border rounded-lg bg-gray-50 
        sm:text-xs focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
          error
            ? "text-red-700 border-red-700"
            : "text-gray-900 border-gray-500"
        }`}
      />
      <span className="text-red-700 -mt-1 text-xs">{error}</span>
    </div>
  );
};

export default InputField;
