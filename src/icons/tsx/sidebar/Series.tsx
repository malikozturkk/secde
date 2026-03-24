import * as React from "react";
import type { SVGProps } from "react";
const SvgSeries = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#FF6B35"
      d="M16 3s-8 8-8 15c0 4.4 3.6 8 8 8s8-3.6 8-8c0-7-8-15-8-15"
    />
    <path
      fill="#FFAB00"
      d="M16 9s-4.5 5.5-4.5 9.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-4-4.5-9.5-4.5-9.5"
    />
    <path
      fill="#FFD54F"
      d="M16 14s-2.5 3-2.5 5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-2-2.5-5-2.5-5"
    />
    <circle cx={11} cy={8} r={1.2} fill="#FF9A6C" opacity={0.7} />
    <circle cx={21} cy={7} r={0.9} fill="#FF9A6C" opacity={0.5} />
  </svg>
);
export default SvgSeries;
