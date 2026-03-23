"use client";

import React from "react";

const PrayerScene = () => {
  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
      <svg
        viewBox="0 0 420 420"
        width="420"
        height="420"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", maxHeight: "90vh" }}
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#1A7F6E" stopOpacity=".5" />
            <stop offset="100%" stopColor="#070F12" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rugGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A7F6E" />
            <stop offset="100%" stopColor="#0F5048" />
          </radialGradient>
        </defs>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800&display=swap');

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes floatBadge {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-7px) rotate(3deg); }
          }
          @keyframes floatBadge2 {
            0%, 100% { transform: translateY(0) rotate(2deg); }
            50% { transform: translateY(-9px) rotate(-2deg); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: .2; r: 2; }
            50% { opacity: 1; r: 3.5; }
          }
          @keyframes twinkle2 {
            0%, 100% { opacity: .1; }
            50% { opacity: .9; }
          }
          @keyframes glow {
            0%, 100% { opacity: .25; transform: scale(.95); }
            50% { opacity: .5; transform: scale(1.08); }
          }
          @keyframes ruffle {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(1.015); }
          }
          @keyframes progressFill {
            from { stroke-dashoffset: 220; }
            to { stroke-dashoffset: 55; }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(.5); }
            70% { transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }

          .prayer-figure { animation: float 3.2s ease-in-out infinite; transform-origin: 200px 260px; }
          .badge-streak  { animation: floatBadge 2.8s ease-in-out infinite; transform-origin: 320px 170px; }
          .badge-xp      { animation: floatBadge2 3.5s ease-in-out .6s infinite; transform-origin: 80px 190px; }
          .badge-time    { animation: floatBadge 4s ease-in-out 1.2s infinite; transform-origin: 300px 310px; }
          .rug           { animation: ruffle 4s ease-in-out infinite; transform-origin: 200px 295px; }
          .star1         { animation: twinkle 1.8s ease-in-out infinite; }
          .star2         { animation: twinkle 1.8s ease-in-out .5s infinite; }
          .star3         { animation: twinkle 1.8s ease-in-out 1s infinite; }
          .star4         { animation: twinkle 1.8s ease-in-out 1.5s infinite; }
          .star5         { animation: twinkle2 2.2s ease-in-out .3s infinite; }
          .bg-glow       { animation: glow 3s ease-in-out infinite; transform-origin: 200px 240px; }
          .progress-ring { animation: progressFill 2s cubic-bezier(.4,0,.2,1) 1s both; }
          .pop-in        { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) 1.5s both; }
          .pop-in-2      { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) .8s both; }
          .pop-in-3      { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) 1.1s both; }
          .pop-in-4      { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) .4s both; }

          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; }
          }
        `}</style>

        <ellipse
          className="bg-glow"
          cx="200"
          cy="240"
          rx="160"
          ry="130"
          fill="url(#bgGlow)"
        />

        <circle className="star1" cx="55" cy="65" r="2.5" fill="#FFD700" />
        <circle className="star2" cx="365" cy="55" r="3" fill="#4FC3F7" />
        <circle className="star3" cx="380" cy="170" r="2" fill="#FFD700" />
        <circle className="star4" cx="35" cy="200" r="2.5" fill="#25B49A" />
        <circle className="star5" cx="340" cy="385" r="2" fill="#F5A623" />

        <g className="star1" transform="translate(90,40)">
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="#F5A623"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="#F5A623"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g className="star3" transform="translate(350,95)">
          <line
            x1="0"
            y1="-5"
            x2="0"
            y2="5"
            stroke="#25B49A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="-5"
            y1="0"
            x2="5"
            y2="0"
            stroke="#25B49A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
        <g className="star2" transform="translate(40,330)">
          <line
            x1="0"
            y1="-5"
            x2="0"
            y2="5"
            stroke="#4FC3F7"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="-5"
            y1="0"
            x2="5"
            y2="0"
            stroke="#4FC3F7"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        <path
          d="M190 30 Q220 20 240 45 Q215 35 195 50 Q175 45 190 30Z"
          fill="#F5A623"
          opacity=".85"
        />
        <circle
          cx="370"
          cy="380"
          r="12"
          fill="none"
          stroke="#F5A623"
          strokeWidth="2"
          opacity=".3"
        />

        <g className="rug">
          <rect
            x="80"
            y="285"
            width="260"
            height="90"
            rx="12"
            fill="url(#rugGrad)"
          />
          <path
            d="M145 285 L145 320 Q145 335 160 335 L260 335 Q275 335 275 320 L275 285Z"
            fill="#25B49A"
            opacity=".4"
          />
          <path
            d="M158 285 L158 318 Q158 328 168 328 L252 328 Q262 328 262 318 L262 285Z"
            fill="#0F5048"
            opacity=".35"
          />
          <rect
            x="88"
            y="293"
            width="244"
            height="74"
            rx="8"
            fill="none"
            stroke="#F5A623"
            strokeWidth="1.5"
            opacity=".4"
          />
          <circle cx="120" cy="330" r="3" fill="#F5A623" opacity=".5" />
          <circle cx="300" cy="330" r="3" fill="#F5A623" opacity=".5" />
          <circle cx="120" cy="305" r="2" fill="#FFD700" opacity=".4" />
          <circle cx="300" cy="305" r="2" fill="#FFD700" opacity=".4" />
          <polygon
            points="210,295 220,308 210,321 200,308"
            fill="#F5A623"
            opacity=".3"
          />
        </g>

        <ellipse cx="200" cy="292" rx="48" ry="8" fill="#000" opacity=".25" />

        <g className="prayer-figure">
          <rect x="152" y="228" width="50" height="36" rx="10" fill="#25B49A" />
          <rect x="145" y="256" width="60" height="28" rx="10" fill="#1A7F6E" />
          <circle cx="178" cy="220" r="22" fill="#FFCC80" />
          <path
            d="M156 214 Q178 198 200 214 Q195 205 178 202 Q161 205 156 214Z"
            fill="#5D4037"
          />
          <path
            d="M169 220 Q173 217 177 220"
            stroke="#5D4037"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M181 220 Q185 217 189 220"
            stroke="#5D4037"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M174 228 Q179 232 184 228"
            stroke="#BF8060"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="108" y="246" width="50" height="16" rx="8" fill="#25B49A" />
          <circle cx="108" cy="254" r="9" fill="#FFCC80" />
          <rect x="200" y="246" width="50" height="16" rx="8" fill="#25B49A" />
          <circle cx="250" cy="254" r="9" fill="#FFCC80" />
          <ellipse
            cx="178"
            cy="280"
            rx="14"
            ry="8"
            fill="#FFCC80"
            opacity=".9"
          />
          <path
            d="M157 210 Q178 196 199 210 Q190 200 178 198 Q166 200 157 210Z"
            fill="#E0E0E0"
            opacity=".9"
          />
        </g>

        <g className="badge-streak pop-in">
          <rect
            x="285"
            y="148"
            width="105"
            height="40"
            rx="20"
            fill="#FF6B35"
          />
          <rect
            x="288"
            y="151"
            width="99"
            height="34"
            rx="18"
            fill="#FF8C5A"
            opacity=".5"
          />
          <path
            d="M303 178 Q303 168 310 163 Q308 170 313 168 Q311 173 316 170 Q312 178 308 180Z"
            fill="#FFD54F"
          />
          <path
            d="M306 178 Q305 172 310 168 Q309 173 313 171 Q310 176 309 180Z"
            fill="#FFECB3"
          />
          <text
            x="322"
            y="176"
            fontFamily="'Fredoka One',cursive"
            fontSize="16"
            fill="#fff"
          >
            7 Gün
          </text>
        </g>

        <g className="badge-xp pop-in-2">
          <rect x="20" y="168" width="100" height="38" rx="19" fill="#9C27B0" />
          <rect
            x="23"
            y="171"
            width="94"
            height="32"
            rx="17"
            fill="#CE93D8"
            opacity=".35"
          />
          <path
            d="M38 193 L40 188 L42 193 L47 193 L43 196 L45 202 L40 199 L35 202 L37 196 L33 193Z"
            fill="#FFD700"
          />
          <text
            x="52"
            y="193"
            fontFamily="'Fredoka One',cursive"
            fontSize="15"
            fill="#fff"
          >
            +25 XP
          </text>
        </g>

        <g className="badge-time pop-in-3">
          <rect
            x="265"
            y="300"
            width="130"
            height="38"
            rx="19"
            fill="#1a2b2a"
            stroke="#25B49A"
            strokeWidth="1.5"
          />
          <circle
            cx="284"
            cy="319"
            r="10"
            fill="none"
            stroke="#25B49A"
            strokeWidth="2"
          />
          <line
            x1="284"
            y1="314"
            x2="284"
            y2="320"
            stroke="#25B49A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="284"
            y1="319"
            x2="288"
            y2="319"
            stroke="#4FC3F7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="300"
            y="315"
            fontFamily="'Nunito',sans-serif"
            fontWeight="700"
            fontSize="9"
            fill="rgba(255,255,255,.6)"
          >
            Sabah
          </text>
          <text
            x="300"
            y="327"
            fontFamily="'Fredoka One',cursive"
            fontSize="13"
            fill="#fff"
          >
            05:42
          </text>
        </g>

        <g className="pop-in-4" transform="translate(28,28)">
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="rgba(255,255,255,.1)"
            strokeWidth="6"
          />
          <circle
            className="progress-ring"
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#25B49A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset="220"
            transform="rotate(-90 50 50)"
          />
          <text
            x="50"
            y="46"
            textAnchor="middle"
            fontFamily="'Fredoka One',cursive"
            fontSize="14"
            fill="#fff"
          >
            3/5
          </text>
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontFamily="'Nunito',sans-serif"
            fontSize="8"
            fill="rgba(255,255,255,.55)"
          >
            Namaz
          </text>
        </g>
      </svg>
    </div>
  );
};

export default PrayerScene;
