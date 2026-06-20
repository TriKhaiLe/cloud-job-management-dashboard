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
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="flex flex-col">
        <input
          id={inputId}
          className={[
            "w-60 rounded-lg border px-3 py-2 text-sm transition outline-none",
            "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "",
          ].join(" ")}
          {...props}
        />
        <div>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
