import * as React from "react";
import type { SVGProps } from "react";
const SvgKaaba = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#0B1416"
      d="m5.5 9.5 10.5-4 10.5 4v17a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1z"
    />
    <path fill="#16242A" d="m16 5.5-10.5 4v17a1 1 0 0 0 1 1H16z" />
    <path fill="#1E2F35" d="m16 5.5-10.5 4h21z" />
    <path fill="#F5A623" d="M5.5 13h21v2.8h-21z" />
    <path fill="#FFCA6B" d="M5.5 13H16v2.8H5.5z" />
    <rect width={5.6} height={8.5} x={13.2} y={19} fill="#F5A623" rx={0.5} />
    <rect width={3.2} height={7.1} x={14.4} y={20.4} fill="#FFCA6B" rx={0.4} />
    <circle cx={25} cy={18.5} r={1.1} fill="#FFCA6B" opacity={0.8} />
  </svg>
);
export default SvgKaaba;
