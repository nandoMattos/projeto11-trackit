import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { CHECKED_GREEN, MAIN_COLOR, TEXT_COLOR } from "../../constants/colors";
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
    const [isLoading, setIsLoading] = useState(true)

    function calculateProgress(todayHabits) {
        const todayHabitsAmount = todayHabits.length
        let countHabits = 0;

        for(let habit of todayHabits){
            if(habit.done === true) {
                countHabits++;
            }
        }
        if(todayHabits.length !== 0){
            setUserProgress((countHabits/todayHabitsAmount)*100)
        } else{
            setUserProgress(0)
        }

    }

    useEffect(()=>{
        if(authInfo === undefined){
            return navigate("/");
        }
        
        const config = {
            headers:{
                Authorization: `Bearer ${authInfo.token}`
            }
        }
        axios.get(`${API_URL}/habits/today`, config)
        .then((res)=>{
            setIsLoading(false)
            setTodayHabits(res.data)
            calculateProgress(res.data)
        })
        .catch(err=>console.log(err))
    
    }, [isLoading])


    return (
        <>
            <Header/>
            <TodayScreen>
                <header>
                    <HeaderDiv>
                        <h1 data-identifier="today-infos">{todayWeekday.weekday}, {dayjs().format("DD/MM")}</h1>

                        <SpinnerDiv>
                            <RotatingLines 
                                visible={isLoading}
                                strokeColor={MAIN_COLOR}
                                width='25px'
                            />
                        </SpinnerDiv>

                    </HeaderDiv>
                    {
                    userProgress !== 0 ? 
                    <Feedback
                        color={CHECKED_GREEN}
                        data-identifier="today-infos"
                    >
                        {Math.round(userProgress)}% dos hábitos concluídos
                    </Feedback>
                    :
                    <Feedback
                        color={TEXT_COLOR}
                        data-identifier="today-infos"
                    >
                        Nenhum hábito concluído ainda
                    </Feedback>
                    }
                </header>

                <ul>
                {
                    todayHabits &&
                    todayHabits.map((h) => 
                        <CardHabit
                            key={h.id}
                            token={authInfo.token}
                            id={h.id}
                            name={h.name} 
                            done={h.done} 
                            currentSequence={h.currentSequence}
                            highestSequence={h.highestSequence}
                            todayHabits={todayHabits}
                            setTodayHabits={setTodayHabits}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    
                    )
                }
                </ul>

            </TodayScreen>
            <Nav/>
        </>

    )
};

const TodayScreen = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;    

    header {
        height: 45px;
        flex-direction: column;
        align-items: flex-start;

        h1{
            display: flex;
            align-items: center;
        }
    }


    ul {
        width: 80%;
    }

    @media (min-width: 600px) {
        justify-content: flex-start;
        
    }

`

const HeaderDiv = styled.div`
    display: flex;
    height: 100px;
`

const SpinnerDiv = styled.div`
    margin-left: 20px;
`

const Feedback = styled.div`
    font-size: 18px;
    color: ${ ({color})=>color }
`