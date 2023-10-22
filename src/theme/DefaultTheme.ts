import { createStyledBreakpointsTheme } from 'styled-breakpoints';
import { CoinCounterTheme } from "./Theme.types";
import { LightTheme } from "./LightTheme";

export const DefaultTheme: CoinCounterTheme = {
    ...LightTheme,
    ...createStyledBreakpointsTheme()
}