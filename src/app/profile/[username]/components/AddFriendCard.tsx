import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import InviteDialog from "./InviteDialog";

export default function AddFriendCard() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <div className="border-2 border-[rgba(255,255,255,0.15)] rounded-2xl flex flex-col overflow-hidden mb-4 bg-[#131f24] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-[17px] font-extrabold text-white m-0">
            Arkadaş ekle
          </h2>
        </div>

        <div className="flex flex-col pb-2">
          <Link
            href="/search"
            className="flex items-center gap-4 px-5 py-3 transition-colors no-underline group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 52 52"
              fill="none"
            >
              <g clipPath="url(#clip_unique_1)">
                <rect
                  x="12"
                  y="22"
                  width="8"
                  height="20"
                  rx="2"
                  transform="rotate(45 12 32)"
                  fill="#8B4513"
                ></rect>
                <rect
                  x="14.5"
                  y="22.5"
                  width="3"
                  height="14"
                  rx="1"
                  transform="rotate(45 14.5 34.5)"
                  fill="#CD7900"
                ></rect>
                <circle
                  cx="32"
                  cy="20"
                  r="12"
                  stroke="#4A90E2"
                  strokeWidth="4"
                ></circle>
                <circle cx="32" cy="20" r="10" fill="#DDF4FF"></circle>
                <path
                  d="M28 14C26 16 25 19 25 21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                ></path>
                <circle
                  cx="36"
                  cy="16"
                  r="2"
                  fill="white"
                  opacity="0.8"
                ></circle>
              </g>
              <defs>
                <clipPath id="clip_unique_1">
                  <rect width="52" height="52" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <div className="flex-1">
              <span className="font-extrabold text-[15px] text-white">
                Arkadaşlarını bul
              </span>
            </div>
            <ChevronRight
              size={20}
              className="text-white opacity-30 transition-opacity"
              strokeWidth={2.5}
            />
          </Link>

          <button
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-4 px-5 py-3 transition-colors bg-transparent border-none w-full cursor-pointer text-left group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 0 52 52"
              fill="none"
              width="48"
            >
              <g clipPath="url(#clip0_unique_invite)">
                <circle cx="26" cy="18" r="14" fill="#25b49a"></circle>

                <circle cx="21" cy="16" r="2.5" fill="#4B4B4B"></circle>
                <circle cx="31" cy="16" r="2.5" fill="#4B4B4B"></circle>
                <circle cx="21.5" cy="15.5" r="0.8" fill="white"></circle>
                <circle cx="31.5" cy="15.5" r="0.8" fill="white"></circle>

                <path
                  d="M24 22C24.5 23 27.5 23 28 22"
                  stroke="#4B4B4B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>

                <path
                  d="M26 4C31 4 35 7.5 35 9L17 9C17 7.5 21 4 26 4Z"
                  fill="#C2D1DD"
                ></path>

                <path
                  d="M10 24C10 22.3431 11.3431 21 13 21H39C40.6569 21 42 22.3431 42 24V40C42 41.6569 40.6569 43 39 43H13C11.3431 43 10 41.6569 10 40V24Z"
                  fill="#FFB044"
                ></path>

                <path
                  d="M10 21L26 31L42 21"
                  stroke="#D4881A"
                  strokeWidth="1.5"
                ></path>

                <rect
                  x="8"
                  y="26"
                  width="6"
                  height="10"
                  rx="3"
                  fill="#FFE879"
                ></rect>
                <rect
                  x="38"
                  y="26"
                  width="6"
                  height="10"
                  rx="3"
                  fill="#FFE879"
                ></rect>
              </g>
              <defs>
                <clipPath id="clip0_unique_invite">
                  <rect width="52" height="52" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <div className="flex-1">
              <span className="font-extrabold text-[15px] text-white">
                Arkadaşlarını davet et
              </span>
            </div>
            <ChevronRight
              size={20}
              className="text-white opacity-30 transition-opacity"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      <InviteDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </>
  );
}
