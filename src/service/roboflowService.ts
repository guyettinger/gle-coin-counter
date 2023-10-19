const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_1eRKBW2DCNhgsk4TWynWYt8bzEI3";
const PROJECT_URL = "coin-detector-jcdoq";
const MODEL_VERSION = "1";
let inferRunning: boolean = false;
let inferModel: any | null = null;

export const getRoboflowInstance = () => {
    const roboflow = (window as any).roboflow;
    return roboflow;
}

export const startInfer = (detectCallback: (model: any) => void) => {
    inferRunning = true;
    const roboflow = getRoboflowInstance();
    roboflow
        .auth({
            publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
        })
        .load({
            model: PROJECT_URL,
            version: MODEL_VERSION,
            onMetadata: function (m: any) {
                console.log("model loaded", m);
            },
        })
        .then((model: any) => {
            inferModel = model;
            setInterval(() => {
                if (inferRunning) {
                    detectCallback(inferModel);
                }
            }, 10);
        });
};

export const stopInfer = () => {
    inferRunning = false;
    if (inferModel) inferModel.teardown();
};