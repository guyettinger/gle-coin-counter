import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { RoboflowModel, RoboflowObjectDetection } from "@/types/roboflow.types";
import { startInfer } from "@/service/roboflowService";
import Summary from "@/components/Summary";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const RoboflowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const RoboflowContent = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #1D1E20;
`

const RoboflowVideoContent = styled.div`
  position: relative;
`

const RoboflowWebcam = styled(Webcam)`
  position: relative;
  top: 0;
  left: 0;
`

const RoboflowCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`

interface RoboflowProps {
}

const Roboflow = (props: RoboflowProps) => {
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [detections, setDetections] = useState<any>(null)
    const [facingMode, setFacingMode] = useState(FACING_MODE_USER)
    let videoInputCount = 1;
    let videoConstraints: MediaTrackConstraints = {facingMode: facingMode}

    const detect = async (model: RoboflowModel) => {

        const webcam = webcamRef?.current
        if (!webcam) return

        const video = webcam?.video
        if (!video) return

        const canvas = canvasRef?.current
        if (!canvas) return

        // check data is available
        if (video.readyState !== 4) return
        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight

        video.width = videoWidth
        video.height = videoHeight

        let devices = await navigator.mediaDevices.enumerateDevices()
        console.log("devices", devices)
        let videoDevices = devices.filter((device)=>{
            return device.kind === "videoinput"
        })
        videoInputCount = videoDevices.length;

        // adjust the canvas size to match the video
        adjustCanvas(videoWidth, videoHeight)

        //  get detections
        const detections = await model.detect(video)
        console.log('roboflow detected', detections)
        setDetections(detections)

        const canvasContext = canvas.getContext("2d")
        if (!canvasContext) return

        drawBoxes(detections, canvasContext)
    }

    const adjustCanvas = (width: number, height: number) => {
        const canvas = canvasRef?.current
        if (!canvas) return

        canvas.width = width * window.devicePixelRatio
        canvas.height = height * window.devicePixelRatio

        canvas.style.width = width + "px"
        canvas.style.height = height + "px"

        const canvasContext = canvas.getContext("2d")
        if (!canvasContext) return
        canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const drawBoxes = (detections: RoboflowObjectDetection[], canvasContext: CanvasRenderingContext2D) => {
        const canvas = canvasRef?.current
        if (!canvas) return

        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        detections.forEach((row: any) => {
            //video
            let temp = row.bbox
            temp.class = row.class
            temp.color = row.color
            temp.confidence = row.confidence
            row = temp

            if (row.confidence < 0) return

            //dimensions
            let x = row.x - row.width / 2
            let y = row.y - row.height / 2
            let w = row.width
            let h = row.height

            //box
            canvasContext.beginPath()
            canvasContext.lineWidth = 1
            canvasContext.strokeStyle = row.color
            canvasContext.rect(x, y, w, h)
            canvasContext.stroke()

            //shade
            canvasContext.fillStyle = "black"
            canvasContext.globalAlpha = 0.2
            canvasContext.fillRect(x, y, w, h)
            canvasContext.globalAlpha = 1.0

            //label
            let fontColor = "black"
            let fontSize = 12
            canvasContext.font = `${fontSize}px monospace`
            canvasContext.textAlign = "center"
            let classTxt = row.class
            let confTxt = (row.confidence * 100).toFixed().toString() + "%"
            let msgTxt = classTxt + " " + confTxt
            const textHeight = fontSize
            let textWidth = canvasContext.measureText(msgTxt).width

            if (textHeight <= h && textWidth <= w) {
                canvasContext.strokeStyle = row.color
                canvasContext.fillStyle = row.color
                canvasContext.fillRect(
                    x - canvasContext.lineWidth / 2,
                    y - textHeight - canvasContext.lineWidth,
                    textWidth + 2,
                    textHeight + 1
                );
                canvasContext.stroke()
                canvasContext.fillStyle = fontColor
                canvasContext.fillText(msgTxt, x + textWidth / 2 + 1, y - 1)
            } else {
                textWidth = canvasContext.measureText(confTxt).width
                canvasContext.strokeStyle = row.color
                canvasContext.fillStyle = row.color
                canvasContext.fillRect(
                    x - canvasContext.lineWidth / 2,
                    y - textHeight - canvasContext.lineWidth,
                    textWidth + 2,
                    textHeight + 1
                )
                canvasContext.stroke()
                canvasContext.fillStyle = fontColor
                canvasContext.fillText(confTxt, x + textWidth / 2 + 1, y - 1)
            }
        })
    }


    const handleClick = useCallback(() => {
        setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        );
    }, [])

    useEffect(() => {
        startInfer(detect)
    }, []);

    return (
        <RoboflowContainer>
            <RoboflowContent>
                {videoInputCount > 1 && <button onClick={handleClick}>Switch camera</button>}
                <RoboflowVideoContent>
                    <RoboflowWebcam
                        ref={webcamRef}
                        muted={true}
                        videoConstraints={videoConstraints}
                    />
                    <RoboflowCanvas
                        ref={canvasRef}
                    />
                </RoboflowVideoContent>
                {!!detections && <Summary detections={detections}/>}
            </RoboflowContent>
        </RoboflowContainer>
    );
};

export default Roboflow
