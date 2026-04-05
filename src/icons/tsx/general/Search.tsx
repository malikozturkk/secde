import * as React from "react";
import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 52 52"
    {...props}
  >
    <g clipPath="url(#search_svg__a)">
      <rect
        width={8}
        height={20}
        x={12}
        y={22}
        fill="#8B4513"
        rx={2}
        transform="rotate(45 12 32)"
      />
      <rect
        width={3}
        height={14}
        x={14.5}
        y={22.5}
        fill="#CD7900"
        rx={1}
        transform="rotate(45 14.5 34.5)"
      />
      <circle cx={32} cy={20} r={12} stroke="#4A90E2" strokeWidth={4} />
      <circle cx={32} cy={20} r={10} fill="#DDF4FF" />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M28 14c-2 2-3 5-3 7"
        opacity={0.6}
      />
      <circle cx={36} cy={16} r={2} fill="#fff" opacity={0.8} />
    </g>
    <defs>
      <clipPath id="search_svg__a">
        <path fill="#fff" d="M0 0h52v52H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSearch;
