"use client";

import { useEffect, useRef } from "react";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";

import { logError } from "@/lib/logger";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

interface GlobeConfig {
  width: number;
  height: number;
  devicePixelRatio: number;
  phi: number;
  theta: number;
  dark: number;
  diffuse: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  markerElevation: number;
  markers: { location: [number, number]; size: number }[];
}

const GLOBE_CONFIG: GlobeConfig = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.85, 0.85, 0.85],
  markerColor: [0.85, 0.55, 0.15],
  glowColor: [0.9, 0.9, 0.9],
  // cobe 2 draws markers as dots raised above the surface (default 0.05) and larger than 0.6 did,
  // so they sit flat and use 0.4× the old sizes to look like the dots from before
  markerElevation: 0,
  markers: [
    { location: [14.5995, 120.9842], size: 0.012 },
    { location: [19.076, 72.8777], size: 0.04 },
    { location: [23.8103, 90.4125], size: 0.02 },
    { location: [30.0444, 31.2357], size: 0.028 },
    { location: [39.9042, 116.4074], size: 0.032 },
    { location: [-23.5505, -46.6333], size: 0.04 },
    { location: [19.4326, -99.1332], size: 0.04 },
    { location: [40.7128, -74.006], size: 0.04 },
    { location: [34.6937, 135.5022], size: 0.02 },
    { location: [41.0082, 28.9784], size: 0.024 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: GlobeConfig;
}) {
  const phiRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };
  const widthRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Without WebGL (hardware acceleration off, old drivers, privacy browsers) cobe 2 returns a
    // globe that draws nothing instead of throwing. The try/catch stays for any other failure:
    // the globe is decorative, so it must never crash the whole page.
    let globe: ReturnType<typeof createGlobe> | undefined;
    let frame = 0;
    try {
      globe = createGlobe(canvasRef.current!, {
        ...config,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });

      // cobe 2 has no render loop of its own: each update() draws one frame, so we drive it
      const tick = () => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        globe?.update({
          phi: phiRef.current + rs.get(),
          width: widthRef.current * 2,
          height: widthRef.current * 2,
        });
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    } catch (err) {
      logError("Globe could not be rendered", err);
    }

    return () => {
      cancelAnimationFrame(frame);
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[250px]", className)}>
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
