import * as React from "react";
import type { SVGProps } from "react";
const SvgLearn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 46 46"
    {...props}
  >
    <rect width={19} height={30} x={4} y={11} fill="#1899D6" rx={4} />
    <rect width={19} height={30} x={23} y={11} fill="#1899D6" rx={4} />
    <rect width={19} height={30} x={4} y={8} fill="#1CB0F6" rx={4} />
    <rect width={19} height={30} x={23} y={8} fill="#1CB0F6" rx={4} />
    <rect width={15} height={22} x={8} y={14} fill="#E5E5E5" rx={2} />
    <rect width={15} height={22} x={23} y={14} fill="#E5E5E5" rx={2} />
    <rect width={15} height={23} x={8} y={11} fill="#FFF" rx={2} />
    <rect width={15} height={23} x={23} y={11} fill="#FFF" rx={2} />
    <path stroke="#F0F0F0" d="M23 11v23" />
    <path fill="#FFC800" d="M12 11v16l3.5-3 3.5 3V11z" />
    <rect width={9} height={3} x={26} y={16} fill="#E5E5E5" rx={1.5} />
    <rect width={9} height={3} x={26} y={22} fill="#E5E5E5" rx={1.5} />
    <rect width={6} height={3} x={26} y={28} fill="#E5E5E5" rx={1.5} />
    <rect
      width={1.5}
      height={10}
      x={5.5}
      y={10}
      fill="#fff"
      opacity={0.4}
      rx={0.75}
    />
    <rect
      width={1.5}
      height={10}
      x={39}
      y={10}
      fill="#fff"
      opacity={0.4}
      rx={0.75}
    />
  </svg>
);
export default SvgLearn;
