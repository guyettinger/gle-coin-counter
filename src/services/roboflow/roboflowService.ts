import { RoboflowClient, RoboflowModel, RoboflowProject } from "@/services/roboflow/roboflowService.types";
import { asyncSetInterval } from "@/services/async/asyncService";

// configuration
const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_1eRKBW2DCNhgsk4TWynWYt8bzEI3"
const PROJECT_URL = "coin-detector-jcdoq"
const MODEL_VERSION = "1"

// service state
let inferRunning: boolean = false
let roboflowProject: RoboflowProject | null = null
let roboflowModel: RoboflowModel | null = null
let inferInterval: NodeJS.Timeout;

export const getRoboflowInstance = (): RoboflowClient => {
    const roboflowClient = (window as any).roboflow as RoboflowClient
    console.log('roboflow client', roboflowClient)
    return roboflowClient;
}

export const startInference = (detectCallback: (model: RoboflowModel) => void) => {
    inferRunning = true;
    const roboflow = getRoboflowInstance();
    roboflow
        .auth({
            publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
        })
        .load({
            model: PROJECT_URL,
            version: MODEL_VERSION,
            onMetadata: function (project: RoboflowProject) {
                roboflowProject = project
                console.log("roboflow project", project);
            },
        })
        .then((model: RoboflowModel) => {
            roboflowModel = model;
            console.log("roboflow model", model)
            inferInterval = asyncSetInterval(() => {
                if (inferRunning && roboflowModel) {
                    detectCallback(roboflowModel);
                }
            }, 10);
        })
}

export const stopInference = () => {
    inferRunning = false
    if (inferInterval) {
        clearInterval(inferInterval)
    }
    if (roboflowModel) {
        roboflowModel.teardown()
        roboflowModel = null
    }
    if (roboflowProject) {
        roboflowProject = null;
    }
}