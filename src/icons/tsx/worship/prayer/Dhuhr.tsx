import * as React from "react";
import type { SVGProps } from "react";
const SvgDhuhr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={16} r={6.5} fill="currentColor" />
    <circle cx={16} cy={16} r={6.5} fill="#fff" opacity={0.18} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.6}
      d="M16 4v3m0 18v3M4 16h3m18 0h3M7.5 7.5l2 2m13-2-2 2m-13 15 2-2m13 2-2-2"
    />
  </svg>
);
export default SvgDhuhr;
