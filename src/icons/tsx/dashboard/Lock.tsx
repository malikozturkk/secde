import * as React from "react";
import type { SVGProps } from "react";
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
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
    <rect width={16} height={10} x={4} y={11} rx={2} />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
export default SvgLock;
