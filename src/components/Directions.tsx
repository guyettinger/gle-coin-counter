"use client"
import styled from "styled-components";

const DirectionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
`

const DirectionsText = styled.div`
  text-align: center;
  margin: 1rem 0;
  width: 80%;

  @media screen and (max-width: 768px) {
      width: 100%;
  }
`

const DirectionsHeader1 = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const DirectionsParagraph = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`

export const Directions = () => {
    return (
        <DirectionsContainer>
            <DirectionsText>
                <DirectionsHeader1>Directions</DirectionsHeader1>
                <DirectionsParagraph>
                    Point your webcam at a set of coins to get a monetary total.
                </DirectionsParagraph>
            </DirectionsText>
        </DirectionsContainer>
    )
}

export default Directions;