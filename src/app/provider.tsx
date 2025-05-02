"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { HeroUIProvider } from "@heroui/react";

export function Providers({children}: {children: React.ReactNode}){
    return (
        <ClerkProvider>
            <HeroUIProvider>{children}</HeroUIProvider>
        </ClerkProvider>
    );
}