"use client";

import Link from "next/link";
import { CONSENT_LABELS, CONSENT_PATHS } from "@/src/constants/consent";
import type { ConsentType } from "@/src/types/consent.types";

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
        "text-[var(--ng-green)] underline hover:text-[var(--ng-sky)] transition-colors"
      }
    >
      {children ?? CONSENT_LABELS[type]}
    </Link>
  );
}
