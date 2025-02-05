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
}
export default function HideArrowAnim({
  selector,
  trigger,
  start,
  end,
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
      },
      opacity: 0,
      duration: 0.15,
    });
  }, [windowWidth]);

  return <></>;
}
