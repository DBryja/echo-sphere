"use client";

import "./menu.scss";
import Image from "@components/Image";
import Link from "@components/Link";

import type { ContactDatum, MenuItem } from "@/payload-types";
import {
  getImageUrl,
  getAlt,
  sanitizeBreakpointVariable,
} from "@/app/(app)/utils";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "@hooks/useWindowWidth";

import variables from "@globals/_variables.module.scss";
import colors from "@globals/_colors.module.scss";
import Logo from "@components/shared/logo/logo-css";
import { useGSAP } from "@gsap/react";

// Create a map to store individual timelines for each item
const itemTimelines: Map<string, GSAPTimeline> = new Map();

const animateImage = (
  imageElement: Element | null,
  direction: "in" | "out",
  itemName: string,
) => {
  if (!imageElement) return;

  // Kill existing timeline for this item before creating a new one
  let tl = itemTimelines.get(itemName);
  if (tl){
    if(direction === "in") tl.clear();
  } else{
    tl = gsap.timeline();
    itemTimelines.set(itemName, tl);
  }

  if (direction === "in") {
    tl
      .set(imageElement, { clipPath: "inset(100% 0% 0% 0%)" })
      .to(imageElement, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power2.out",
      });
  } else {
    tl.to(imageElement, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        // Remove the timeline from the map when complete
        itemTimelines.delete(itemName);
      },
    });
  }
};


export default function Menu({
  isOpen,
  contactData,
  navItems,
  onItemClickAction,
}: {
  isOpen: boolean;
  contactData: ContactDatum;
  navItems: MenuItem[];
  onItemClickAction: () => void;
}) {
  const { email, "phone-number": phoneNumber, address } = contactData;
  const containerRef = useRef<HTMLElement | null>(null);
  const [itemZIndices, setItemZIndices] = useState<{ [key: string]: number }>({},);
  const [lastHoveredItem, setLastHoveredItem] = useState<string | null>(null);

  const windowWidth = useWindowWidth();
  const isTablet = windowWidth >= sanitizeBreakpointVariable(variables["bpMd"]);
  const isDesktop =
    windowWidth >= sanitizeBreakpointVariable(variables["bpLg"]);

  const grantHighestZIndex = (itemName: string) => {
    setLastHoveredItem(itemName);
    setItemZIndices((prevIndices) => {
      const highestIndex = Math.max(...Object.values(prevIndices), 0);
      return { ...prevIndices, [itemName]: highestIndex + 1 };
    });
  };

  const menuItemsTimeline = useRef<GSAPTimeline | null>(null);
  const logoTimeline = useRef<GSAPTimeline | null>(null);
  const isFirstRender = useRef(true);
  const hasBeenOpened = useRef(false);
  let selectors = [
    ".menu__corner-logo",
    ".menu__links .enter-anim",
    ".menu__logo",
  ];
  if (isTablet)
    selectors = [
      ".menu__corner-logo",
      ".menu__links .enter-anim",
      ".menu__contact .enter-anim",
      ".menu__logo",
    ];

  useEffect(() => {
    if (isOpen) {
      const menu = containerRef.current as HTMLDivElement | null;
      menu?.classList.remove("loading");
    }
  }, [isOpen]);
  // Menu items animation
  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const duration = isTablet ? 0.15 : 0.3;
      const delay = isDesktop ? 0.15 : 0.3;

      if (isOpen) hasBeenOpened.current = true;
      if (!hasBeenOpened.current) return;

      if (menuItemsTimeline.current) menuItemsTimeline.current.kill();

      const tl = gsap.timeline();
      menuItemsTimeline.current = tl;

      // If scroll is at the top, corner logo is already visible so we only animate its color, otherwise we animate the entrance
      const filteredSelectors = selectors.filter((el) => {
        return window.scrollY < 20 ? el !== ".menu__corner-logo" : el;
      });

      if (isOpen) {
        filteredSelectors.forEach((selector) => {
          tl.from(
            selector,
            {
              opacity: 0,
              x: 20,
              y: -20,
              skewX: 10,
              ease: "power2.out",
              duration: duration,
              stagger: 0.05,
              delay: selector === ".menu__logo" ? 0 : delay,
            },
            "<",
          );
        });
      } else {
        const backingSelectors = isDesktop
          ? filteredSelectors
          : filteredSelectors.toReversed();
        backingSelectors.forEach((selector) => {
          tl.to(
            selector,
            {
              opacity: 0,
              x: 20,
              y: -20,
              skewX: 10,
              ease: "power2.out",
              duration: isTablet ? duration : duration / 2.25,
              stagger: isDesktop ? -0.02 : -0.03,
            },
            "<",
          );
        });
        tl.set(".enter-anim", {
          opacity: 1,
          x: 0,
          y: 0,
          skewX: 0,
          delay: 0.11,
        });
      }

      return () => {
        if (menuItemsTimeline.current) {
          menuItemsTimeline.current.kill();
        }
      };
    },
    { scope: containerRef.current!, dependencies: [isOpen, isTablet] },
  );
  // Icon color animation
  useGSAP(
    () => {
      if (logoTimeline.current) logoTimeline.current.kill();
      const logoTl = gsap.timeline();
      logoTimeline.current = logoTl;

      if (isOpen) {
        logoTl.to(".logoSVG", {
          ["--logo-icon-color"]: colors["white"],
          ease: "power2.in",
          duration: 0.5,
        });
      } else {
        logoTl.to(".logoSVG", {
          ["--logo-icon-color"]: colors["red"],
          ease: "power2.in",
          duration: 0.3,
        });
      }

      return () => {
        if (logoTimeline.current) {
          logoTimeline.current.kill();
        }
      };
    },
    { scope: containerRef.current!, dependencies: [isOpen, isDesktop] },
  );

  // Menu item hover on desktop
  useEffect(() => {
    if (!isDesktop) return;

    if (lastHoveredItem) {
      setItemZIndices((prevIndices) => {
        const newIndices = { ...prevIndices };
        Object.keys(newIndices).forEach((key) => {
          if (key !== lastHoveredItem) {
            newIndices[key] = Math.max(newIndices[key] - 1, 1);
          }
        });
        return newIndices;
      });
    }
  }, [lastHoveredItem, isDesktop]);
  // Menu item hover on desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isDesktop) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const imageName = target.getAttribute("data-name");
      if (imageName) {
        const imageElement = container.querySelector(
          `.menu__decor__item[data-item="${imageName}"]`,
        );

        animateImage(imageElement, "in", imageName);
        grantHighestZIndex(imageName);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const imageName = target.getAttribute("data-name");
      if (imageName) {
        const imageElement = container.querySelector(
          `.menu__decor__item[data-item="${imageName}"]`,
        );
        animateImage(imageElement, "out", imageName);
      }
    };

    navItems.forEach((item) => {
      const linkElement = container.querySelector(
        `.menu__links a[data-name="${item.name}"]`,
      ) as HTMLAnchorElement;
      if (linkElement) {
        linkElement.addEventListener("mouseenter", handleMouseEnter);
        linkElement.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const linkElement = container.querySelector(
          `.menu__links a[data-name="${item.name}"]`,
        ) as HTMLAnchorElement;
        if (linkElement) {
          linkElement.removeEventListener("mouseenter", handleMouseEnter);
          linkElement.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [navItems, isDesktop]);

  return (
    <section className={`menu ${isOpen ? "active" : ""}`} ref={containerRef}>
      {isDesktop && (
        <div className={"menu__decor"}>
          {navItems.map((item, index) => (
            <Image
              className="menu__decor__item"
              key={index}
              data-item={item.name}
              src={getImageUrl(item.img)}
              alt={getAlt(item)}
              width={600}
              height={300}
              style={{ zIndex: itemZIndices[item.name] || 1 }}
            />
          ))}
        </div>
      )}
      <div className={"menu__links"}>
        {navItems.map((item, index) => (
          <Link
            data-name={item.name}
            key={index}
            isMenu
            href={item.path.startsWith("/") ? item.path : `/${item.path}`}
            onItemClick={onItemClickAction}
            className="enter-anim"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="menu__contact-wrapper">
        {isTablet && (
          <div className={"menu__contact contact-comp"}>
            <h3 className={"enter-anim"}>Contact</h3>
            <p className={"enter-anim"}>{email}</p>
            <p className={"enter-anim"}>{phoneNumber}</p>
            <p className={"enter-anim"}>{address}</p>
          </div>
        )}
        <div className={"menu__logo enter-anim"}>
          <Image
            src={"/img/logo-full-dot.svg"}
            alt={"Logo"}
            width={600}
            height={300}
          />
        </div>
      </div>

      <div className={"menu__corner-logo enter-anim"}>
        <Logo />
      </div>
    </section>
  );
}
