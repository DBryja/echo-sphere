'use client';

import React from 'react';
import { useTransition } from '@providers/TransitionContext';
import colors from "@globals/_colors.module.scss"

export default function TransitionBox(){
    const { transitionBoxRef } = useTransition();

    return (
        <div
            ref={transitionBoxRef}
            style={{
                position: 'fixed',
                top: '100%',
                left: 0,
                right: 0,
                bottom: '-100%',
                background: colors["gray400"], // Adjust color as needed
                zIndex: 0,
            }}
        />
    );
};