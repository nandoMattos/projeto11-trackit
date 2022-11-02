import styled from "styled-components";
import Header from "../../components/Header";
import Nav from "../../components/Nav";

export default function HistoryPage() {
  return (
    <>
      <Header />

      <HistoryScreen>
        <header>
          <h1>Histórico</h1>
        </header>
        <p>Em breve você poderá ver seu histórico aqui!</p>
      </HistoryScreen>

      <Nav />
    </>
  );
}

const HistoryScreen = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  p {
    font-size: 20px;
    width: 80%;
  }
`;
