import GlobalStyle from "./GlobalStyle";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "./pages/Authentication/SignIn"
import SignUp from "./pages/Authentication/SignUp";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import LoginContext from "./context/LoginContext";
import { useState } from "react";

export default function App() {

    const [authInfo, setAuthInfo] = useState(undefined);
    
    return (
        <>
            <GlobalStyle/>
            <LoginContext.Provider value={{authInfo, setAuthInfo}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn/>} />
                        <Route path="/cadastrar" element={<SignUp/>} />

                        <Route path="/habitos" element={<HabitsPage/>}/>
                    </Routes>
                </BrowserRouter>    
            </LoginContext.Provider>

    
        </>
    )
};
