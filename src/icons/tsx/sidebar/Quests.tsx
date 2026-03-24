import * as React from "react";
import type { SVGProps } from "react";
const SvgQuests = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#EF5350"
      d="M16 3 6 8v7c0 6 4.2 11.4 10 13 5.8-1.6 10-7 10-13V8z"
    />
    <path fill="#EF9A9A" d="M16 3 6 8v7s0-3 4-6l6-3z" opacity={0.4} />
    <path fill="#FFD54F" d="m17 8-5 9h3.5l-1 7L20 14h-3.5z" />
    <path stroke="#FFF176" d="m17 8-5 9h3.5l-1 7L20 14h-3.5z" opacity={0.5} />
  </svg>
);
export default SvgQuests;
