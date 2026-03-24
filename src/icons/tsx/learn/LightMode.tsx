import * as React from "react";
import type { SVGProps } from "react";
const SvgLightMode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 106 106"
    {...props}
  >
    <g filter="url(#light_mode_svg__a)">
      <path
        fill="currentColor"
        d="M53 68q-6.225 0-10.612-4.388Q38 59.226 38 53t4.388-10.612T53 38t10.612 4.388Q68 46.775 68 53t-4.388 10.612Q59.226 68 53 68M32 56H20v-6h12zm54 0H74v-6h12zM50 32V20h6v12zm0 54V74h6v12zM36.2 40.25l-7.575-7.275L32.9 28.55l7.2 7.5zm36.9 37.2-7.275-7.575L69.8 65.75l7.575 7.275zM65.75 36.2l7.275-7.575L77.45 32.9l-7.5 7.2zm-37.2 36.9 7.575-7.275L40.25 69.8l-7.275 7.575z"
      />
    </g>
    <defs>
      <filter
        id="light_mode_svg__a"
        width={106}
        height={106}
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
        <feColorMatrix values="0 0 0 0 0.258824 0 0 0 0 0.12549 0 0 0 0 0.0235294 0 0 0 1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_64" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1_64"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgLightMode;
