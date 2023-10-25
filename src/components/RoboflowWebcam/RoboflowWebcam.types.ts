import { ReactNode } from "react";

export interface RoboflowWebcamProps {
    children?: ReactNode
    onInitialized: () => void
    onSizeChange: (width: number, height: number) => void
}