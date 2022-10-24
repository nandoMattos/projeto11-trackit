import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { API_URL } from "../../constants/urls";
import { WEEKDAYS } from "../../constants/weekdays";
import LoginContext from "../../contexts/LoginContext";
import ProgressContext from "../../contexts/ProgressContext";
import CardHabit from "./CardHabit";

export default function TodayPage() {
    // gets today's date
    const weekday = require('dayjs/plugin/weekday');
    dayjs.extend(weekday)
    const todayWeekday = WEEKDAYS.find(e => e.id === dayjs().weekday())

    const navigate = useNavigate();
    const {authInfo} = useContext(LoginContext)
    const {userProgress, setUserProgress} = useContext(ProgressContext)

    const [todayHabits, setTodayHabits] = useState(undefined)
    
    console.log('oi')

    useEffect(()=>{
        if(authInfo === undefined){
            return navigate("/");
        }
    }, [])

    if(authInfo) {
        const config = {
            headers:{
                Authorization: `Bearer ${authInfo.token}`
            }
        }
        axios.get(`${API_URL}/habits/today`, config)
        .then((res)=>{
            setTodayHabits(res.data)

        })
        .catch(err=>console.log(err))
    }

    return (
        <>
            <Header/>
            <TodayScreen>
                <header>
                    {/* <h1>{todayWeekday.weekday}, {dayjs().format("DD/MM")}</h1>
                    {concludedTasks.length != 0 ? 
                    <p>{userProgress}</p>
                    :
                } */}
                <p>Nenhum hábito concluído ainda</p>
                </header>

                {todayHabits &&
                todayHabits.map((h) => 
                    <ul>
                        <CardHabit
                            key={h.id}
                            token={authInfo.token}
                            id={h.id}
                            name={h.name} 
                            done={h.done} 
                            currentSequence={h.currentSequence}
                            highestSequence={h.highestSequence}
                        />
                
                    </ul>
                )}

            </TodayScreen>
            <Nav/>
        </>

    )
};

const TodayScreen = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;    

    header {
        height: 45px;
        flex-direction: column;
        align-items: flex-start;
    }

    ul {
        /* background-color: green; */
        width: 80%;
    }

    @media (min-width: 600px) {
        justify-content: flex-start;
        
    }

`