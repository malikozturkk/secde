import * as React from "react";
import type { SVGProps } from "react";
const SvgMosque = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={160}
    height={140}
    fill="none"
    {...props}
  >
    <g filter="url(#mosque_svg__a)">
      <path
        fill="currentColor"
        d="M54.75 55.25q-2.626 0-3.687-1.062Q50 53.125 50 50.5q0-5 2.375-9.25a20.54 20.54 0 0 1 6.375-7L80 20l21.25 14.25a20.54 20.54 0 0 1 6.375 7Q110 45.5 110 50.5q0 2.626-1.062 3.688t-3.688 1.062zM25 120V58.625a11 11 0 0 1-3.625-3.562Q20 52.875 20 50t3-7 7-8q4 3.875 7 8t3 7-1.375 5.063A11 11 0 0 1 35 58.625V80h10V70q0-3.124 2-6t5.75-3.75h54.5Q111 61.124 113 64t2 6v10h10V58.625a11 11 0 0 1-3.625-3.562Q120 52.875 120 50t3-7 7-8q4 3.875 7 8t3 7-1.375 5.063A11 11 0 0 1 135 58.625V120H90v-20q0-4.125-2.937-7.062Q84.125 90 80 90t-7.062 2.938T70 100v20z"
      />
    </g>
    <defs>
      <filter
        id="mosque_svg__a"
        width={160}
        height={140}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={10} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.203922 0 0 0 0 0.301961 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_115" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1_115"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgMosque;
