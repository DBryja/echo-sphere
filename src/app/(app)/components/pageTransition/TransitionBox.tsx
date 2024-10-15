'use client';

import React from 'react';
import { useTransition } from '@providers/TransitionContext';
import "./transitionBox.scss"

export default function TransitionBox(){
    const { transitionBoxRef } = useTransition();

    return (
        <div
            ref={transitionBoxRef}
            className={"transitionBox initial"}
        />
    );
};