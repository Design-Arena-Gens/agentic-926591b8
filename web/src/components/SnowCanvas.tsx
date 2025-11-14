"use client";

import { useEffect, useRef } from "react";

type Snowflake = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  sway: number;
  swaySpeed: number;
};

type Tree = {
  xRatio: number;
  baseWidth: number;
  height: number;
  tiers: number;
  snow: number[];
};

const TREES: Tree[] = [
  { xRatio: 0.12, baseWidth: 180, height: 320, tiers: 4, snow: [] },
  { xRatio: 0.32, baseWidth: 200, height: 360, tiers: 5, snow: [] },
  { xRatio: 0.52, baseWidth: 170, height: 300, tiers: 4, snow: [] },
  { xRatio: 0.72, baseWidth: 220, height: 380, tiers: 5, snow: [] },
  { xRatio: 0.88, baseWidth: 160, height: 280, tiers: 4, snow: [] },
];

const MAX_GROUND_DEPTH = 90;

function pointInTriangle(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
) {
  const v0x = cx - ax;
  const v0y = cy - ay;
  const v1x = bx - ax;
  const v1y = by - ay;
  const v2x = px - ax;
  const v2y = py - ay;

  const dot00 = v0x * v0x + v0y * v0y;
  const dot01 = v0x * v1x + v0y * v1y;
  const dot02 = v0x * v2x + v0y * v2y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v2x + v1y * v2y;

  const denom = dot00 * dot11 - dot01 * dot01;
  if (denom === 0) return false;

  const u = (dot11 * dot02 - dot01 * dot12) / denom;
  const v = (dot00 * dot12 - dot01 * dot02) / denom;
  return u >= 0 && v >= 0 && u + v <= 1;
}

export function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    let animationFrame = 0;
    const dpr = window.devicePixelRatio || 1;

    let flakes: Snowflake[] = [];
    let groundHeights: Float32Array = new Float32Array(0);
    let segmentWidth = 8;
    const trees = TREES.map((tree) => ({
      ...tree,
      snow: Array(tree.tiers).fill(0),
    }));

    const baseSurfaceRatio = 0.78;

    const createFlake = (): Snowflake => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: 0.55 + Math.random() * 1.15,
      radius: 1.4 + Math.random() * 2.3,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.003 + Math.random() * 0.004,
    });

    const configure = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const displayWidth = Math.floor(width * dpr);
      const displayHeight = Math.floor(height * dpr);
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
      if (typeof ctx.resetTransform === "function") {
        ctx.resetTransform();
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      ctx.scale(dpr, dpr);
      segmentWidth = Math.max(6, Math.round(width / 88));
      groundHeights = new Float32Array(Math.ceil(width / segmentWidth)).fill(12);
      flakes = Array.from({ length: Math.max(180, Math.floor(width * 0.5)) }, () =>
        createFlake(),
      );
      trees.forEach((tree) => {
        tree.snow = Array(tree.tiers).fill(0);
      });
    };

    const accumulateGround = (xPos: number, amount: number) => {
      const index = Math.max(
        0,
        Math.min(groundHeights.length - 1, Math.floor(xPos / segmentWidth)),
      );
      for (let offset = -2; offset <= 2; offset++) {
        const target = index + offset;
        if (target < 0 || target >= groundHeights.length) continue;
        const falloff = 1 - Math.abs(offset) * 0.2;
        groundHeights[target] = Math.min(
          groundHeights[target] + amount * falloff,
          MAX_GROUND_DEPTH,
        );
      }
    };

    const accumulateTree = (treeIndex: number, tierIndex: number, amount: number) => {
      const tree = trees[treeIndex];
      if (!tree) return;
      tree.snow[tierIndex] = Math.min(tree.snow[tierIndex] + amount * 0.7, 32);
    };

    const drawGround = (surfaceY: number) => {
      ctx.save();
      ctx.beginPath();
      const startY = surfaceY - groundHeights[0];
      ctx.moveTo(0, startY);
      for (let i = 1; i < groundHeights.length; i++) {
        const x = i * segmentWidth;
        const prevX = (i - 1) * segmentWidth;
        const controlX = prevX + segmentWidth / 2;
        const prevY = surfaceY - groundHeights[i - 1];
        const currentY = surfaceY - groundHeights[i];
        ctx.quadraticCurveTo(controlX, prevY, x, currentY);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, surfaceY - 80, 0, height);
      gradient.addColorStop(0, "rgba(255,255,255,0.92)");
      gradient.addColorStop(1, "rgba(226,232,240,0.88)");
      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(15,23,42,0.4)";
      ctx.shadowBlur = 28;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawTree = (
      tree: Tree,
      treeIndex: number,
      surfaceY: number,
      averagedGround: number,
    ) => {
      const treeX = tree.xRatio * width;
      const tierHeight = tree.height / tree.tiers;
      const baseY = surfaceY - averagedGround + 28;
      ctx.save();
      ctx.shadowColor = "rgba(15,23,42,0.6)";
      ctx.shadowBlur = 16;
      let currentBottom = baseY;

      for (let tier = 0; tier < tree.tiers; tier++) {
        const widthFactor = 1 - tier * 0.16;
        const tierWidth = tree.baseWidth * widthFactor;
        const top = currentBottom - tierHeight;
        ctx.beginPath();
        ctx.moveTo(treeX, top);
        ctx.lineTo(treeX - tierWidth / 2, currentBottom);
        ctx.lineTo(treeX + tierWidth / 2, currentBottom);
        ctx.closePath();
        const foliageGradient = ctx.createLinearGradient(
          treeX,
          top,
          treeX,
          currentBottom,
        );
        foliageGradient.addColorStop(0, "rgba(19,78,74,0.92)");
        foliageGradient.addColorStop(1, "rgba(5,46,51,0.92)");
        ctx.fillStyle = foliageGradient;
        ctx.fill();

        const snowAmount = tree.snow[tier] ?? 0;
        if (snowAmount > 1) {
          ctx.beginPath();
          const crestHeight = Math.min(snowAmount, tierHeight * 0.7);
          const left = treeX - tierWidth / 2 + 12;
          const right = treeX + tierWidth / 2 - 12;
          const ridgeY = top + 6;
          ctx.moveTo(left, ridgeY + crestHeight * 0.35);
          ctx.quadraticCurveTo(
            treeX,
            ridgeY - crestHeight * 0.35,
            right,
            ridgeY + crestHeight * 0.35,
          );
          ctx.lineTo(right, ridgeY + crestHeight);
          ctx.quadraticCurveTo(
            treeX,
            ridgeY + crestHeight + crestHeight * 0.45,
            left,
            ridgeY + crestHeight,
          );
          ctx.closePath();
          const snowGradient = ctx.createLinearGradient(
            treeX,
            ridgeY - crestHeight * 0.4,
            treeX,
            ridgeY + crestHeight,
          );
          snowGradient.addColorStop(0, "rgba(255,255,255,0.95)");
          snowGradient.addColorStop(1, "rgba(226,232,240,0.9)");
          ctx.fillStyle = snowGradient;
          ctx.fill();
        }

        currentBottom = top + tierHeight * 0.42;
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(67,56,202,0.35)";
      ctx.fillRect(treeX - 8, baseY, 16, 34);
      ctx.fillStyle = "rgba(148,163,184,0.34)";
      ctx.fillRect(treeX - 8, baseY + 6, 16, 6);
      ctx.restore();
    };

    const update = () => {
      const surfaceY = height * baseSurfaceRatio;

      flakes.forEach((flake, flakeIndex) => {
        flake.sway += flake.swaySpeed;
        flake.x += flake.vx + Math.sin(flake.sway) * 0.45;
        flake.y += flake.vy;

        if (flake.x < -10) flake.x = width + 10;
        if (flake.x > width + 10) flake.x = -10;

        let landed = false;

        for (let t = 0; t < trees.length; t++) {
          const tree = trees[t];
          const treeX = tree.xRatio * width;
          const tierHeight = tree.height / tree.tiers;
          let tierBottom = surfaceY - 6;
          for (let tier = 0; tier < tree.tiers; tier++) {
            const widthFactor = 1 - tier * 0.16;
            const tierWidth = tree.baseWidth * widthFactor;
            const top = tierBottom - tierHeight;
            const leftX = treeX - tierWidth / 2;
            const rightX = treeX + tierWidth / 2;
            if (
              pointInTriangle(
                flake.x,
                flake.y,
                treeX,
                top,
                leftX,
                tierBottom,
                rightX,
                tierBottom,
              )
            ) {
              if (flake.y + flake.radius >= top + 4) {
                accumulateTree(t, tier, flake.radius * 1.6);
                flakes[flakeIndex] = createFlake();
                landed = true;
                break;
              }
            }
            tierBottom = top + tierHeight * 0.46;
          }
          if (landed) break;
        }

        if (landed) return;

        const groundIndex = Math.max(
          0,
          Math.min(
            groundHeights.length - 1,
            Math.floor(flake.x / segmentWidth),
          ),
        );
        const groundSurface = surfaceY - groundHeights[groundIndex];
        if (flake.y + flake.radius >= groundSurface) {
          accumulateGround(flake.x, flake.radius * 2.4);
          flakes[flakeIndex] = createFlake();
          return;
        }

        if (flake.y > height + 12) {
          flakes[flakeIndex] = createFlake();
        }
      });

      ctx.clearRect(0, 0, width, height);

      drawGround(surfaceY);

      for (let t = 0; t < trees.length; t++) {
        const tree = trees[t];
        const x = tree.xRatio * width;
        const leftIndex = Math.max(
          0,
          Math.min(groundHeights.length - 1, Math.floor((x - 20) / segmentWidth)),
        );
        const rightIndex = Math.max(
          0,
          Math.min(groundHeights.length - 1, Math.floor((x + 20) / segmentWidth)),
        );
        let sample = 0;
        let count = 0;
        for (let i = leftIndex; i <= rightIndex; i++) {
          sample += groundHeights[i];
          count++;
        }
        const averaged = count > 0 ? sample / count : 0;
        drawTree(tree, t, surfaceY, averaged);
      }

      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      flakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();

      animationFrame = window.requestAnimationFrame(update);
    };

    configure();
    const handleResize = () => {
      configure();
    };
    window.addEventListener("resize", handleResize);
    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export default SnowCanvas;
