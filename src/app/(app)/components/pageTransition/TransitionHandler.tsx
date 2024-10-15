'use client';

import { useEffect } from 'react';
import { useTransition } from '@providers/TransitionContext';
import { usePathname } from 'next/navigation';

export default function TransitionHandler() {
    const { endTransition } = useTransition();
    const pathname = usePathname();

    useEffect(() => {
        endTransition();
    }, [pathname, endTransition]);

    return null;
};
