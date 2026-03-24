import * as React from "react";
import type { SVGProps } from "react";
const SvgShop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path fill="#9C27B0" d="M7 12h18l-2 15H9z" />
    <rect width={20} height={4} x={6} y={10} fill="#AB47BC" rx={2} />
    <path stroke="#7B1FA2" d="M12 10V7.5C12 5.6 13.8 4 16 4s4 1.6 4 3.5V10" />
    <path
      fill="#FFD54F"
      d="m16 16 1.4 2.8 3.1.5-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.5z"
    />
    <path stroke="#CE93D8" d="m10 14 .5 8" opacity={0.4} />
  </svg>
);
export default SvgShop;
