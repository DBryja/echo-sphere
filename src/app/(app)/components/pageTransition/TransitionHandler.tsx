"use client";

import { useEffect, useRef } from "react";
import { useTransition } from "@providers/TransitionContext";
import { usePathname } from "next/navigation";

export default function TransitionHandler() {
  const { endTransition, transitionBoxRef } = useTransition();
  const pathname = usePathname();
  const isInitialLoad = useRef(true);
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      transitionBoxRef.current?.classList.remove("initial");
      previousPathname.current = pathname;
      return;
    }

    if (previousPathname.current !== pathname) {
      requestAnimationFrame(() => {
        endTransition();
      });
      previousPathname.current = pathname;
    }
  }, [pathname, endTransition, transitionBoxRef]);

  return null;
}
