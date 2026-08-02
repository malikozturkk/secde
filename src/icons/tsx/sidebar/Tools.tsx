import * as React from "react";
import type { SVGProps } from "react";
const SvgTools = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <g fill="#4E6470" transform="rotate(-45 19.018 17.25)">
      <rect width={4} height={15} x={14} y={11} rx={2} />
      <path d="M16 4.5a5 5 0 0 0-3.4 8.7h6.8A5 5 0 0 0 16 4.5m0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4" />
    </g>
    <g transform="rotate(45 12.982 17.25)">
      <rect width={3.6} height={10} x={14.2} y={16} fill="#B07510" rx={1.4} />
      <path fill="#4E6470" d="M14.8 7h2.4v10h-2.4z" />
      <path fill="#4E6470" d="M14.8 4.5h2.4v3h-2.4z" />
    </g>
    <g fill="#8FA6B4" transform="rotate(-45 16 16)">
      <rect width={4} height={15} x={14} y={11} rx={2} />
      <path d="M16 4.5a5 5 0 0 0-3.4 8.7h6.8A5 5 0 0 0 16 4.5m0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4" />
    </g>
    <g transform="rotate(45 16 16)">
      <rect width={3.6} height={10} x={14.2} y={16} fill="#F5A623" rx={1.4} />
      <rect width={1.6} height={10} x={14.2} y={16} fill="#FFCA6B" rx={0.8} />
      <path fill="#C3D3DC" d="M14.8 7h2.4v10h-2.4z" />
      <path fill="#8FA6B4" d="M14.8 4.5h2.4v3h-2.4z" />
    </g>
  </svg>
);
export default SvgTools;
