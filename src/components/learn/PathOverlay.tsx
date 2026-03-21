export function PathOverlay() {
  const d =
    "M 400 100 Q 200 300 350 500 T 550 900 T 300 1300 T 500 1700 T 400 2100";

  return (
    <svg
      className="path-svg"
      viewBox="0 0 800 2400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={d}
        stroke="rgba(62,187,255,0.15)"
        strokeWidth={12}
        fill="none"
        strokeLinecap="round"
        style={{ filter: "blur(8px)" }}
      />
      <path
        d={d}
        stroke="rgba(62,187,255,0.1)"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="12 16"
      />
    </svg>
  );
}
