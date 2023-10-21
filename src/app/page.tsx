"use client"
import styled from "styled-components";
import Roboflow from "@/components/Roboflow";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%
`

export default function Home() {
    return (
        <HomeContainer>
            <Roboflow/>
        </HomeContainer>
    )
}
