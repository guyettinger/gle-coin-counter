"use client"

import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  background-color: #1D1E20;
`;

const FooterParagraph = styled.p`
  font-size: 0.8rem;
  color: #9B9C9D;
`

const FooterIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 1rem;
`

const FooterLink = styled.a`
  color: #9B9C9D;
  font-size: 1.5rem;
  transition: all 0.5s ease-in-out;

  &:hover {
    color: #DADADB;
  }
`

export const Footer = () => {
    return (
        <>
            <FooterContainer>
                <FooterParagraph>
                    © {new Date().getFullYear()} Guy Ettinger
                </FooterParagraph>
                <FooterIcon>
                    <FooterLink
                        href="https://github.com/guyettinger"
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa-brands fa-github"></i>
                    </FooterLink>
                    <FooterLink
                        href="https://www.linkedin.com/in/guyettinger/"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa-brands fa-linkedin"></i>
                    </FooterLink>
                </FooterIcon>
            </FooterContainer>
        </>
    )
}