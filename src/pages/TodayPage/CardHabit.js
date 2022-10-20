import axios from "axios";
import styled from "styled-components"
import { CHECKED_GREEN, TEXT_COLOR, UNCHECKED_GRAY } from "../../constants/colors"
import { API_URL } from "../../constants/urls";

export default function CardHabit(props) {
    const { 
        id, 
        name, 
        done, 
        currentSequence, 
        highestSequence,
        token,
        changedHabits,
        setChangedHabits
        
    } = props
    
    function checkTask () {

        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${API_URL}/habits/${id}/check`, {}, config)
        .catch(res=>console.log(res))
        .catch(err=>console.log(err.response))

        setChangedHabits(!changedHabits);        
    }

    return (
        <ItemCard>
            <Text>
                <h1>{name}</h1>
                <p>Sequência atual: {currentSequence} dias</p>
                <p>Seu recorde: {highestSequence} dias</p>
            </Text>

            <CheckBox
                bgColor = {done ? CHECKED_GREEN : UNCHECKED_GRAY}
            >
                <ion-icon onClick={checkTask} name="checkmark-outline"></ion-icon>
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