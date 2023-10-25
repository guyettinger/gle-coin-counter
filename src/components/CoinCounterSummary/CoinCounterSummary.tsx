"use client"
import styled from "styled-components";
import { RoboflowObjectDetection } from "@/services/roboflowModule/roboflowModuleService.types";
import { CoinCounterSummaryProps } from "@/components/CoinCounterSummary/CoinCounterSummary.types";

const CoinCounterSummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const CoinCounterSummaryText = styled.div`
  text-align: center;
  margin: 1rem 0;
  width: 80%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const CoinCounterSummaryHeader1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const CoinCounterSummaryParagraph = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
`

export const CoinCounterSummary = ({detections}: CoinCounterSummaryProps) => {
    let pennies = 0;
    let nickels = 0;
    let dimes = 0;
    let quarters = 0;
    let total = 0;

    if (detections) {
        detections.forEach((detection: RoboflowObjectDetection) => {
            const detectionClass = detection.class
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
        <CoinCounterSummaryContainer>
            <CoinCounterSummaryText>
                <CoinCounterSummaryHeader1>
                    Summary
                </CoinCounterSummaryHeader1>
                <CoinCounterSummaryParagraph>
                    {pennies} Pennies
                </CoinCounterSummaryParagraph>
                <CoinCounterSummaryParagraph>
                    {nickels} Nickels
                </CoinCounterSummaryParagraph>
                <CoinCounterSummaryParagraph>
                    {dimes} Dimes
                </CoinCounterSummaryParagraph>
                <CoinCounterSummaryParagraph>
                    {quarters} Quarters
                </CoinCounterSummaryParagraph>
                <CoinCounterSummaryParagraph>
                    ${total.toFixed(2)} Total
                </CoinCounterSummaryParagraph>
            </CoinCounterSummaryText>
        </CoinCounterSummaryContainer>
    )
}