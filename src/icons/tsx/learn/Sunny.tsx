import * as React from "react";
import type { SVGProps } from "react";
const SvgSunny = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={66}
    height={66}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M30 12V0h6v12zm19.95 8.25-4.125-4.125 8.4-8.625 4.2 4.275zM54 36v-6h12v6zM30 66V54h6v12zM16.05 20.1 7.5 11.775l4.275-4.2 8.475 8.475zm38.1 38.4-8.325-8.625 4.05-4.05 8.55 8.25zM0 36v-6h12v6zm11.775 22.5-4.2-4.275 8.4-8.4 2.175 2.025 2.175 2.1zM33 51q-7.5 0-12.75-5.25T15 33t5.25-12.75T33 15t12.75 5.25T51 33t-5.25 12.75T33 51"
    />
  </svg>
);
export default SvgSunny;
