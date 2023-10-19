"use client"
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    background-color: #1D1E20;
`

const NavImage = styled(Image)`
    margin: -14px 0
`

const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Navbar = () => {
    return (
        <NavContainer>
            <NavLogo>
                <NavImage src='/avatar.png' className="profile-img" width={48} height={48} alt="Guy's Avatar" />
                <Link href="/">
                    Coin Counter
                </Link>
            </NavLogo>
        </NavContainer>
    )
}

export default Navbar;