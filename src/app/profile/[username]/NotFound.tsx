import { Button } from "@/src/components/ui/Button";
import Link from "next/link";

export default function NotFound({ username }: { username: string }) {
  return (
    <div className="ng-animate-up flex flex-col items-center justify-center text-center px-6 pt-[60px] pb-20 gap-[14px]">
      <div className="ng-animate-float mb-1">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="140"
          height="140"
        >
          <circle cx="100" cy="90" r="58" fill="#3d2a6e" />
          <ellipse cx="100" cy="96" rx="44" ry="48" fill="#5440a0" />
          <line
            x1="76"
            y1="76"
            x2="90"
            y2="90"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="76"
            x2="76"
            y2="90"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <line
            x1="110"
            y1="76"
            x2="124"
            y2="90"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <line
            x1="124"
            y1="76"
            x2="110"
            y2="90"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 72 68 Q 83 61 91 67"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 109 67 Q 117 61 128 68"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 82 108 Q 100 98 118 108"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="148" cy="34" r="22" fill="#ff5252" />
          <text
            x="141"
            y="43"
            fill="white"
            fontSize="24"
            fontFamily="'Nunito', sans-serif"
            fontWeight="900"
          >
            ?
          </text>
          <path
            d="M 26 200 Q 40 148 100 140 Q 160 148 174 200 Z"
            fill="#2e1f55"
          />
          <path
            d="M 46 200 Q 58 154 100 148 Q 142 154 154 200 Z"
            fill="#3d2a6e"
          />
        </svg>
      </div>
      <h2 className="text-[26px] font-black m-0">Kayıp ruh...</h2>
      <p className="text-[15px] font-semibold text-white/[0.48] leading-[1.8] m-0">
        <span className="text-[#25B49A] font-black">@{username}</span>{" "}
        bulunamadı.
        <br />
        Bu kullanıcı aramızda değil gibi görünüyor.
      </p>

      <Link href="/">
        <Button variant="primary" size="md">
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  );
}
