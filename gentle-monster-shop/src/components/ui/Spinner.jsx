export default function Spinner({ size = 16 }) {
  return (
    <span
      className="inline-block rounded-full border-2 border-paper/30 border-t-paper animate-spin"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}
