import * as React from "react";
import type { SVGProps } from "react";
const SvgMaghrib = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path fill="currentColor" d="M5 22a11 11 0 0 1 22 0Z" />
    <path fill="#fff" d="M9 22a7 7 0 0 1 14 0Z" opacity={0.18} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      d="M3 26h26M16 6v3m-8 1 2 2m14-2-2 2"
    />
  </svg>
);
export default SvgMaghrib;
