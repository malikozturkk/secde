export default function DefaultAvatar({ username }: { username: string }) {
  const code = username.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const hairColors = ["#2e1f14", "#111111", "#8b5a2b", "#a0522d", "#1a1a2e"];
  const hair = hairColors[code % hairColors.length];

  const eyeColors = [
    { iris: "#2d6e28", pupil: "#0e0500" },
    { iris: "#1a3d99", pupil: "#040e28" },
    { iris: "#2a6e22", pupil: "#071000" },
    { iris: "#7a3a8a", pupil: "#180820" },
    { iris: "#2a6070", pupil: "#040e14" },
  ];
  const eye = eyeColors[(code >> 2) % eyeColors.length];

  const skinSets = [
    {
      face: "#e09868",
      neck: "#d08860",
      ear: "#b87048",
      nose: "#b87048",
      mouth: "#9a5028",
    },
    {
      face: "#e09868",
      neck: "#e09868",
      ear: "#b87048",
      nose: "#b87048",
      mouth: "#9a5028",
    },
    {
      face: "#c8784a",
      neck: "#b86838",
      ear: "#a05828",
      nose: "#a05828",
      mouth: "#7a3818",
    },
  ];
  const skin = skinSets[(code >> 4) % skinSets.length];

  const outfitColors = ["#2d3a4a", "#25B49A", "#6b3fa0", "#1a5a7a", "#2a4a2a"];
  const outfit = outfitColors[(code >> 6) % outfitColors.length];

  const blinkId = `blink-${code}`;

  return (
    <svg
      viewBox="0 0 220 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <style>{`
    @keyframes ${blinkId} {
      0%, 90%, 100% { transform: scaleY(1); }
      93%           { transform: scaleY(0.06); }
      96%           { transform: scaleY(1); }
    }
    .${blinkId}-eye {
      transform-origin: 110px 144px;
      animation: ${blinkId} 4.5s ease-in-out infinite;
    }
  `}</style>

      {/* Giysi */}
      <path d="M 4 280 Q 10 234 110 220 Q 210 234 216 280 Z" fill={outfit} />
      <rect x="72" y="208" width="76" height="50" rx="14" fill={outfit} />

      {/* Boyun */}
      <rect x="80" y="188" width="60" height="44" rx="10" fill={skin.neck} />

      {/* Kulaklar */}
      <ellipse cx="30" cy="158" rx="15" ry="19" fill={skin.face} />
      <ellipse cx="190" cy="158" rx="15" ry="19" fill={skin.face} />
      <ellipse cx="30" cy="158" rx="9" ry="12" fill={skin.ear} />
      <ellipse cx="190" cy="158" rx="9" ry="12" fill={skin.ear} />

      {/* Baş */}
      <rect x="36" y="90" width="148" height="136" rx="56" fill={skin.face} />

      {/* Saç */}
      <path
        d={`M 36 145 C 36 145, 34 130, 36 120 C 36 90, 45 75, 65 70 C 75 60, 85 50, 105 55 C 115 45, 135 45, 150 60 C 165 65, 180 80, 184 105 C 186 120, 184 145, 184 145 L 184 135 C 184 110, 170 95, 140 95 C 120 95, 100 110, 80 95 C 60 95, 36 110, 36 135 Z`}
        fill={hair}
      />

      {/* Kaşlar */}
      <path
        d="M 58 126 C 68 119, 84 118, 94 123"
        stroke={hair}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 126 123 C 136 118, 152 119, 162 126"
        stroke={hair}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />

      {/* Göz kırpma grubu */}
      <g className={`${blinkId}-eye`}>
        {/* Göz akları */}
        <ellipse cx="76" cy="144" rx="18" ry="17" fill="white" />
        <ellipse cx="144" cy="144" rx="18" ry="17" fill="white" />
        {/* İrisler */}
        <circle cx="76" cy="145" r="11" fill={eye.iris} />
        <circle cx="144" cy="145" r="11" fill={eye.iris} />
        {/* Pupiller */}
        <circle cx="76" cy="145" r="6.5" fill={eye.pupil} />
        <circle cx="144" cy="145" r="6.5" fill={eye.pupil} />
        {/* Parıltılar */}
        <circle cx="80" cy="140" r="4" fill="white" />
        <circle cx="148" cy="140" r="4" fill="white" />
      </g>

      {/* Burun */}
      <ellipse cx="110" cy="158" rx="5.5" ry="7.5" fill={skin.nose} />

      {/* Ağız */}
      <path
        d="M 80 183 Q 110 202 140 183"
        stroke={skin.mouth}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
