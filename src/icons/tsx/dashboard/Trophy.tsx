import * as React from "react";
import type { SVGProps } from "react";
const SvgTrophy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M7 2h10l-1 5h3l-7 15L5 7h3z" />
  </svg>
);
export default SvgTrophy;
