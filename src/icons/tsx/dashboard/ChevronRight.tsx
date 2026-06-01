import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3}
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
export default SvgChevronRight;
