import * as React from "react";
import type { SVGProps } from "react";
const SvgStats = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 32 32"
    {...props}
  >
    <rect width={6} height={9} x={5} y={19} fill="#4FC3F7" rx={2} />
    <rect width={6} height={15} x={13} y={13} fill="#29B6F6" rx={2} />
    <rect width={6} height={22} x={21} y={6} fill="#0288D1" rx={2} />
    <path stroke="#4FC3F7" d="m24 4 2.5 3M24 4l-2.5 3M24 4v5" />
    <rect
      width={2}
      height={3}
      x={7}
      y={21}
      fill="#81D4FA"
      opacity={0.5}
      rx={1}
    />
    <rect
      width={2}
      height={3}
      x={15}
      y={15}
      fill="#81D4FA"
      opacity={0.5}
      rx={1}
    />
    <rect
      width={2}
      height={3}
      x={23}
      y={8}
      fill="#4FC3F7"
      opacity={0.5}
      rx={1}
    />
  </svg>
);
export default SvgStats;
