import * as React from "react";
import type { SVGProps } from "react";
const SvgLeaderboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path fill="#F5A623" d="M10 6h12v9c0 3.9-2.7 7-6 7s-6-3.1-6-7z" />
    <path stroke="#FFD54F" d="M12 8h2v6c0 1.5.8 2.8 2 3.5" opacity={0.6} />
    <path
      fill="#F5A623"
      stroke="#C47D0A"
      d="M10 8H7.5C6.7 8 6 8.7 6 9.5V11c0 1.7 1.3 3 3 3h1M22 8h2.5c.8 0 1.5.7 1.5 1.5V11c0 1.7-1.3 3-3 3h-1"
    />
    <rect width={4} height={3} x={14} y={22} fill="#C47D0A" rx={1} />
    <rect width={10} height={2.5} x={11} y={25} fill="#C47D0A" rx={1.2} />
    <path
      fill="#FFF176"
      d="m16 10 1 2.5 2.5.3-1.7 1.6.4 2.6-2.2-1.2-2.2 1.2.4-2.6-1.7-1.6 2.5-.3z"
    />
  </svg>
);
export default SvgLeaderboard;
