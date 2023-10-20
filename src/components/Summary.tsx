"use client"
import styled from "styled-components";

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
`

const SummaryText = styled.div`
  text-align: center;
  margin: 1rem 0;
  width: 80%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const SummaryHeader1 = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const SummaryParagraph = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`

export interface SummaryProps {
    detections: any
}

export const Summary = ({detections}: SummaryProps) => {
    let pennies = 0;
    let nickels = 0;
    let dimes = 0;
    let quarters = 0;
    let total = 0;

    if (detections) {
        detections.forEach((detection: any) => {
            const detectionClass = detection?.class
            if (!detectionClass) return
            switch (detectionClass) {
                case "Penny":
                    pennies++
                    break;
                case "Nickel":
                    nickels++
                    break;
                case "Dime":
                    dimes++
                    break;
                case "Quarter":
                    quarters++
                    break;
            }
        })
        total = ((pennies) + (nickels * 5) + (dimes * 10) + (quarters * 25)) / 100;
    }

    return (
        <SummaryContainer>
            <SummaryText>
                <SummaryHeader1>Summary</SummaryHeader1>
                <SummaryParagraph>
                    {pennies} Pennies
                </SummaryParagraph>
                <SummaryParagraph>
                    {nickels} Nickels
                </SummaryParagraph>
                <SummaryParagraph>
                    {dimes} Dimes
                </SummaryParagraph>
                <SummaryParagraph>
                    {quarters} Quarters
                </SummaryParagraph>
                <SummaryParagraph>
                    ${total} Total
                </SummaryParagraph>
            </SummaryText>
        </SummaryContainer>
    )
}

export default Summary;