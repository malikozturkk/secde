"use client";

import React from "react";
import type { SVGProps } from "react";

const baseProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const PinIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx={12} cy={10} r={3} />
  </svg>
);

export const ChevronDownIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronLeftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRightIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const CalendarIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
    <line x1={16} y1={2} x2={16} y2={6} />
    <line x1={8} y1={2} x2={8} y2={6} />
    <line x1={3} y1={10} x2={21} y2={10} />
  </svg>
);

export const RefreshIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M3 21v-5h5" />
  </svg>
);

export const GlobeIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <circle cx={12} cy={12} r={9} />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const InfoIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <circle cx={12} cy={12} r={9} />
    <line x1={12} y1={8} x2={12} y2={12} />
    <line x1={12} y1={16} x2={12.01} y2={16} />
  </svg>
);

export const MoonIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const LocationDeniedIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...baseProps} {...props}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <line x1={9} y1={13} x2={15} y2={7} />
    <line x1={9} y1={7} x2={15} y2={13} />
  </svg>
);
