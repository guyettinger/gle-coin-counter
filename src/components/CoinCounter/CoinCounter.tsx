import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import styled, { useTheme } from "styled-components";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import { Button } from "gle-components";
import { asyncSetInterval } from "@/services/async/asyncService";
import {
    RoboflowLoadParams,
    RoboflowModel,
    RoboflowObjectDetection
} from "@/services/roboflowModule/roboflowModuleService.types";
import { FACING_MODE_USER, VideoInputMode } from "@/services/mediaDevice/mediaDeviceService.types";
import { getVideoInputModes } from "@/services/mediaDevice/mediaDeviceService";
import { CoinCounterSummary } from "@/components/CoinCounterSummary/CoinCounterSummary";
import { CoinCounterProps } from "@/components/CoinCounter/CoinCounter.types";
import { useRoboflowClientContext } from "@/context/RoboflowClient/RoboflowClientContext";

// configuration
const MODEL_URL = "coin-detector-jcdoq"
const MODEL_VERSION = "1"

const CoinCounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
`

const CoinCounterContent = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #1D1E20;
  border-radius: 4px;
`

const CoinCounterToolbar = styled.div`
  margin-bottom: 10px;
`

const CoinCounterVideoContent = styled.div`
  position: relative;
  background: black;
`

const CoinCounterWebcam = styled(Webcam)`
  position: relative;
  top: 0;
  left: 0;
`

const CoinCounterCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`

const CoinCounterButton = styled(Button)`
  float: right;
`

const CoinCounterLabel = styled.span`
  font-size: 12px;
  line-height: 1;
`


export const CoinCounter = ({coinCounterDetectionModel, coinCounterDetectionModelVersion}: CoinCounterProps) => {
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [objectDetections, setObjectDetections] = useState<RoboflowObjectDetection[]>([])
    const [videoInitialized, setVideoInitialized] = useState<boolean>(false)
    const [videoInputModes, setVideoInputModes] = useState<VideoInputMode[]>([])
    const [videoInputMode, setVideoInputMode] = useState<VideoInputMode | null>(null)
    const roboflowClient = useRoboflowClientContext()

    // determine screen size
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only("xs"))
    const isSm = useMediaQuery(theme.breakpoints.only("sm"))
    const isMd = useMediaQuery(theme.breakpoints.only("md"))
    const isLg = useMediaQuery(theme.breakpoints.only("lg"))
    const isXl = useMediaQuery(theme.breakpoints.only("xl"))
    const isXxl = useMediaQuery(theme.breakpoints.only("xxl"))

    // determine optimal video constraints dimensions
    let constraintWidth = 640
    let constraintHeight = 480

    if (isXs || isSm) {
        constraintWidth = 320
        constraintHeight = 240
    } else if (isMd || isLg) {
        constraintWidth = 576
        constraintHeight = 432
    } else if (isXl || isXxl) {
        constraintWidth = 640
        constraintHeight = 480
    }

    // video constraints based on current video input mode
    let videoConstraints: MediaTrackConstraints = {
        facingMode: FACING_MODE_USER,
        width: { max: constraintWidth},
        height: {max: constraintHeight}
    }

    if (videoInputMode) {
        videoConstraints.deviceId = videoInputMode.deviceId
        videoConstraints.facingMode = videoInputMode.facingMode
    }

    // count of available video input modes
    let videoInputModeCount = videoInputModes.length

    const initializeVideo = () => {

        let initializingVideo = false

        let initializeInterval = asyncSetInterval(async () => {
            const webcam = webcamRef?.current
            if (!webcam) return

            const video = webcam?.video
            if (!video) return

            const canvas = canvasRef?.current
            if (!canvas) return

            // check data is available
            if (video.readyState !== 4) return

            // return if already initialized
            if (videoInitialized) return

            // return if initializing
            if (!initializingVideo) {
                console.log("initializing video")
                initializingVideo = true

                // get all video input devices
                const allVideoInputModes = await getVideoInputModes()

                // default to first video input mode
                const defaultVideoInputMode = allVideoInputModes[0]

                // set all video input modes
                console.log("initializing video input modes", allVideoInputModes)
                setVideoInputModes(allVideoInputModes)

                // set the default video input mode
                console.log("initializing default video input mode", defaultVideoInputMode)
                setVideoInputMode(defaultVideoInputMode)

                // set video input modes initialized
                console.log("initialized video")
                setVideoInitialized(true)
            }

            // done initializing
            clearInterval(initializeInterval)

        }, 100);
    }

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

        // adjust the canvas size to match the video
        adjustCanvas(videoWidth, videoHeight)

        //  get detections
        const detections = await model.detect(video)
        console.log('roboflow detected', detections)
        setObjectDetections(detections)

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

    const toggleVideoMode = () => {
        if (!videoInputModes) return
        if (!videoInputMode) return
        const videoInputModeIndex = videoInputModes.indexOf(videoInputMode)
        let nextVideoInputModeIndex = videoInputModeIndex + 1
        if (nextVideoInputModeIndex >= videoInputModes.length) {
            nextVideoInputModeIndex = 0
        }
        const nextVideoInputMode = videoInputModes.at(nextVideoInputModeIndex)
        if (!nextVideoInputMode) return;
        setVideoInputMode(nextVideoInputMode)
    }

    const handleSwitchVideoModeClick = () => {
        toggleVideoMode()
    }

    useEffect(() => {
        if (!videoInitialized) {
            // initialize
            initializeVideo()
        } else {
            // load the model
            const roboflowLoadParams: RoboflowLoadParams = {
                model: coinCounterDetectionModel,
                version: coinCounterDetectionModelVersion
            }
            roboflowClient.load(roboflowLoadParams).then(() => {
                // start inference
                roboflowClient.startInference(detect)
            })

        }
    }, [videoInitialized])

    return (
        <CoinCounterContainer>
            <CoinCounterContent>
                <CoinCounterToolbar>
                    {videoInputMode && <CoinCounterLabel>{videoInputMode.label}</CoinCounterLabel>}
                    {videoInputModeCount > 1 &&
                        <CoinCounterButton variant={"small"} primary={true} onClick={handleSwitchVideoModeClick}>Switch
                            camera</CoinCounterButton>}
                </CoinCounterToolbar>
                <CoinCounterVideoContent style={{width:constraintWidth, height:constraintHeight}}>
                    <CoinCounterWebcam
                        ref={webcamRef}
                        muted={true}
                        width={constraintWidth}
                        height={constraintHeight}
                        videoConstraints={videoConstraints}
                    />
                    <CoinCounterCanvas
                        ref={canvasRef}
                    />
                </CoinCounterVideoContent>
                {!!objectDetections && <CoinCounterSummary detections={objectDetections}/>}
            </CoinCounterContent>
        </CoinCounterContainer>
    )
}