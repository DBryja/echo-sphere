"use client";
import {useRef, useState, useEffect, useCallback, Suspense} from "react";
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
    const [showNav, setShowNav] = useState(true);
    const container = useRef<HTMLDivElement | null>(null);
    const currentTimeline = useRef<gsap.core.Timeline | null>(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const basketTimeline =useRef<gsap.core.Timeline | null>(null);
    const breakpoint = parseInt(variables["bpLg"].replace("px", ""), 10);
    const pathname = usePathname();
    const isStore = pathname?.startsWith("/store");


    const headerElement = useRef<HTMLElement|null>(null);
    const [headerState, setHeaderState] = useState<"nav"|"button">("nav");

    const windowWidth = useWindowWidth();

    const xOffset = 5;
    const stagger = 0.05;

    // Set the header element reference
    useEffect(() => {
        headerElement.current = document.querySelector(".header");
    }, []);
    // Update the header state based on the window width
    useEffect(() => {
        if (!headerElement.current) return;
        const newState = (showNav && windowWidth >= breakpoint && !isStore) ? "nav" : "button";
        if (headerState !== newState) {
            headerElement.current.dataset.state = newState;
            setHeaderState(newState);
        }
    }, [showNav, windowWidth, headerState, isStore, breakpoint]);
    // Update the header state to button if on store path
    useEffect(() => {
        const newState = (showNav && windowWidth >= breakpoint && !isStore) ? "nav" : "button";
        setHeaderState(newState);
    }, [pathname, showNav, windowWidth, isStore, breakpoint]);

    //Cart change position animation
    useGSAP(()=>{
        if (basketTimeline.current)
            basketTimeline.current.kill();

        let tl = gsap.timeline();
        basketTimeline.current = tl;

        tl.set(".open-cart", {
            opacity: 0,
            right: headerState === "button" ? 24 : 4,
            top: headerState === "button" ? "auto" : 56,
            position: headerState === "button" ? "relative" : "absolute"
        });
        // Animate opacity
        tl.to(".open-cart", {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        }, ">0.3");
        // Update position based on headerState
        tl.to(".open-cart", {
            right: headerState === "button" ? 24 : 4,
            top: headerState === "button" ? "auto" : 56,
            position: headerState === "button" ? "relative" : "absolute",
            duration: 0.3,
            ease: "power2.inOut"
        }, "<");

        return () => {
            if (basketTimeline.current)
                basketTimeline.current.kill();
        }
    }, {dependencies: [headerState], scope: container})

    const updateNavVisibility = useCallback((progress: number) => {
        setShowNav(progress <= 0.5);
    }, []);

    const debouncedSetShowNav = useCallback(
        debounce(updateNavVisibility, 50),
        [updateNavVisibility]
    );

    const toggleMenu=()=>{
        setIsMenuOpen((prev)=>!prev);
    }

    // Create the scroll trigger for the header
    useGSAP(() => {
        if (!container.current) return;
        if(windowWidth < breakpoint) return;

        scrollTriggerInstance.current = ScrollTrigger.create({
            trigger: "body",
            start: "150px 100px",
            end: "+=0",
            onUpdate: (self) => {
                debouncedSetShowNav(self.progress);
            },
        });

        return () => {
            if (scrollTriggerInstance.current) {
                scrollTriggerInstance.current.kill();
            }
            debouncedSetShowNav.cancel();
        };
    }, {dependencies:[debouncedSetShowNav, windowWidth, headerState]});

    // Create the animation for the header
    useGSAP(() => {
        // Kill the previous timeline if it exists
        if (currentTimeline.current) {
            currentTimeline.current.kill();
        }
        // Create a new timeline
        let tl = gsap.timeline();
        currentTimeline.current = tl;

        // Ensure the menu button is always visible for small screens
        if(windowWidth <= breakpoint || isStore){
            if(document.querySelector(".header__nav")){
                tl.to(".header__nav", {
                    visibility: "hidden",
                    display: "none",
                });
            }
            tl.to(".header__menu", {
                x: 0,
                visibility: "visible",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                display: "flex",
            });
        }
        else {
            if (showNav) {
                tl.to(".header__menu", {
                    x: xOffset,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
                tl.set(".header__menu", {
                    visibility: "hidden",
                    display: "none",
                }, ">");
                tl.to(".header__nav", {
                    visibility: "visible",
                    display: "flex",
                }, "<-0.5");
                tl.to(".header__nav > *", {
                    x: 0,
                    opacity: 1,
                    stagger: -1*stagger,
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
                tl.to(".header__nav", {
                    visibility: "hidden",
                    display: "none",
                }, ">-0.1");
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
            if (currentTimeline.current) {
                currentTimeline.current.kill();
            }
        };
    }, {dependencies:[showNav, windowWidth, headerState]});

    return (
        <div ref={container} style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", width: "fit-content" }}>
            {windowWidth >= breakpoint && !isStore && <Nav navItems={navItems}/>}
            <OpenCart isStore={isStore}/>
            <Menu isOpen={isMenuOpen} navItems={navItems} contactData={contactData}/>
            <HeaderMenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen}/>
        </div>
    );
}