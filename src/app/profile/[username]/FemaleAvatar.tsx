import { AvatarCustomization } from "@/src/types/auth.types";

export default function FemaleAvatar({
  username,
  config,
}: {
  username: string;
  config: AvatarCustomization;
}) {
  const code = username.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const blinkId = `blink-${code}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 212 232"
      fill="none"
      style={{ width: "100%", height: "100%", display: "block", marginTop: 2 }}
    >
      <style>{`
    @keyframes ${blinkId} {
      0%, 90%, 100% { transform: scaleY(1); }
      93%           { transform: scaleY(0.06); }
      96%           { transform: scaleY(1); }
    }
    .${blinkId}-eye {
      transform-origin: 106px 96px;
      animation: ${blinkId} 4.5s ease-in-out infinite;
    }
  `}</style>

      <path
        d="M106 6C55 6 22 42 22 96C22 124 14 154 10 190C8 210 14 222 24 226C38 222 48 224 58 226C48 198 50 166 56 136L156 136C162 166 164 198 154 226C164 224 174 222 188 226C198 222 204 210 202 190C198 154 190 124 190 96C190 42 157 6 106 6Z"
        fill={config.colors.hair}
      />

      <path
        d="M0 231.969C4 201.303 39.3333 181.303 106 171.969C172.667 181.303 208 201.303 212 231.969H0Z"
        fill={config.colors.outfit}
      />
      <path
        d="M130 159.969H82C74.268 159.969 68 166.237 68 173.969V195.969C68 203.701 74.268 209.969 82 209.969H130C137.732 209.969 144 203.701 144 195.969V173.969C144 166.237 137.732 159.969 130 159.969Z"
        fill={config.colors.outfit}
      />

      <rect
        x="82"
        y="140"
        width="48"
        height="46"
        rx="16"
        fill={config.colors.skin}
      />

      <ellipse cx="31" cy="110" rx="12.5" ry="16.5" fill={config.colors.skin} />
      <ellipse
        cx="181"
        cy="110"
        rx="12.5"
        ry="16.5"
        fill={config.colors.skin}
      />
      <ellipse cx="31" cy="110" rx="7" ry="10" fill={config.colors.earInner} />
      <ellipse cx="181" cy="110" rx="7" ry="10" fill={config.colors.earInner} />

      <path
        d="M114 42H98C65 42 38 69 38 102V120C38 153 65 180 98 180H114C147 180 174 153 174 120V102C174 69 147 42 114 42Z"
        fill={config.colors.skin}
      />

      <path
        d="M38 104C34 50 62 14 106 14C150 14 178 50 174 104C170 88 162 68 146 60C126 52 94 52 74 60C58 68 42 88 38 104Z"
        fill={config.colors.hair}
      />

      <path
        d="M57 72C66 65 79 64 88 69"
        stroke={config.colors.eyebrow}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M124 69C133 64 146 65 155 72"
        stroke={config.colors.eyebrow}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <g className={`${blinkId}-eye`}>
        <path
          d="M72 112.969C81.9411 112.969 90 105.358 90 95.9695C90 86.5806 81.9411 78.9695 72 78.9695C62.0589 78.9695 54 86.5806 54 95.9695C54 105.358 62.0589 112.969 72 112.969Z"
          fill="white"
        />

        <path
          d="M140 112.969C149.941 112.969 158 105.358 158 95.9695C158 86.5806 149.941 78.9695 140 78.9695C130.059 78.9695 122 86.5806 122 95.9695C122 105.358 130.059 112.969 140 112.969Z"
          fill="white"
        />

        <path
          d="M72 107.969C78.0751 107.969 83 103.045 83 96.9695C83 90.8944 78.0751 85.9695 72 85.9695C65.9249 85.9695 61 90.8944 61 96.9695C61 103.045 65.9249 107.969 72 107.969Z"
          fill={config.colors.iris}
        />

        <path
          d="M140 107.969C146.075 107.969 151 103.045 151 96.9695C151 90.8944 146.075 85.9695 140 85.9695C133.925 85.9695 129 90.8944 129 96.9695C129 103.045 133.925 107.969 140 107.969Z"
          fill={config.colors.iris}
        />

        <path
          d="M72 103.469C75.5899 103.469 78.5 100.559 78.5 96.9695C78.5 93.3796 75.5899 90.4695 72 90.4695C68.4101 90.4695 65.5 93.3796 65.5 96.9695C65.5 100.559 68.4101 103.469 72 103.469Z"
          fill={config.colors.pupil}
        />

        <path
          d="M140 103.469C143.59 103.469 146.5 100.559 146.5 96.9695C146.5 93.3796 143.59 90.4695 140 90.4695C136.41 90.4695 133.5 93.3796 133.5 96.9695C133.5 100.559 136.41 103.469 140 103.469Z"
          fill={config.colors.pupil}
        />

        <path
          d="M76 95.9695C78.2091 95.9695 80 94.1786 80 91.9695C80 89.7603 78.2091 87.9695 76 87.9695C73.7909 87.9695 72 89.7603 72 91.9695C72 94.1786 73.7909 95.9695 76 95.9695Z"
          fill="white"
        />

        <path
          d="M144 95.9695C146.209 95.9695 148 94.1786 148 91.9695C148 89.7603 146.209 87.9695 144 87.9695C141.791 87.9695 140 89.7603 140 91.9695C140 94.1786 141.791 95.9695 144 95.9695Z"
          fill="white"
        />

        <path
          d="M56 89L49 86M60.5 84L54 79"
          stroke={config.colors.pupil}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        <path
          d="M156 89L163 86M151.5 84L158 79"
          stroke={config.colors.pupil}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      <ellipse
        cx="62"
        cy="122"
        rx="9"
        ry="6.5"
        fill={config.colors.nose}
        fillOpacity="0.2"
      />
      <ellipse
        cx="150"
        cy="122"
        rx="9"
        ry="6.5"
        fill={config.colors.nose}
        fillOpacity="0.2"
      />

      <path
        d="M106 116C108.761 116 111 113.314 111 110C111 106.686 108.761 104 106 104C103.239 104 101 106.686 101 110C101 113.314 103.239 116 106 116Z"
        fill={config.colors.nose}
      />

      <path
        d="M89 133C94 138 118 138 123 133C122 142 115 148 106 148C97 148 90 142 89 133Z"
        fill={config.colors.lips}
      />

      <path
        d="M89 133C94 130 100 129 103 132C105 133 107 133 109 132C112 129 118 130 123 133C118 138 94 138 89 133Z"
        fill={config.colors.lips}
      />

      <path
        d="M89 133C94 130 100 129 103 132C105 133 107 133 109 132C112 129 118 130 123 133C118 138 94 138 89 133Z"
        fill="black"
        fillOpacity="0.18"
      />
    </svg>
  );
}
