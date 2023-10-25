import { ReactNode } from "react";
import { RoboflowLoadParams, RoboflowModel } from "@/services";

export interface RoboflowClient {
    load: (loadParams: RoboflowLoadParams) => Promise<RoboflowModel>
    startInference: (detectCallback: (model: RoboflowModel) => void) => void
    stopInference: () => void
}

export interface RoboflowClientProviderProps {
    children?: ReactNode
}
