"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useWindowWidth } from "@hooks/useWindowWidth";

interface HideArrowProps {
  selector: string;
  trigger?: string;
  start?: string;
  end?: string;
  markers?: boolean;
}
export default function HideArrowAnim({
  selector,
  trigger,
  start,
  end,
  markers,
}: HideArrowProps) {
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowWidth();

  useGSAP(() => {
    arrowRef.current = document.querySelector(selector);
    if (!arrowRef.current) return;

    gsap.to(arrowRef.current, {
      scrollTrigger: {
        trigger: trigger ? trigger : arrowRef.current,
        start: start ? start : "top 80%",
        end: end ? end : "+=80px",
        toggleActions: "play play reverse reverse",
        markers: markers,
      },
      opacity: 0,
      duration: 0.2,
      y: -10,
      scale: 0.9,
    });
  }, [windowWidth]);

  return <></>;
}
