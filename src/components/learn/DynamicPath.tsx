"use client";

import { useState, useRef, useLayoutEffect } from "react";

interface DynamicPathProps {
  nodeIds: string[];
}

export function DynamicPath({ nodeIds }: DynamicPathProps) {
  const [path, setPath] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);

  const calculatePath = () => {
    if (!svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const points: { x: number; y: number }[] = [];

    nodeIds.forEach((id) => {
      const element = document.querySelector(`[data-path-node="${id}"]`);
      if (element) {
        const target = element.querySelector("button") || element;
        const rect = target.getBoundingClientRect();

        points.push({
          x: rect.left + rect.width / 2 - svgRect.left,
          y: rect.top + rect.height / 2 - svgRect.top,
        });
      }
    });

    if (points.length < 2) {
      setPath("");
      return;
    }

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];

      const dy = p1.y - p0.y;
      const cp1y = p0.y + dy / 2;
      const cp2y = p1.y - dy / 2;

      d += ` C ${p0.x} ${cp1y}, ${p1.x} ${cp2y}, ${p1.x} ${p1.y}`;
    }

    setPath(d);
  };

  useLayoutEffect(() => {
    calculatePath();
    const timeoutId = setTimeout(calculatePath, 100);
    const handleUpdate = () => calculatePath();
    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);
    const observer = new ResizeObserver(handleUpdate);
    if (svgRef.current?.parentElement) {
      observer.observe(svgRef.current.parentElement);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
      observer.disconnect();
    };
  }, [nodeIds]);

  return (
    <svg
      ref={svgRef}
      className="path-svg"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "visible",
      }}
    >
      <path
        d={path}
        stroke="rgba(62,187,255,0.15)"
        strokeWidth={12}
        fill="none"
        strokeLinecap="round"
        style={{ filter: "blur(8px)" }}
      />
      <path
        d={path}
        stroke="rgba(62,187,255,0.25)"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="12 16"
      />
    </svg>
  );
}
