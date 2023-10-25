import { RoboflowLoadParams, RoboflowModel, RoboflowModule } from "@/services/roboflowModule";
import { RoboflowApi } from "@/context/RoboflowApi/RoboflowApi.types";

export class RoboflowApiModel implements RoboflowApi {
    constructor(public roboflowModule: RoboflowModule) {
    }

    load(loadParams: RoboflowLoadParams): Promise<RoboflowModel> {
        return this.roboflowModule.load(loadParams)
    }
}