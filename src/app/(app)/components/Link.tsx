'use client';

import React from "react";
import NextLink, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from '@providers/TransitionContext';

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode,
    onItemClick?: ()=>void
}
const comparePaths = (pathname, href) => {
    const normalize = (path) => path.replace(/^\/+/, '');
    const hrefPath = typeof href === 'string' ? href : href.pathname || '';
    return normalize(pathname) === normalize(hrefPath);
};

export default function Link({ children, onItemClick, ...props }:CustomLinkProps){
    const router = useRouter();
    const { startTransition, transitionDuration } = useTransition();
    const pathname = usePathname();
    const {href} = {...props};
    const arePathsEqual = comparePaths(pathname, href);

    const handleClick = () => {
        startTransition();
        setTimeout(() => {
            router.push(props.href.toString());
        }, transitionDuration*1000); // Adjust this timing to match your transition duration
    };

    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        e.preventDefault();
        if(arePathsEqual && onItemClick){
            onItemClick();
            return;
        }
        handleClick();
    }

    return (<NextLink {...props} onClick={onClick}>{children}</NextLink>);
};