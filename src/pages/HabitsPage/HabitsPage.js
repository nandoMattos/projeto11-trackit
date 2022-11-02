import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Habit from "./Habit";
import NewHabitForm from "../HabitsPage/NewHabitForm";
import axios from "axios";
import { API_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../contexts/LoginContext";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { RotatingLines } from "react-loader-spinner";
import { MAIN_COLOR } from "../../constants/colors";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);
  const [inputHabitName, setInputHabitName] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { authInfo } = useContext(LoginContext);

  useEffect(() => {
    if (authInfo === undefined) {
      return navigate("/");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authInfo.token}`,
      },
    };

    axios
      .get(`${API_URL}/habits`, config)
      .then((res) => {
        setHabits(res.data.reverse());
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <>
      <Header />

      <HabitsScreen>
        <header>
          <h1>
            Meus hábitos
            <SpinnerDiv>
              <RotatingLines
                visible={isLoading}
                strokeColor={MAIN_COLOR}
                width="35px"
              />
            </SpinnerDiv>
          </h1>
          <button
            data-identifier="create-habit-btn"
            onClick={() => setShowNewHabitForm(!showNewHabitForm)}
          >
            +
          </button>
        </header>
        <HabitsContainer>
          {showNewHabitForm && (
            <NewHabitForm
              showNewHabitForm={showNewHabitForm}
              setShowNewHabitForm={setShowNewHabitForm}
              inputHabitName={inputHabitName}
              setInputHabitName={setInputHabitName}
              selectedWeekdays={selectedWeekdays}
              setSelectedWeekdays={setSelectedWeekdays}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {habits.length !== 0 ? (
            <ul>
              {habits.map((h) => (
                <Habit
                  key={h.id}
                  habitName={h.name}
                  habitDays={h.days}
                  habitId={h.id}
                  setIsLoading={setIsLoading}
                />
              ))}
            </ul>
          ) : (
            !isLoading && (
              <p data-identifier="no-habit-message">
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
              </p>
            )
          )}
        </HabitsContainer>
      </HabitsScreen>

      <Nav />
    </>
  );
}

const HabitsScreen = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-content: flex-start;

  width: 100%;

  h1 {
    display: flex;
    align-items: center;
  }

  header button {
    width: 40px;
    height: 40px;
  }
`;
const SpinnerDiv = styled.div`
  margin-left: 20px;
`;

const HabitsContainer = styled.div`
  width: 80%;

  p {
    margin-top: 10px;
  }
`;
