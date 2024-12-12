"use client";
import { ReactNode, MouseEvent, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP((context, contextSafe) => {
    if (!contextSafe) return;

    gsap.set(ref.current, {
      "--top": "100%",
      "--bottom": "0%",
      "--l": 0,
    });

    const onMouseEnter = contextSafe((event: MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const isMouseFromTop = event.clientY < rect.top + rect.height / 2;
      gsap.fromTo(
        ref.current,
        {
          "--top": isMouseFromTop ? "0" : "100%",
          "--bottom": isMouseFromTop ? "100%" : "0%",
        },
        {
          "--top": "0%",
          "--bottom": "0%",
          "--l": "8px",
          duration: 0.3,
          ease: "power2.out",
        },
      );
    });

    const onMouseLeave = contextSafe((event: MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const isMouseToTop = event.clientY < rect.top + rect.height / 2;
      gsap.to(ref.current, {
        "--top": isMouseToTop ? "0" : "100%",
        "--bottom": isMouseToTop ? "100%" : "0%",
        "--l": "0",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    if (ref.current) {
      // @ts-ignore
      ref.current.addEventListener("mouseenter", onMouseEnter);
      // @ts-ignore
      ref.current.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (ref.current) {
        // @ts-ignore
        ref.current.removeEventListener("mouseenter", onMouseEnter);
        // @ts-ignore
        ref.current.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  });

  return <div ref={ref}>{children}</div>;
}
