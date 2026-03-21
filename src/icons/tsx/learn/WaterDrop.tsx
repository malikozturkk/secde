import * as React from "react";
import type { SVGProps } from "react";
const SvgWaterDrop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={60}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M24.825 51a2.4 2.4 0 0 0 1.538-.712Q27 49.65 27 48.75q0-1.05-.675-1.687-.675-.638-1.725-.563-3.075.225-6.525-1.687t-4.35-6.938q-.15-.825-.787-1.35A2.24 2.24 0 0 0 11.474 36q-1.05 0-1.725.788-.675.787-.45 1.837 1.275 6.825 6 9.75T24.825 51M24 60q-10.275 0-17.137-7.05Q0 45.9 0 35.4q0-7.5 5.963-16.312Q11.925 10.273 24 0q12.075 10.275 18.038 19.088Q48 27.899 48 35.4q0 10.5-6.862 17.55Q34.275 60 24 60"
    />
  </svg>
);
export default SvgWaterDrop;
