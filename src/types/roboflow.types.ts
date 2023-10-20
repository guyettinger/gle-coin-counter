export interface RoboflowAuthParams {
    publishable_key: string
}

export interface RoboflowLoadParams {
    model: string,
    version: string,
    onMetadata?: (m: RoboflowProject) => void
}

export interface RoboflowClient {
    VERSION: string
    auth: (authParams: RoboflowAuthParams) => RoboflowClient
    load: (loadParams: RoboflowLoadParams) => Promise<RoboflowModel>
    tf: any
}

export interface RoboflowProject {
    type: string
    name: string
    annotation: string
    classes: string[]
    size: number
    icon: string
}

export interface RoboflowModelConfiguration {
    threshold: number
    overlap?: number
    nms_threshold?: number
    max_objects: number
}

export interface RoboflowModelMetadata {
    threshold: number
    name: string
    type: string
    classes: string[]
    annotation: string
    size: number
}

export interface RoboflowModel {
    configure: (configuration: RoboflowModelConfiguration) => void
    detect: (source: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) => Promise<RoboflowObjectDetection[]>
    getConfiguration: () => RoboflowModelConfiguration
    getMetadata: () => RoboflowModelMetadata
    teardown: () => void
}

export interface RoboflowBoundingBox {
    class: string
    color: string
    confidence: number
    height: number
    width: number
    x: number
    y: number
}

export interface RoboflowObjectDetection {
    bbox: RoboflowBoundingBox
    class: string
    color: string
    confidence: number
}