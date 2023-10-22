import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { GLEComponentDefaultTheme, GLEComponentThemeProvider } from "gle-components";
import { CoinCounterThemeProviderProps } from "./Theme.types";
import { DefaultTheme } from "./DefaultTheme";

export const ThemeProvider = ({theme, children}: CoinCounterThemeProviderProps) => {
    const coinCounterTheme = Object.assign({}, DefaultTheme, theme)
    return (
        <StyledComponentsThemeProvider theme={coinCounterTheme}>
            <GLEComponentThemeProvider theme={GLEComponentDefaultTheme}>
                {children}
            </GLEComponentThemeProvider>
        </StyledComponentsThemeProvider>
    )
}