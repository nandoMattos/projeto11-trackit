import axios from "axios";
import { useContext } from "react";
import styled from "styled-components"
import { MAIN_COLOR, SELECTED_COLOR } from "../../constants/colors"
import { API_URL } from "../../constants/urls";
import { WEEKDAYS } from "../../constants/weekdays"
import LoginContext from "../../context/LoginContext";

export default function NewHabitForm(props) {

    const {
        showNewHabitForm,
        setShowNewHabitForm,
        inputHabitName,
        setInputHabitName,
        selectedWeekdays,
        setSelectedWeekdays,
        changedHabits,
        setChangedHabits

    } = props;

    const {authInfo} = useContext(LoginContext)

    function toggleWeekdaySelection(weekdayId) {
        if(selectedWeekdays.includes(weekdayId)) {
            setSelectedWeekdays(selectedWeekdays.filter((id)=> id !== weekdayId))
        } else{
            setSelectedWeekdays([...selectedWeekdays, weekdayId])
        }
    }
    
    function submitHabit() {
        const body ={
            name: inputHabitName,
            days: selectedWeekdays
        }

        const config = {
            headers:{
                Authorization: `Bearer ${authInfo.token}`
            },
        }
        axios.post(`${API_URL}/habits`, body, config)
        .then(res=>console.log(res))
        .catch(err=>alert(err.response.data.message))

        setShowNewHabitForm(!showNewHabitForm)
        setChangedHabits(!changedHabits);
        setInputHabitName("")
        setSelectedWeekdays([])
    }

    return (
        <NewHabitContainer>
            <input 
                type="text"
                onChange={e => setInputHabitName(e.target.value)}
                placeholder="nome do habito"
                value={inputHabitName}
            />

            <WeekdaysContainer>
                {WEEKDAYS.map((w)=>
                    <WeekdayButton
                        key={w.id}
                        statusBackground={selectedWeekdays.includes(w.id) ? SELECTED_COLOR : "white"}
                        statusFont={selectedWeekdays.includes(w.id) ? "white" : SELECTED_COLOR}
                        onClick={()=> toggleWeekdaySelection(w.id)}
                    >
                    {w.name}
                    </WeekdayButton>
                )}
            </WeekdaysContainer>

            <ButtonsContainer>
                <CancelButton onClick={()=> setShowNewHabitForm(!showNewHabitForm)}>Cancelar</CancelButton>
                <ConfirmButton onClick={submitHabit}>Salvar</ConfirmButton>
            </ButtonsContainer>
        </NewHabitContainer>
    )
};

const NewHabitContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    height: 190px;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    input {
        height: fit-content;
        word-wrap: break-word;
        font-size: 18px;
        padding: 10px;
    }

    input::placeholder {
        color: ${SELECTED_COLOR};
    }
`

const WeekdaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const WeekdayButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    font-size: 15px;
    background-color: ${({statusBackground})=>statusBackground};
    color: ${({statusFont})=>statusFont};
    border: 2px solid ${SELECTED_COLOR};
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CancelButton = styled.button`
    width: 100px;
    background-color: white;
    color: ${MAIN_COLOR};
    margin-right: 10px;
`

const ConfirmButton = styled.button`
    width: 100px;
    background-color: ${MAIN_COLOR};
`