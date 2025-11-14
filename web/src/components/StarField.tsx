"use client";

import { useMemo } from "react";

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

const STAR_COUNT = 120;

export function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: STAR_COUNT }).map((_, idx) => {
      const size = Math.random() * 2 + 1;
      return {
        id: idx,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 55}%`,
        size,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 8,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
