import { createContext, useContext } from "react";
import { useRoboflowApiContext } from "@/context/RoboflowApi/RoboflowApiContext";
import { RoboflowClientModel } from "@/context/RoboflowClient/RoboflowClientModel";

import { RoboflowClient, RoboflowClientProviderProps } from "@/context/RoboflowClient/RoboflowClient.types";

export const RoboflowClientContext = createContext<RoboflowClient | null>(null)

export const useRoboflowClientContext = () => {
    const roboflowClient = useContext(RoboflowClientContext)
    if (!roboflowClient) {
        throw new Error('useRoboflowClientContext must be used within a RoboflowClientProvider.')
    }
    return roboflowClient
}

export const RoboflowClientProvider = ({children}: RoboflowClientProviderProps) => {
    const roboflowApi = useRoboflowApiContext()
    const roboflowClient = new RoboflowClientModel(roboflowApi)
    return (
        <RoboflowClientContext.Provider value={roboflowClient}>
            {children}
        </RoboflowClientContext.Provider>
    )
}
