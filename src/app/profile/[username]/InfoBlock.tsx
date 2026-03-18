export default function InfoBlock({
  icon,
  label,
  value,
  accentBg,
  accentIcon,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accentBg: string;
  accentIcon: string;
}) {
  return (
    <div
      className="flex items-center gap-4 bg-[#1c2e35] border border-white/[0.08] rounded-[20px] px-5 py-[18px] shadow-[0_2px_16px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-[180ms] ease-in-out hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)]"
      style={
        { "--ib-bg": accentBg, "--ib-ic": accentIcon } as React.CSSProperties
      }
    >
      <div
        className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 [&>svg]:w-6 [&>svg]:h-6"
        style={{ background: accentBg, color: accentIcon }}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-[3px] min-w-0">
        <span className="text-[11px] font-black uppercase tracking-[1px] text-white/[0.32]">
          {label}
        </span>
        <span className="text-[15px] font-extrabold text-white break-all leading-[1.3]">
          {value}
        </span>
      </div>
    </div>
  );
}
