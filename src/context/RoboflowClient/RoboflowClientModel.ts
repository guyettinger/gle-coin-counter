import {
    asyncSetInterval,
    RoboflowLoadParams,
    RoboflowModel,
    RoboflowProject
} from "@/services";
import { RoboflowApi } from "@/context/RoboflowApi/RoboflowApi.types";
import { RoboflowClient } from "@/context/RoboflowClient/RoboflowClient.types";

export class RoboflowClientModel implements RoboflowClient {

    private roboflowProject?: RoboflowProject
    private roboflowModel?: RoboflowModel

    private inferInterval?: NodeJS.Timeout
    private inferRunning: boolean = false

    constructor(public roboflowApi: RoboflowApi) {
    }

    load({model, version}: RoboflowLoadParams): Promise<RoboflowModel> {
        const roboflowLoadParams: RoboflowLoadParams = {
            model,
            version,
            onMetadata: (roboflowProject: RoboflowProject) => {
                this.roboflowProject = roboflowProject
                console.log("roboflow project", this.roboflowProject)
            }
        }
        return this.roboflowApi.load(roboflowLoadParams).then((roboflowModel: RoboflowModel) => {
            this.roboflowModel = roboflowModel
            console.log("roboflow model", this.roboflowModel)
            return this.roboflowModel
        })
    }

    startInference(detectCallback: (model: RoboflowModel) => void) {
        this.inferRunning = true
        this.inferInterval = asyncSetInterval(() => {
            if (this.inferRunning && this.roboflowModel) {
                detectCallback(this.roboflowModel);
            }
        }, 10);
    }

    stopInference() {
        this.inferRunning = false
        if (this.inferInterval) {
            clearInterval(this.inferInterval)
        }
        if (this.roboflowModel) {
            this.roboflowModel.teardown()
            this.roboflowModel = undefined
        }
        if (this.roboflowProject) {
            this.roboflowProject = undefined;
        }
    }
}