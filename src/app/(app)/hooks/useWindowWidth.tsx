import { useState, useEffect } from "react";

const subscribers = new Set<(width: number) => void>();
let windowWidth = 0;

function getWindowWidth() {
  return typeof window !== "undefined" ? window.innerWidth : 0;
}

function updateFooterMargin(width: number) {
  if (width < 768) {
    document.querySelector("main")?.setAttribute("style", `margin-bottom: 0px`);
    return;
  }

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
/**
 * Custom hook to get the current window width and update it on resize.
 *
 * Usage:
 * const windowWidth = useWindowWidth();
 *
 * The windowWidth value will be updated automatically whenever the window is resized.
 * This allows you to use the window width in your components and react to changes in window size.
 *
 * Example:
 * useEffect(() => {
 *   if (windowWidth > 1279) {
 *     // Do something for desktop view
 *   } else {
 *     // Do something for mobile view
 *   }
 * }, [windowWidth]);
 */
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
