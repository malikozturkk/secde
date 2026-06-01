import * as React from "react";
import type { SVGProps } from "react";
const SvgAsr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={17} r={6} fill="currentColor" />
    <circle cx={16} cy={17} r={6} fill="#fff" opacity={0.16} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      d="M16 6v3m0 17v2M6 17h3m14 0h3M9 10l2 2m12-2-2 2M9 24l2-2m12 2-2-2"
    />
  </svg>
);
export default SvgAsr;
