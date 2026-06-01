import * as React from "react";
import type { SVGProps } from "react";
const SvgSnowflake = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth={2.4}
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20m-2.93-7.07L4.93 19.07" />
  </svg>
);
export default SvgSnowflake;
