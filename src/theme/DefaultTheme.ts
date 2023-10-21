import { createStyledBreakpointsTheme } from 'styled-breakpoints';
import { CoinCounterTheme } from "./Theme.types";
import LightTheme from "./LightTheme";

const DefaultTheme: CoinCounterTheme = {
    ...LightTheme,
    ...createStyledBreakpointsTheme(),
};

export default DefaultTheme