import { useContext} from "react"
import styled from "styled-components"
import {SECONDARY_COLOR} from "../constants/colors"
import LoginContext from "../context/LoginContext"

export default function Header() {
    const {authInfo} = useContext(LoginContext)

    return (
        <NavStyle>
            <div>
                <h1>TrackIt</h1>
                {authInfo && <img src={authInfo.image} alt="profile pic"/>}
            </div>
        </NavStyle>
    )
};

const NavStyle = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    right: 0%;
    background-color: ${SECONDARY_COLOR};
    font-family: 'Playball', cursive;
    z-index: 5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        width: 90%;
    }

    h1{
        font-size: 40px;
        color: white;
    }

    img {
        width: 55px;
        height: 55px;
        object-fit: cover;
        border-radius: 50%;
    }
`