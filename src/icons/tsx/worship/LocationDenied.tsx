import * as React from "react";
import type { SVGProps } from "react";
const SvgLocationDenied = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0M9 13l6-6M9 7l6 6" />
  </svg>
);
export default SvgLocationDenied;
