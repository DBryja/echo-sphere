"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, LenisRef } from "lenis/react";
import { useLayoutEffect, useRef } from "react";
import { debounce } from "@app/utils";
import { usePathname } from "next/navigation";

export default function LenisGsap({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.registerPlugin(ScrollTrigger);

    // Configure GSAP defaults for better performance
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    ScrollTrigger.config({
      ignoreMobileResize: true, // Prevents resize triggers on mobile address bar show/hide
    });

    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);

      // More efficient resize handling
      const debouncedRefresh = debounce(() => {
        ScrollTrigger.getAll().forEach((st) => {
          st.refresh();
        });
      }, 100);

      const resizeObserver = new ResizeObserver(debouncedRefresh);
      resizeObserver.observe(document.body);

      return () => {
        gsap.ticker.remove(update);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        lenisRef.current?.lenis?.off("scroll", ScrollTrigger.update);
        resizeObserver.disconnect();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }
  }, []);

  if (pathname?.startsWith("/store") || pathname == "/artists")
    return <>{children}</>;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1,
        lerp: 0.15, // Balanced smoothness
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.5,
        wheelMultiplier: 1,
        orientation: "vertical",
        gestureOrientation: "vertical",
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
