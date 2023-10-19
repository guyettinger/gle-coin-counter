'use client';

import { ReactNode } from "react";
import { ThemeProvider } from 'styled-components';
import StyledComponentsRegistry from "@/styles/StyledComponentRegistry";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";

const AppStyleProvider = ({children}: { children: ReactNode }) => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default AppStyleProvider