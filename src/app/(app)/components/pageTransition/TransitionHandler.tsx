'use client';

import {useEffect, useState} from 'react';
import { useTransition } from '@providers/TransitionContext';
import { usePathname } from 'next/navigation';

export default function TransitionHandler() {
    const { endTransition, transitionBoxRef } = useTransition();
    const pathname = usePathname();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            transitionBoxRef.current?.classList.remove("initial");
            return;
        }
        endTransition();
    }, [pathname, endTransition]);

    return null;
};
