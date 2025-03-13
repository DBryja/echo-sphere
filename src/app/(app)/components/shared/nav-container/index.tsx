"use client";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import debounce from "lodash/debounce";
import { useWindowWidth } from "@hooks/useWindowWidth";

import variables from "@globals/_variables.module.scss";

import Nav from "@components/shared/nav";
import HeaderMenuButton from "@components/buttons/menu";
import Menu from "@components/menu";
import OpenCart from "@components/OpenCart";
import { ContactDatum, MenuItem } from "@/payload-types";
import { sanitizeBreakpointVariable } from "@app/utils";

gsap.registerPlugin(ScrollTrigger);
export default function NavButtonContainer({
                                             navItems,
                                             contactData,
                                           }: {
  navItems: MenuItem[];
  contactData: ContactDatum;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const currentTimeline = useRef<GSAPTimeline | null>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const basketTimeline = useRef<GSAPTimeline | null>(null);
  const breakpoint = sanitizeBreakpointVariable(variables["bpLg"]);

  // Add a ref to track if component has mounted
  const hasMounted = useRef(false);

  const pathname = usePathname();
  const isStore = pathname?.startsWith("/store");
  const isHome = pathname === "/";

  const windowWidth = useWindowWidth();

  // Determine initial state based on conditions
  const [showNav, setShowNav] = useState<boolean>(() => {
    // Only show Nav on homepage and above breakpoint
    return isHome && (typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true);
  });

  const headerState =
    showNav && isHome && windowWidth >= breakpoint ? "nav" : "button";

  const xOffset = 5;
  const stagger = 0.05;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Mark component as mounted
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    const headerElement = document.querySelector(".header") as HTMLElement;
    if (headerElement) {
      headerElement.dataset.state = headerState;
    }
  }, [headerState]);

  const debouncedSetShowNav = debounce((progress: number) => {
    if (!isHome) return;
    setShowNav(progress <= 0.5);
  }, 50);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  //ScrollTrigger for showing/hiding nav
  useGSAP(() => {
    if (!container.current || windowWidth < breakpoint || !isHome) return;

    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: "body",
      start: "150px 100px",
      end: "+=0",
      onUpdate: (self) => {
        debouncedSetShowNav(self.progress);
      },
    });

    return () => {
      scrollTriggerInstance.current?.kill();
      debouncedSetShowNav.cancel();
    };
  }, [windowWidth, breakpoint, isHome]);

  //Basket animation
  useGSAP(
    () => {
      if (basketTimeline.current) basketTimeline.current.kill();

      const tl = gsap.timeline();
      basketTimeline.current = tl;

      const isNavState = headerState === "nav";

      tl.set(".open-cart", {
        opacity: 0,
        right: isNavState ? 4 : 24,
        top: isNavState ? 56 : "auto",
        position: isNavState ? "absolute" : "relative",
      });

      tl.to(
        ".open-cart",
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        ">0.3",
      );

      tl.to(
        ".open-cart",
        {
          right: isNavState ? 4 : 24,
          top: isNavState ? 56 : "auto",
          position: isNavState ? "absolute" : "relative",
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<",
      );

      return () => {
        basketTimeline.current?.kill();
      };
    },
    { dependencies: [headerState], scope: container },
  );

  // Hiding and showing nav and menu
  useGSAP(
    () => {
      if (currentTimeline.current) currentTimeline.current.kill();

      const tl = gsap.timeline();
      currentTimeline.current = tl;

      if (windowWidth <= breakpoint || !isHome) {
        if (document.querySelector(".header__nav")) {
          tl.to(".header__nav", { visibility: "hidden", display: "none" });
        }
        tl.to(".header__menu", {
          x: 0,
          visibility: "visible",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          display: "flex",
        });
      } else {
        if (showNav) {
          tl.to(".header__menu", {
            x: xOffset,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          tl.set(
            ".header__menu",
            { visibility: "hidden", display: "none" },
            ">",
          );
          tl.to(
            ".header__nav",
            { visibility: "visible", display: "flex" },
            "<-0.5",
          );
          tl.to(
            ".header__nav > *",
            {
              x: 0,
              opacity: 1,
              stagger: -1 * stagger,
              duration: 0.1,
              ease: "power2.out",
            },
            ">-0.1",
          );
        } else {
          tl.to(".header__nav > *", {
            x: xOffset,
            opacity: 0,
            stagger: stagger,
            duration: 0.1,
            ease: "power2.out",
          });
          tl.to(
            ".header__nav",
            { visibility: "hidden", display: "none" },
            ">-0.1",
          );
          tl.to(
            ".header__menu",
            {
              x: 0,
              visibility: "visible",
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              display: "flex",
            },
            "<",
          );
        }
      }

      return () => {
        currentTimeline.current?.kill();
      };
    },
    { dependencies: [showNav, windowWidth, headerState, breakpoint, isHome] },
  );

  // Add initial styling via useEffect to handle SSR properly
  useEffect(() => {
    if (!hasMounted.current) return;

    // Set initial styles directly for immediate effect
    if (isHome && windowWidth >= breakpoint) {
      // Initial nav styles
      const navElement = document.querySelector(".header__nav");
      if (navElement) {
        (navElement as HTMLElement).style.visibility = "visible";
        (navElement as HTMLElement).style.display = "flex";
      }

      // Hide menu initially
      const menuElement = document.querySelector(".header__menu");
      if (menuElement) {
        (menuElement as HTMLElement).style.visibility = "hidden";
        (menuElement as HTMLElement).style.display = "none";
      }
    } else {
      // Hide nav initially
      const navElement = document.querySelector(".header__nav");
      if (navElement) {
        (navElement as HTMLElement).style.visibility = "hidden";
        (navElement as HTMLElement).style.display = "none";
      }

      // Show menu initially
      const menuElement = document.querySelector(".header__menu");
      if (menuElement) {
        (menuElement as HTMLElement).style.visibility = "visible";
        (menuElement as HTMLElement).style.display = "flex";
      }
    }
  }, [isHome, windowWidth, breakpoint]);

  // Use conditional rendering to prevent the flash
  return (
    <div
      ref={container}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        position: "relative",
        width: "fit-content",
      }}
    >
      {/* Conditionally render based on proper state */}
      {isHome && <Nav navItems={navItems} style={{
        visibility: windowWidth >= breakpoint ? 'visible' : 'hidden',
        display: windowWidth >= breakpoint ? 'flex' : 'none'
      }} />}

      <OpenCart isStore={isStore} />

      <Menu
        isOpen={isMenuOpen}
        navItems={navItems}
        contactData={contactData}
        onItemClickAction={toggleMenu}
      />

      {/* Only show button when needed */}
      <HeaderMenuButton
        onClick={toggleMenu}
        isMenuOpen={isMenuOpen}
        style={{
          visibility: (!isHome || windowWidth < breakpoint) ? 'visible' : 'hidden',
          opacity: (!isHome || windowWidth < breakpoint) ? 1 : 0
        }}
      />
    </div>
  );
}