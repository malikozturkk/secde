import * as React from "react";
import type { SVGProps } from "react";
const SvgQibla = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={16} r={13} fill="#0F5048" />
    <circle cx={16} cy={16} r={11} fill="#1A7F6E" />
    <circle cx={16} cy={16} r={11} stroke="#25B49A" strokeWidth={1.5} />
    <path fill="#FFCA6B" d="m21.5 10.5-3.3 7.7-7.7 3.3 3.3-7.7z" />
    <path fill="#F5A623" d="m21.5 10.5-3.3 7.7L16 16z" />
    <circle cx={16} cy={16} r={1.8} fill="#0F5048" />
    <rect width={1.6} height={3.4} x={15.2} y={2.5} fill="#25B49A" rx={0.8} />
    <rect width={1.6} height={3.4} x={15.2} y={26.1} fill="#1A7F6E" rx={0.8} />
    <rect width={3.4} height={1.6} x={26.1} y={15.2} fill="#1A7F6E" rx={0.8} />
    <rect width={3.4} height={1.6} x={2.5} y={15.2} fill="#1A7F6E" rx={0.8} />
  </svg>
);
export default SvgQibla;
