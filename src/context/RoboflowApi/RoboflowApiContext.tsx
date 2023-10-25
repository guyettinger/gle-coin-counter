import { createContext, useContext } from "react";
import { initializeRoboflowApi } from "@/services/roboflowModule/roboflowModuleService";
import { RoboflowApi, RoboflowApiProviderProps } from "@/context/RoboflowApi/RoboflowApi.types";

export const RoboflowApiContext = createContext<RoboflowApi | null>(null)

export const useRoboflowApiContext = () => {
    const roboflowApi = useContext(RoboflowApiContext)
    if (!roboflowApi) {
        throw new Error('useRoboflowApiContext must be used within a RoboflowApiProvider.')
    }
    return roboflowApi
}

export const RoboflowApiProvider = ({roboflowAuthParams, children}: RoboflowApiProviderProps) => {
    const roboflowApi = initializeRoboflowApi(roboflowAuthParams)
    return (
        <RoboflowApiContext.Provider value={roboflowApi}>
            {children}
        </RoboflowApiContext.Provider>
    )
}
