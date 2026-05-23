import * as React from "react";
import type { SVGProps } from "react";
const SvgWorship = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <path fill="#1A7F6E" d="m2 14 2-7 2 7z" />
    <path fill="#25B49A" d="M3 14h2v12H3z" />
    <path fill="#1A7F6E" d="m26 14 2-7 2 7z" />
    <path fill="#25B49A" d="M27 14h2v12h-2z" />
    <path fill="#1A7F6E" d="M3 26h26v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path fill="#25B49A" d="M5 22a11 11 0 0 1 22 0v4H5z" />
    <path fill="#0F5048" d="M13 26v-4q0-2 3-5 3 3 3 5v4z" opacity={0.65} />
    <circle cx={9} cy={20} r={1.6} fill="#FFCA6B" />
    <circle cx={23} cy={20} r={1.6} fill="#FFCA6B" />
    <path
      fill="#FFCA6B"
      d="M16 3c.4 1.2 1.3 2.1 2.5 2.5-1.2.4-2.1 1.3-2.5 2.5-.4-1.2-1.3-2.1-2.5-2.5 1.2-.4 2.1-1.3 2.5-2.5"
    />
    <path
      fill="#fff"
      d="M16 11c.4 1 1 1.6 2 2-1 .4-1.6 1-2 2-.4-1-1-1.6-2-2 1-.4 1.6-1 2-2"
      opacity={0.4}
    />
    <path
      stroke="#0F5048"
      strokeLinecap="round"
      strokeWidth={1.4}
      d="M3 26h26"
      opacity={0.5}
    />
  </svg>
);
export default SvgWorship;
