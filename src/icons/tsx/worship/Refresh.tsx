import * as React from "react";
import type { SVGProps } from "react";
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2.5}
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5M3 21v-5h5" />
  </svg>
);
export default SvgRefresh;
