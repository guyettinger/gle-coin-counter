"use client"
import styled from "styled-components";
import Roboflow from "@/components/Roboflow";
import Directions from "@/components/Directions";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%
`

export default function Home() {
    return (
        <HomeContainer>
            <Directions/>
            <Roboflow/>
        </HomeContainer>
    )
}
