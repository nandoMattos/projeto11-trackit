import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import Habit from "./Habit";
import NewHabitForm from "../HabitsPage/NewHabitForm";
import axios from "axios";
import { API_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import Header from "../../components/Header";
import Nav from "../../components/Nav";

export default function HabitsPage() {

    const [habits, setHabits] = useState([])
    const [showNewHabitForm, setShowNewHabitForm] = useState(false);
    const [inputHabitName, setInputHabitName] = useState("");
    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const [changedHabits, setChangedHabits] = useState(false); 

    const navigate = useNavigate();
    const {authInfo} = useContext(LoginContext);


    useEffect(()=>{
        if(authInfo === undefined){
            return navigate("/");
        }
        console.log('oi')

        const config = {
            headers:{
                Authorization: `Bearer ${authInfo.token}`
            }
        }

        axios.get(`${API_URL}/habits`, config)
        .then((res)=>setHabits((res.data).reverse()))
        .catch(err=>console.log(err))

    },[changedHabits])

    return (
        <>
        <Header/>

        <HabitsScreen>
            <header>
                <h1>Meus hábitos</h1>
                <button onClick={()=>setShowNewHabitForm(!showNewHabitForm)}>+</button>
            </header>
                <HabitsContainer>
                    {showNewHabitForm && 
                    <NewHabitForm 
                        showNewHabitForm = {showNewHabitForm} 
                        setShowNewHabitForm = {setShowNewHabitForm}
                        inputHabitName = {inputHabitName}
                        setInputHabitName = {setInputHabitName}
                        selectedWeekdays = {selectedWeekdays}
                        setSelectedWeekdays = {setSelectedWeekdays}
                        changedHabits={changedHabits}
                        setChangedHabits={setChangedHabits}
                    />}
                    {habits.length !== 0 ? 
                        <ul>
                            {habits.map((h)=>
                                <Habit
                                    key={h.id}
                                    habitName={h.name}
                                    habitDays={h.days}
                                    habitId={h.id}
                                    changedHabits={changedHabits}
                                    setChangedHabits={setChangedHabits}
                                />
                            )}
                        </ul>
                        :
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    }
                </HabitsContainer>
        </HabitsScreen>

        <Nav/>
        </>
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

    p{
        margin-top: 10px;
    }
`