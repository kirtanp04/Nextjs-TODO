"use client"
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";


export const UIProvider = ({ children }) => {
    return <NextUIProvider>
        <AnimatePresence>
            {children}
        </AnimatePresence>
    </NextUIProvider>
}

