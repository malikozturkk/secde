import { useEffect, useState } from "react";

interface HexInputProps {
  value: string;
  onChange: (hex: string) => void;
}

function HexInput({ value, onChange }: HexInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);

    const normalized = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(normalized)) {
      setError(false);
      onChange(normalized.toUpperCase());
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setInputValue(value);
    setError(false);
  }, [value]);

  return (
    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10 lg:mt-2 lg:pt-2">
      <div
        className="w-8 h-8 rounded-lg border border-white/20 shrink-0"
        style={{ backgroundColor: error ? value : inputValue }}
      />
      <div className="flex flex-col gap-0.5 flex-1">
        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">
          Özel renk
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          maxLength={7}
          placeholder="#RRGGBB"
          className="bg-transparent text-sm font-mono text-white placeholder:text-white/20 outline-none border-b transition-colors"
          style={{ borderColor: error ? "#ff4b4b" : "rgba(255,255,255,0.15)" }}
        />
      </div>
    </div>
  );
}

export default HexInput;
