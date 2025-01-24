import { useState, useEffect } from "react";

const subscribers = new Set<(width: number) => void>();
let windowWidth = 0;

function getWindowWidth() {
  return typeof window !== "undefined" ? window.innerWidth : 0;
}

function updateFooterMargin(width: number) {
  if (width < 768) return;
  const footerHeight = document.querySelector("footer")?.clientHeight;
  document
    .querySelector("main")
    ?.setAttribute("style", `margin-bottom: ${footerHeight}px`);
}

function updateWindowWidth() {
  const newWidth = getWindowWidth();

  if (newWidth !== windowWidth) {
    windowWidth = newWidth;
    updateFooterMargin(newWidth);
    subscribers.forEach((callback) => callback(windowWidth));
  }
}

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      updateWindowWidth();
    };

    // Ensure this only runs client-side
    if (typeof window !== "undefined") {
      const initialWidth = getWindowWidth();
      setWidth(initialWidth);
      updateFooterMargin(initialWidth);

      window.addEventListener("resize", handleResize);
      subscribers.add(setWidth);

      return () => {
        window.removeEventListener("resize", handleResize);
        subscribers.delete(setWidth);
      };
    }
  }, []);

  return width;
}
