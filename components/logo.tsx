export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" aria-hidden="true" className="shrink-0">
      <rect width="96" height="96" rx="24" fill="#0f172a" />
      <path
        d="M62 28H34v40h28M34 48h20"
        fill="none"
        stroke="#a5b4fc"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="70" cy="68" r="6" fill="#34d399" />
    </svg>
  );
}
