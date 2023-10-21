import { borderRadius, boxShadow, color, spacing, typography } from "./Variables";
import { CoinCounterTheme } from "./Theme.types";

const LightTheme: CoinCounterTheme = {
    borderRadius,
    boxShadow,
    color,
    fonts: {
        family: 'NunitoSans, sans-serif',
    },
    name: 'light',
    spacing,
    typography,
};

export default LightTheme