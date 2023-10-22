'use client';

import { ReactNode } from "react";
import { StyledComponentsRegistry } from "@/styles/StyledComponentRegistry";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { DarkTheme } from "@/theme/DarkTheme";

export const AppStyleProvider = ({children}: { children: ReactNode }) => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={DarkTheme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}