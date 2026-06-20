import React from "react";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  placeholder?: string;
};

export function SelectField({
  label,
  error,
  id,
  className = "",
  children,
  placeholder,
  ...props
}: SelectFieldProps) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  return (
    <div className={className}>
      <label
        htmlFor={selectId}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="flex flex-col">
        <select
          id={selectId}
          className={[
            "w-60 rounded-lg border bg-white px-3 py-2 text-sm transition outline-none",
            "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "",
          ].join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <div>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
