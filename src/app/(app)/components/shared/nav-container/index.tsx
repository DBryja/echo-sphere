"use client";
import {useRef, useState, useEffect, useCallback, useLayoutEffect, useMemo} from "react";
import {usePathname} from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import debounce from 'lodash/debounce';
import {useWindowWidth} from "@hooks/useWindowWidth";

import variables from "@globals/_variables.module.scss";

import Nav from "@components/shared/nav";
import HeaderMenuButton from "@components/buttons/menu";
import Menu from "@components/menu";
import OpenCart from "@components/OpenCart";
import {ContactDatum, MenuItem} from "@/payload-types";

gsap.registerPlugin(ScrollTrigger);

export default function NavButtonContainer({navItems, contactData}: {navItems: MenuItem[], contactData: ContactDatum}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const currentTimeline = useRef<GSAPTimeline | null>(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const basketTimeline = useRef<GSAPTimeline | null>(null);
    const breakpoint = useMemo(() => parseInt(variables["bpLg"].replace("px", ""), 10), []);

    const pathname = usePathname();
    const isStore = pathname?.startsWith("/store");
    const isHome = pathname === "/";

    const [showNav, setShowNav] = useState(isHome);

    const windowWidth = useWindowWidth();

    const headerState = useMemo(() =>
            (showNav && windowWidth >= breakpoint) ? "nav" : "button",
        [showNav, windowWidth, breakpoint]);

    const xOffset = 5;
    const stagger = 0.05;

    useEffect(() => {
        setShowNav(isHome)
        setIsMenuOpen(false);
    }, [pathname, isHome]);

    useEffect(() => {
        const headerElement = document.querySelector(".header") as HTMLDivElement;
        if (headerElement) {
            headerElement.dataset.state = headerState;
        }
    }, [headerState]);

    const updateNavVisibility = useCallback((progress: number) => {
        if(!isHome) return;
        setShowNav(progress <= 0.5);
    }, [isHome]);

    const debouncedSetShowNav = useMemo(() =>
            debounce(updateNavVisibility, 50),
        [updateNavVisibility]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    useGSAP(() => {
        if (!container.current || windowWidth < breakpoint) return;
        if(!isHome) return;

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
    }, [debouncedSetShowNav, windowWidth, breakpoint, isHome]);

    useGSAP(() => {
        if (basketTimeline.current) basketTimeline.current.kill();

        const tl = gsap.timeline();
        basketTimeline.current = tl;

        tl.set(".open-cart", {
            opacity: 0,
            right: headerState === "button" ? 24 : 4,
            top: headerState === "button" ? "auto" : 56,
            position: headerState === "button" ? "relative" : "absolute"
        });

        tl.to(".open-cart", {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        }, ">0.3");

        tl.to(".open-cart", {
            right: headerState === "button" ? 24 : 4,
            top: headerState === "button" ? "auto" : 56,
            position: headerState === "button" ? "relative" : "absolute",
            duration: 0.3,
            ease: "power2.inOut"
        }, "<");

        return () => {
            basketTimeline.current?.kill();
        };
    }, { dependencies: [headerState], scope: container });

    useGSAP(() => {
        if (currentTimeline.current) currentTimeline.current.kill();

        const tl = gsap.timeline();
        currentTimeline.current = tl;

        if (windowWidth <= breakpoint || !isHome) {
            if(document.querySelector(".header__nav")){
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
                tl.set(".header__menu", { visibility: "hidden", display: "none" }, ">");
                tl.to(".header__nav", { visibility: "visible", display: "flex" }, "<-0.5");
                tl.to(".header__nav > *", {
                    x: 0,
                    opacity: 1,
                    stagger: -1 * stagger,
                    duration: 0.1,
                    ease: "power2.out",
                }, ">-0.1");
            } else {
                tl.to(".header__nav > *", {
                    x: xOffset,
                    opacity: 0,
                    stagger: stagger,
                    duration: 0.1,
                    ease: "power2.out",
                });
                tl.to(".header__nav", { visibility: "hidden", display: "none" }, ">-0.1");
                tl.to(".header__menu", {
                    x: 0,
                    visibility: "visible",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    display: "flex",
                }, "<");
            }
        }

        return () => {
            currentTimeline.current?.kill();
        };
    }, { dependencies: [showNav, windowWidth, headerState, breakpoint, isHome] });

    return (
        <div ref={container} style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", width: "fit-content" }}>
            {windowWidth >= breakpoint && isHome && <Nav navItems={navItems}/>}
            <OpenCart isStore={isStore}/>
            <Menu isOpen={isMenuOpen} navItems={navItems} contactData={contactData}/>
            <HeaderMenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen}/>
        </div>
    );
}

