"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Two bundles of curved lines hugging the left and right edges of a section.
 * Every line runs edge to edge (top to bottom) and stays fully drawn; the
 * animation only flexes each curve and pulses its opacity, so no line ever
 * ends partway into the section. Decorative and pointer-transparent.
 */
export function EdgeLines({
  colors = ["#2563eb", "#f97316"],
  count = 16,
  spread = 26,
  className,
}: {
  /** Stroke colours, alternated across the lines. */
  colors?: string[];
  /** Lines per side. */
  count?: number;
  /** How far in from each edge the bundle reaches, in % of the width. */
  spread?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  // Coordinates are in % of the section (viewBox 0 0 100 100, stretched to fit)
  const curve = (x: number, bow: number) =>
    `M${x} -2 C${x + bow} 30 ${x + bow} 70 ${x} 102`;

  const lines = Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1); // 0 at the edge, 1 innermost
    return {
      id: i,
      x: t * spread * 0.55,
      bow: 4 + t * spread * 0.45,
      color: colors[i % colors.length],
      // Fainter towards the centre so the bundle fades into the content
      opacity: 0.55 - t * 0.4,
      // Deterministic 7–12s spread (render must stay pure)
      duration: 7 + ((i * 5) % 6),
    };
  });

  const side = (mirror: boolean) =>
    lines.map((line) => {
      const rest = curve(line.x, line.bow);
      const flexed = curve(line.x, line.bow * 1.25);
      return (
        <motion.path
          key={`${mirror ? "r" : "l"}${line.id}`}
          d={rest}
          stroke={line.color}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          strokeOpacity={line.opacity}
          animate={
            reduceMotion
              ? undefined
              : { d: [rest, flexed, rest], opacity: [0.6, 1, 0.6] }
          }
          transition={{
            duration: line.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: (line.id % 4) * 0.8,
          }}
        />
      );
    });

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <g>{side(false)}</g>
        <g transform="translate(100 0) scale(-1 1)">{side(true)}</g>
      </svg>
    </div>
  );
}
