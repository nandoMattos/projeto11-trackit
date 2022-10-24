import GlobalStyle from "./assets/styles/GlobalStyle";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "./pages/Authentication/SignIn"
import SignUp from "./pages/Authentication/SignUp";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import TodayPage from "./pages/TodayPage/TodayPage";
import LoginContext from "./contexts/LoginContext";
import { useState } from "react";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import ProgressContext from "./contexts/ProgressContext";

export default function App() {

    const [authInfo, setAuthInfo] = useState(undefined);
    const [userProgress, setUserProgress] = useState(0)
    
    return (
        <>
            <GlobalStyle/>
            <LoginContext.Provider value={{authInfo, setAuthInfo}}>
                <ProgressContext.Provider value={{userProgress, setUserProgress}}>
                    <BrowserRouter>
                        <Routes>
                            {/* Authentication */}
                            <Route path="/" element={<SignIn/>} />
                            <Route path="/cadastrar" element={<SignUp/>} />

                            {/* Pages */}
                            <Route path="/habitos" element={<HabitsPage/>}/>
                            <Route path="/hoje" element={<TodayPage/>}/>
                            <Route path="/historico" element={<HistoryPage/>}/>

                        </Routes>
                    </BrowserRouter>    
                </ProgressContext.Provider>
            </LoginContext.Provider>
        </>
    )
};
