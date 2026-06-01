import * as React from "react";
import type { SVGProps } from "react";
const SvgSunrise = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={18} r={6} fill="currentColor" />
    <circle cx={16} cy={18} r={6} fill="#fff" opacity={0.18} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.4}
      d="M5 27h22M8 23l-2 2m18-2 2 2M16 9V5m-8 7-2-2m18 2 2-2"
    />
  </svg>
);
export default SvgSunrise;
