import * as React from "react";
import type { SVGProps } from "react";
const SvgZakat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <rect width={1.8} height={20} x={15.1} y={6} fill="#7A5A0D" rx={0.9} />
    <rect width={18} height={2.6} x={7} y={25} fill="#7A5A0D" rx={1.3} />
    <rect width={20} height={1.8} x={6} y={8.6} fill="#F5A623" rx={0.9} />
    <circle cx={16} cy={6} r={2.2} fill="#FFCA6B" />
    <path fill="#F5A623" d="m6.5 10.4-3.7 6.8h7.4z" />
    <path fill="#FFCA6B" d="m25.5 10.4-3.7 6.8h7.4z" opacity={0.9} />
    <circle cx={16} cy={16.5} r={4.4} fill="#FFCA6B" />
    <circle cx={16} cy={16.5} r={3} fill="#F5A623" />
    <path fill="#7A5A0D" d="M15.3 14.3h1.4v4.4h-1.4z" />
    <path fill="#7A5A0D" d="M14.1 15.8h4.4v1.3h-4.4z" />
  </svg>
);
export default SvgZakat;
