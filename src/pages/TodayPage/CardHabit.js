import { fireEvent } from "@testing-library/react";
import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components"
import { CHECKED_GREEN, TEXT_COLOR, UNCHECKED_GRAY } from "../../constants/colors"
import { API_URL } from "../../constants/urls";
import ProgressContext from "../../contexts/ProgressContext";

export default function CardHabit(props) {
    const { 
        id, 
        name, 
        done, 
        currentSequence, 
        highestSequence,
        token,
        todayHabits,
        setTodayHabits,
        setIsLoading
    } = props

    const {setUserProgress} = useContext(ProgressContext)
    const [isChecked, setIsChecked] = useState(done)

    function handleCheck(action) {
        setIsLoading(true)
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        setIsChecked(!isChecked)

        axios.post(`${API_URL}/habits/${id}/${action}`, {}, config)
        .catch(err=>console.log(err.response))

    }

    return (
        <ItemCard>
            <Text>
                <h1>{name}</h1>
                <p>Sequência atual: 
                    <Span 
                        color={done ? CHECKED_GREEN : TEXT_COLOR}
                    >
                        {currentSequence} dias
                    </Span>
                </p>
                <p>Seu recorde: 
                    <Span 
                        color={currentSequence === highestSequence && highestSequence !== 0 ? CHECKED_GREEN : TEXT_COLOR}
                    >
                    {highestSequence} dias
                    </Span>
                </p>
            </Text>

            <CheckBox
                bgColor = {isChecked ? CHECKED_GREEN : UNCHECKED_GRAY}
            >
                <ion-icon onClick={isChecked ? ()=>handleCheck("uncheck") : ()=>handleCheck("check")} 
                name="checkmark-outline"/>
            </CheckBox>

        </ItemCard>
    )
};

const ItemCard = styled.li`
    display:flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 20px;
`

const Text = styled.div`
    width: 80%;
   h1{
        font-size: 20px;
        color: ${TEXT_COLOR};
        flex-wrap: wrap;
        word-wrap: break-word;
        width: 90%;
        padding-bottom: 10px;
    }
`

const Span = styled.span`
    margin-left: 8px;
    color:${ ({color})=>color };
`

const CheckBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ ({bgColor}) => bgColor };
    border-radius: 4px;
    width: 90px;
    height: 80px;
    font-size: 80px;
    font-weight: 700;
    color: white
`