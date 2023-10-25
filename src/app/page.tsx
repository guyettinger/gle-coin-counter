"use client"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { waitForRoboflowModule } from "@/services/roboflowModule/roboflowModuleService";
import { RoboflowAuthParams } from "@/services";
import { CoinCounter } from "@/components/CoinCounter/CoinCounter";
import { RoboflowApiProvider } from "@/context/RoboflowApi/RoboflowApiContext";
import { RoboflowClientProvider } from "@/context/RoboflowClient/RoboflowClientContext";
import { Loading } from "@/components/Loading";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%
`

// Roboflow authorization
const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_1eRKBW2DCNhgsk4TWynWYt8bzEI3"
const roboflowAuthParams: RoboflowAuthParams = {
    publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY
}

// Detection model
const coinCounterDetectionModel = "coin-detector-jcdoq"
const coinCounterDetectionModelVersion = "1"

export default function Home() {
    const [roboflowReady, setRoboflowReady] = useState(false)

    useEffect(() => {
        waitForRoboflowModule().then(() => {
            setRoboflowReady(true)
        })
    }, []);

    return (
        <HomeContainer>
            {roboflowReady &&
                <RoboflowApiProvider roboflowAuthParams={roboflowAuthParams}>
                    <RoboflowClientProvider>
                        <CoinCounter coinCounterDetectionModel={coinCounterDetectionModel}
                                     coinCounterDetectionModelVersion={coinCounterDetectionModelVersion}
                        />
                    </RoboflowClientProvider>
                </RoboflowApiProvider>
            }
            {!roboflowReady &&
                <Loading/>
            }
        </HomeContainer>
    )
}
