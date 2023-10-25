import { RoboflowAuthParams, RoboflowModule } from "@/services/roboflowModule/roboflowModuleService.types";
import { RoboflowApiModel } from "@/context/RoboflowApi/RoboflowApiModel";

// service state
let roboflowApi: RoboflowApiModel | null

const getRoboflowModule = (): RoboflowModule => {
    return (window as any).roboflow as RoboflowModule
}

export const waitForRoboflowModule = (): Promise<void> => {
    return new Promise<void>(resolve => {
        const waitInterval = setTimeout(() => {
            const roboflowModule = getRoboflowModule()
            if (roboflowModule) {
                clearInterval(waitInterval)
                console.log('roboflow module available', roboflowModule)
                resolve()
            }
        }, 10)
    })
}

export const initializeRoboflowApi = (roboflowAuthParams: RoboflowAuthParams): RoboflowApiModel => {
    if (!roboflowApi) {
        const roboflowModule = getRoboflowModule()
        roboflowModule.auth(roboflowAuthParams)
        roboflowApi = new RoboflowApiModel(roboflowModule)
        console.log('roboflow api initialized', roboflowApi)
    }
    return roboflowApi
}