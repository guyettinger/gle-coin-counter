import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { CoinCounterThemeProviderProps } from "./Theme.types";
import DefaultTheme from "./DefaultTheme";

const ThemeProvider = ({theme, children}: CoinCounterThemeProviderProps) => {
    const coinCounterTheme = Object.assign({}, DefaultTheme, theme)
    return (
        <StyledComponentsThemeProvider theme={coinCounterTheme}>
            {children}
        </StyledComponentsThemeProvider>
    );
}

export default ThemeProvider