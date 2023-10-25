import { RoboflowObjectDetection } from "@/services";

export interface RoboflowObjectDetectionCanvasProps {
    width: number
    height: number
    objectDetections: RoboflowObjectDetection[]
}