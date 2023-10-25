import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components"
import {
    RoboflowLoadParams,
    RoboflowModel,
    RoboflowObjectDetection
} from "@/services/roboflowModule/roboflowModuleService.types";
import { useRoboflowClientContext } from "@/context/RoboflowClient/RoboflowClientContext";
import { RoboflowWebcam } from "@/components/RoboflowWebcam";
import { RoboflowObjectDetectionCanvas } from "@/components/RoboflowObjectDetectionCanvas";
import { CoinCounterSummary } from "@/components/CoinCounterSummary/CoinCounterSummary";
import { CoinCounterProps } from "@/components/CoinCounter/CoinCounter.types";

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

const CoinCounterVideoContent = styled.div`
  position: relative;
`

export const CoinCounter = ({coinCounterDetectionModel, coinCounterDetectionModelVersion}: CoinCounterProps) => {
    const webcamRef = useRef<Webcam>(null)
    const [objectDetections, setObjectDetections] = useState<RoboflowObjectDetection[]>([])
    const [webcamInitialized, setWebcamInitialized] = useState<boolean>(false)
    const [webcamWidth, setWebcamWidth] = useState(0)
    const [webcamHeight, setWebcamHeight] = useState(0)
    const roboflowClient = useRoboflowClientContext()
    const isReadyForCanvas = (webcamInitialized && webcamWidth > 0 && webcamHeight > 0)

    const detect = async (model: RoboflowModel) => {
        if (!webcamInitialized) return

        const webcam = webcamRef.current
        if (!webcam) return

        const video = webcam.video
        if (!video) return

        //  get detections
        try {
            const detections = await model.detect(video)
            console.log('roboflow detected', detections)
            setObjectDetections(detections)
        } catch (e) {
            const error = e as Error
            if(!error) return
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (webcamInitialized) {
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
    }, [webcamInitialized])

    const handleRoboflowWebcamInitialized = () => {
        setWebcamInitialized(true)
        console.log('roboflow webcam initialized')
    }

    const handleRoboflowWebcamSizeChange = (width: number, height: number) => {
        setWebcamWidth(width)
        setWebcamHeight(height)
        console.log('roboflow webcam size change', width, height)
    }

    return (
        <CoinCounterContainer>
            <CoinCounterContent>
                <CoinCounterVideoContent>
                    <RoboflowWebcam
                        ref={webcamRef}
                        onInitialized={handleRoboflowWebcamInitialized}
                        onSizeChange={handleRoboflowWebcamSizeChange}
                    >
                        {isReadyForCanvas &&
                            <RoboflowObjectDetectionCanvas
                                width={webcamWidth}
                                height={webcamHeight}
                                objectDetections={objectDetections}
                            />
                        }
                    </RoboflowWebcam>
                </CoinCounterVideoContent>
                {!!objectDetections && <CoinCounterSummary detections={objectDetections}/>}
            </CoinCounterContent>
        </CoinCounterContainer>
    )
}
