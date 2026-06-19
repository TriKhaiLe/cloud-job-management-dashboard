import React from "react";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

export function SelectField({
  label,
  error,
  id,
  className = "",
  children,
  ...props
}: SelectFieldProps) {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;

  return (
    <div className={className}>
      <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        id={selectId}
        className={[
          "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition",
          "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "",
        ].join(" ")}
        {...props}
      >
        {children}
      </select>

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}