import styled from "styled-components";
import Header from "../../components/Header";
import Nav from "../../components/Nav";

export default function HistoryPage() {
    return (
        <>
            <Header/>
        
            <HistoryScreen>
                history
            </HistoryScreen>

            <Nav/>
        </>
    )
};

const HistoryScreen = styled.main`

`