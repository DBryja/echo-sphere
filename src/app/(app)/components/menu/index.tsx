"use client";

import "./menu.scss";
import Image from "next/image";
import type {ContactDatum, MenuItem} from "@/payload-types";
import {getImageUrl, getAlt} from "@/app/(app)/utils";
import gsap from "gsap";
import {useEffect, useRef, useState} from "react";

// Create a map to store individual timelines for each item
const itemTimelines: Map<string, gsap.core.Timeline> = new Map();

const animateImage = (imageElement: Element | null, direction: 'in' | 'out', itemName: string) => {
    if (!imageElement) return;

    let timeline = itemTimelines.get(itemName);
    if (!timeline) {
        timeline = gsap.timeline();
        itemTimelines.set(itemName, timeline);
    }
    timeline = timeline!;
    if (direction === 'in') {
        timeline.set(imageElement, { clipPath: 'inset(100% 0 0 0)' })
            .to(imageElement, {
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.8,
                ease: "power2.out",
            });
    } else {
        // Queue the 'out' animation to start after the 'in' animation completes
        timeline.to(imageElement, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                timeline?.clear();
            }
        }, ">")
    }
};

export default function Menu({isOpen, contactData, navItems}:{isOpen:boolean, contactData: ContactDatum, navItems: MenuItem[]}) {
    const {email, "phone-number":phoneNumber, address, socials } = contactData;
    const containerRef = useRef<HTMLElement|null>(null);
    const [itemZIndices, setItemZIndices] = useState<{[key: string]: number}>({});
    const [lastHoveredItem, setLastHoveredItem] = useState<string | null>(null);

    const grantHighestZIndex = (itemName: string) => {
        setLastHoveredItem(itemName);
        setItemZIndices(prevIndices => {
            const highestIndex = Math.max(...Object.values(prevIndices), 0);
            return {...prevIndices, [itemName]: highestIndex + 1};
        });
    };

    useEffect(() => {
        if (lastHoveredItem) {
            setItemZIndices(prevIndices => {
                const newIndices = {...prevIndices};
                Object.keys(newIndices).forEach(key => {
                    if (key !== lastHoveredItem) {
                        newIndices[key] = Math.max(newIndices[key] - 1, 1);
                    }
                });
                return newIndices;
            });
        }
    }, [lastHoveredItem]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            const imageName = target.getAttribute('data-name');
            if (imageName) {
                const imageElement = container.querySelector(`.menu__decor__item[data-item="${imageName}"]`);
                animateImage(imageElement, 'in', imageName);
                grantHighestZIndex(imageName);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            const imageName = target.getAttribute('data-name');
            if (imageName) {
                const imageElement = container.querySelector(`.menu__decor__item[data-item="${imageName}"]`);
                animateImage(imageElement, 'out', imageName);
            }
        };

        navItems.forEach((item) => {
            const linkElement = container.querySelector(`.menu__links a[data-name="${item.name}"]`);
            if (linkElement) {
                linkElement.addEventListener("mouseenter", handleMouseEnter);
                linkElement.addEventListener("mouseleave", handleMouseLeave);
            }
        });

        return () => {
            navItems.forEach((item) => {
                const linkElement = container.querySelector(`.menu__links a[data-name="${item.name}"]`);
                if (linkElement) {
                    linkElement.removeEventListener("mouseenter", handleMouseEnter);
                    linkElement.removeEventListener("mouseleave", handleMouseLeave);
                }
            });
        };
    }, [navItems]);

    return (
        <section className={`menu ${isOpen?"active":""}`} ref={containerRef}>
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
                        style={{zIndex: itemZIndices[item.name] || 1}}
                    />
                ))}
            </div>
            <div className={"menu__links"}>
                {navItems.map((item, index) => (
                    <a className={"subtitle-1"} data-name={item.name} key={index} href={item.path}>{item.name}</a>
                ))}
            </div>
            <div className="menu__contact-wrapper">
                <div className={"menu__contact contact"}>
                    <p>{email}</p>
                    <p>{phoneNumber}</p>
                    <p>{address}</p>
                    <p>
                        {socials?.facebook && <a href={socials.facebook}>Facebook</a>}
                        {socials?.instagram && <a href={socials.instagram}>Instagram</a>}
                        {socials?.youtube && <a href={socials.youtube}>Youtube</a>}
                    </p>
                </div>
                <div className={"menu__logo"}>
                    <Image src={"/img/logo-full-dot.svg"} alt={"Logo"} width={600} height={300}/>
                </div>
            </div>
        </section>
    )
}