"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, LenisRef } from "lenis/react";
import { useLayoutEffect, useRef } from "react";

export default function LenisGsap({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);

  useLayoutEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.registerPlugin(ScrollTrigger);

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);

    // Add ResizeObserver to update ScrollTrigger on layout changes
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 2,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
