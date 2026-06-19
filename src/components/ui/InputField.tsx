import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function InputField({
  label,
  error,
  id,
  className = "",
  ...props
}: InputFieldProps) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={inputId}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
          "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "",
        ].join(" ")}
        {...props}
      />

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}