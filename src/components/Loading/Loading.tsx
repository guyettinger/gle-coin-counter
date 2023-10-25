import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 100dvh;
  padding-top: 1rem;
`

export const Loading = () => {
    return (
        <LoadingContainer>
            <h2>🌀 Loading...</h2>
        </LoadingContainer>
    )
}