import { useEffect, useState, forwardRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components"
import { Button } from "gle-components";
import { useActiveBreakpoints, useForwardRef } from "@/hooks";
import { asyncSetInterval } from "@/services/async/asyncService";
import { FACING_MODE_USER, VideoInputMode } from "@/services/mediaDevice/mediaDeviceService.types";
import { getVideoInputModes } from "@/services/mediaDevice/mediaDeviceService";
import { RoboflowWebcamProps } from "@/components/RoboflowWebcam/RoboflowWebcam.types";

const RoboflowWebcamContent = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #1D1E20;
  border-radius: 4px;
`

const RoboflowWebcamToolbar = styled.div`
  margin-bottom: 10px;
`

const RoboflowWebcamVideoContent = styled.div`
  position: relative;
`

const RoboflowWebcamWebcam = styled(Webcam)`
  position: relative;
  top: 0;
  left: 0;
`

const RoboflowWebcamButton = styled(Button)`
  float: right;
`

const RoboflowWebcamLabel = styled.span`
  font-size: 12px;
  line-height: 1;
`

export const RoboflowWebcam = forwardRef<Webcam, RoboflowWebcamProps>((
    {
        children,
        onInitialized,
        onSizeChange
    }, ref) => {
    const webcamRef = useForwardRef<Webcam>(ref)
    const [videoInitialized, setVideoInitialized] = useState<boolean>(false)
    const [videoInputModes, setVideoInputModes] = useState<VideoInputMode[]>([])
    const [videoInputMode, setVideoInputMode] = useState<VideoInputMode | null>(null)

    // determine screen size
    const {isXs, isSm, isMd, isLg, isXl, isXxl} = useActiveBreakpoints()

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
        width: {max: constraintWidth},
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
                onInitialized()
            }

            // done initializing
            clearInterval(initializeInterval)

        }, 100);
    }

    const detect = async () => {
        const webcam = webcamRef?.current
        if (!webcam) return

        const video = webcam?.video
        if (!video) return

        // check data is available
        if (video.readyState !== 4) return

        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight

        if (video.width !== videoWidth || video.height !== videoHeight) {
            video.width = videoWidth
            video.height = videoHeight
            onSizeChange(videoWidth, videoHeight)
        }
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
            let detectInterval = asyncSetInterval(async () => {
                await detect()
            }, 10)
        }
    }, [videoInitialized])

    return (
        <RoboflowWebcamContent>
            <RoboflowWebcamToolbar>
                {videoInputMode &&
                    <RoboflowWebcamLabel>
                        {videoInputMode.label}
                    </RoboflowWebcamLabel>}
                {videoInputModeCount > 1 &&
                    <RoboflowWebcamButton
                        variant={"small"}
                        primary={true}
                        onClick={handleSwitchVideoModeClick}>
                        Switch camera
                    </RoboflowWebcamButton>}
            </RoboflowWebcamToolbar>
            <RoboflowWebcamVideoContent>
                <RoboflowWebcamWebcam
                    ref={webcamRef}
                    muted={true}
                    width={constraintWidth}
                    height={constraintHeight}
                    videoConstraints={videoConstraints}
                />
                {children}
            </RoboflowWebcamVideoContent>
        </RoboflowWebcamContent>
    )
})
