import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import Habit from "./Habit";
import NewHabitForm from "../HabitsPage/NewHabitForm";
import Context from "../../context/LoginContext";
import axios from "axios";
import { API_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

export default function HabitsPage() {

    const [habits, setHabits] = useState([])
    const [showNewHabitForm, setShowNewHabitForm] = useState(false);

    const navigate = useNavigate();
    const {authInfo} = useContext(Context);

    useEffect(()=>{
        if(authInfo === undefined){
            navigate("/");
        }
        
        const config = {
            headers:{
                "Authorization" : `Bearer ${authInfo.token}`
            }
        }

        axios.get(`${API_URL}/habits`, config)
        .then(res=>setHabits(res.data))
        .catch(err=>console.log(err))
    },[])

    

    return (
        <HabitsScreen>
            <header>
                <h1>Meus hábitos</h1>
                <button>+</button>

            </header>
                <HabitsContainer>
                    {showNewHabitForm && <NewHabitForm/>}
                    {
                        habits.length !== 0 ? <ul>{habits.map((h)=><Habit habitName={h.name}/>)}</ul>
                        :
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    }
                </HabitsContainer>
        </HabitsScreen>
    )
};

const HabitsScreen = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;    

    
    header button{
        width: 40px;
        height: 40px;
    }
`

const HabitsContainer = styled.div `
    width: 80%;
`