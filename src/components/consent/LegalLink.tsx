"use client";

import Link from "next/link";
import { CONSENT_LABELS, CONSENT_PATHS } from "@/src/constants/consent";
import type { ConsentType } from "@/src/types";

interface LegalLinkProps {
  type: ConsentType;
  version?: string;
  className?: string;
  children?: React.ReactNode;
}

export function LegalLink({
  type,
  version,
  className,
  children,
}: LegalLinkProps) {
  const href = version
    ? `${CONSENT_PATHS[type]}?v=${encodeURIComponent(version)}`
    : CONSENT_PATHS[type];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "text-[#25B49A] underline hover:text-[#4FC3F7] transition-colors"
      }
    >
      {children ?? CONSENT_LABELS[type]}
    </Link>
  );
}
