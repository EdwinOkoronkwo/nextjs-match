'use client'

import React, {ReactNode} from 'react'
import {HeroUIProvider} from "@heroui/system";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({children}: {children: ReactNode}) {
    return (
        <HeroUIProvider>
            <ToastContainer position="top-right" hideProgressBar className="z-50"/>
            {children}
        </HeroUIProvider>
    )
}
