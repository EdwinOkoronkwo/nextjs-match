'use client'

import React, {ReactNode} from 'react'
import {HeroUIProvider} from "@heroui/system";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}
