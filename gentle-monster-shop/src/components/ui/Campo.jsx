export default function Campo({ label, error, hint, children, htmlFor }) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-xs uppercase tracking-wider text-ink-soft mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-soft/70">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClases = (tieneError) =>
  `w-full bg-paper-soft border rounded-lg px-4 py-2.5 text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-accent ${
    tieneError ? 'border-danger' : 'border-line'
  }`
