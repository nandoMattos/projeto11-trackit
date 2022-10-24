import styled from "styled-components"
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useState } from "react";
import { MAIN_COLOR } from "../constants/colors";
import { Link } from "react-router-dom";
import ProgressContext from "../contexts/ProgressContext";

export default function Nav() {
    const {userProgress} = useContext(ProgressContext)
    
    return (
        <Menu>
            <Link to="/habitos">
                Hábitos
            </Link>

            <Link to="/hoje">
                <ProgressbarContainer>
                    <CircularProgressbarWithChildren 
                        value={userProgress}
                        background={true}
                        backgroundPadding = {6}
                        styles={buildStyles({
                            backgroundColor: MAIN_COLOR,
                            trailColor: MAIN_COLOR,
                            pathColor: "white",
                        })}
                    >
                        <div style={{ fontSize: 19, marginTop: -5 }}>
                        <strong>Hoje</strong>
                        </div>
                    </CircularProgressbarWithChildren>
                </ProgressbarContainer>
            </Link>

            <Link to="/historico">
                Histórico
            </Link>
        </Menu>
    )
};

const Menu = styled.nav`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.15);

    a{
        font-weight: 400;
        font-size: 20px;
        padding: 10px;
    }

`

const ProgressbarContainer = styled.div`
    transform: translate(0, -30px);
    width: 85px;
    height: 85px;
    border-radius: 50%;

    font-family: 'Lexend Deca', sans-serif;
    color:white;
`