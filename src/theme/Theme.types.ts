import { ReactNode } from "react";
import { DefaultTheme } from "styled-components";
import { spacing, color, borderRadius, boxShadow, typography } from "./Variables";

declare module 'styled-components' {
    export interface DefaultTheme {
        name: string
        fonts: {
            family: string
        }
        spacing: typeof spacing
        color: typeof color
        borderRadius: typeof borderRadius
        boxShadow: typeof boxShadow
        typography: typeof typography
    }
}

export interface CoinCounterTheme extends DefaultTheme {
}

export interface CoinCounterThemeProviderProps {
    theme: CoinCounterTheme
    children: ReactNode
}