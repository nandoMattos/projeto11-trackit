import { useState } from "react"
import styled from "styled-components"
import {SELECTED_COLOR, TEXT_COLOR } from "../../constants/colors"
import { WEEKDAYS } from "../../constants/weekdays"

export default function Habit({habitName, setHabit}) {

    const [selectedWeekdays, setSelectedWeekdays] = useState([])

    function toggleWeekdaySelection(weekdayId) {
        if(selectedWeekdays.includes(weekdayId)) {
            setSelectedWeekdays(selectedWeekdays.filter((id)=> id !== weekdayId))
        } else{
            setSelectedWeekdays([...selectedWeekdays, weekdayId])
        }
    }

    function removeHabit() {
        
    }

    return (
        <ItemHabit>
            <h1>{habitName}</h1>

            <WeekdaysContainer>
                {WEEKDAYS.map((w)=>
                    <ButtonStyle
                        key={w.id}
                        statusBackground={selectedWeekdays.includes(w.id) ? SELECTED_COLOR : "white"}
                        statusFont={selectedWeekdays.includes(w.id) ? "white" : SELECTED_COLOR}
                        onClick={()=> toggleWeekdaySelection(w.id)}
                    >
                    {w.name}
                    </ButtonStyle>
                )}
            </WeekdaysContainer>
            <TrashIconDiv onClick={removeHabit}>
                <ion-icon name="trash-outline"></ion-icon>
            </TrashIconDiv>
        </ItemHabit>
    )
};

const ItemHabit = styled.li`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 91px;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    position: relative;

    h1{
        margin-left: 15px;
        margin-top: 5px;
        color: ${TEXT_COLOR};
    }
`
const WeekdaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
`
const ButtonStyle = styled.button`
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
const TrashIconDiv = styled.div`
    position: absolute;
    top: 15px;
    right: 10px;
`