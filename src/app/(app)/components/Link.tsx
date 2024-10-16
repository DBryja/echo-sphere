'use client';

import React from "react";
import NextLink, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from '@providers/TransitionContext';

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode,
}

export default function Link({ children, ...props }:CustomLinkProps){
    const router = useRouter();
    const { startTransition, transitionDuration } = useTransition();
    const pathname = usePathname();
    const {href, className} = props;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        startTransition();
        setTimeout(() => {
            router.push(props.href.toString());
        }, 500); // Adjust this timing to match your transition duration
    };

    return (
        pathname === href
            ? <span className={className}>{children}</span>
            : <NextLink {...props} onClick={handleClick}>{children}</NextLink>
    );
};