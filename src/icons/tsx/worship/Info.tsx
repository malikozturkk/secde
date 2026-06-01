import * as React from "react";
import type { SVGProps } from "react";
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={12} cy={12} r={9} />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
export default SvgInfo;
