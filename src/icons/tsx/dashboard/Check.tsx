import * as React from "react";
import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3.5}
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export default SvgCheck;
