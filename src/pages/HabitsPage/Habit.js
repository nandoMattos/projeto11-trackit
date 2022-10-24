import axios from "axios"
import { useContext } from "react"
import { RotatingLines } from "react-loader-spinner"
import styled from "styled-components"
import {MAIN_COLOR, SELECTED_COLOR, TEXT_COLOR } from "../../constants/colors"
import { API_URL } from "../../constants/urls"
import { WEEKDAYS } from "../../constants/weekdays"
import LoginContext from "../../contexts/LoginContext"

export default function Habit({habitName, habitDays, habitId, isLoading, setIsLoading}) {

    const {authInfo} = useContext(LoginContext)
    
    
    function deleteHabit() {
        const confirm = prompt(`Deseja remover "${habitName}?" (Digite sim ou não)`)
        if(!confirm || confirm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() !== 'sim'){
            return
        }
        setIsLoading(true)

        const config = {
            headers:{
                Authorization: `Bearer ${authInfo.token}` 
            }
        };

        axios.delete(`${API_URL}/habits/${habitId}`, config)
        .catch(err=>alert(err.response.data.message))
    }

    return (
        <ItemHabit>
            <h1>{habitName}</h1>

            <WeekdaysContainer>
                {WEEKDAYS.map((w)=>
                    <Weekday 
                        key={w.id}
                        statusBackground={habitDays.includes(w.id) ? SELECTED_COLOR : "white"}
                        statusFont={habitDays.includes(w.id) ? "white" : SELECTED_COLOR}
                    >
                    {w.name}
                    </Weekday>
                )}
                
                <TrashIconDiv>
                    <ion-icon onClick={()=>deleteHabit()} name="trash-outline"></ion-icon>
                </TrashIconDiv>
            </WeekdaysContainer>            
        
        </ItemHabit>
    )
};

const ItemHabit = styled.li`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: fit-content;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 20px;

    h1{
        margin-left: 15px;
        margin-top: 5px;
        color: ${TEXT_COLOR};
        flex-wrap: wrap;
        word-wrap: break-word;
        width: 90%;
        padding-bottom: 10px;
    }
`
const WeekdaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
`

const TrashIconDiv = styled.div`
    position: absolute;
    top: 15px;
    right: 10px;
`
const Weekday = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 0 5px 5px 0;
    font-size: 15px;
    background-color: ${({statusBackground})=>statusBackground};
    color: ${({statusFont})=>statusFont};
    border: 2px solid ${SELECTED_COLOR};
    border-radius: 5px;
`