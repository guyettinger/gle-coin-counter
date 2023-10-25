import { useMediaQuery } from "styled-breakpoints/use-media-query";
import { useTheme } from "styled-components";
import { ActiveBreakpoints } from "@/hooks/ActiveBreakpoints/ActiveBreakpoints.types";

export const useActiveBreakpoints = (): ActiveBreakpoints => {

    // determine screen size
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only("xs"))
    const isSm = useMediaQuery(theme.breakpoints.only("sm"))
    const isMd = useMediaQuery(theme.breakpoints.only("md"))
    const isLg = useMediaQuery(theme.breakpoints.only("lg"))
    const isXl = useMediaQuery(theme.breakpoints.only("xl"))
    const isXxl = useMediaQuery(theme.breakpoints.only("xxl"))

    return {
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        isXxl
    }
}