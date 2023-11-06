"use client"
import { useState } from "react";
import { MdHelp } from "react-icons/md";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeading,
    PopoverTrigger
} from "gle-components";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px 1rem 0;
  color: #efefef;
  background-color: #1D1E20;
`

const NavImage = styled(Image)`
  margin: -14px 0
`

const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const HelpPopoverContent = styled(PopoverContent)`
  color: black;
`

const HelpIcon = styled(MdHelp)`
  font-size: 32px;
  margin-right: 4px;
  vertical-align: text-top;
  
  &:hover {
    color: white;
  }
`

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <NavContainer>
            <NavLogo>
                <NavImage src='./images/avatar.png' className="profile-img" width={48} height={48} alt="Guy's Avatar"/>
                <Link href="/">
                    Coin Counter
                </Link>
            </NavLogo>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild={true} onClick={() => setOpen((v) => !v)}>
                    <span><HelpIcon/></span>
                </PopoverTrigger>
                <HelpPopoverContent>
                    <PopoverHeading>Directions</PopoverHeading>
                    <PopoverDescription>
                        Point your webcam at a set of coins to get a monetary total.
                    </PopoverDescription>
                </HelpPopoverContent>
            </Popover>
        </NavContainer>
    )
}