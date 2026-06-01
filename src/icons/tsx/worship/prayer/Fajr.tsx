import * as React from "react";
import type { SVGProps } from "react";
const SvgFajr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 4c4 4.8 8 9.2 8 14a8 8 0 0 1-16 0c0-4.8 4-9.2 8-14"
      opacity={0.95}
    />
    <path
      fill="#fff"
      d="M16 9c2 2.4 4.5 5.4 4.5 8.5a4.5 4.5 0 1 1-9 0c0-3.1 2.5-6.1 4.5-8.5"
      opacity={0.35}
    />
    <circle cx={13} cy={20} r={1.2} fill="#fff" opacity={0.6} />
  </svg>
);
export default SvgFajr;
