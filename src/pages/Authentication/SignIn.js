import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import {API_URL} from "../../constants/urls"
import LoginContext from "../../context/LoginContext"

export default function SignIn() {

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const  {setAuthInfo} = useContext(LoginContext)
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        const body = {
            email: inputEmail,
            password: inputPassword
        }

        axios.post(`${API_URL}/auth/login`, body)
        .then(res=>{
            setAuthInfo(res.data)
            navigate("/habitos")
        })
        .catch(err=>console.log(err.response.data))
    }

    return (
        <LoginScreen>
            <LoginContainer>
                <img alt="Logo Login" src="https://img.freepik.com/fotos-premium/cachorrinho-fofo-de-spitz-pomeranian-deitado-no-fundo-amarelo-brilhante_253512-22.jpg?w=2000"/>

                <FormLoginContainer>
                    <form onSubmit={handleForm}>
                        <input 
                            type="email" 
                            placeholder="email"
                            required
                            onChange={e=> setInputEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="senha"
                            required
                            onChange={e=> setInputPassword(e.target.value)}
                        />

                        <button type="submit">Entrar</button>

                        <Link to="cadastrar">
                            Não tem uma conta? Cadastre-se!
                        </Link>
                    </form>
                </FormLoginContainer>
            </LoginContainer>
        </LoginScreen>
    )
};

const LoginScreen = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 10;
    position: relative;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    height: 90%;
    /* background-color: lightcoral; */
    
    img{
        width: 400px;
    }
`

const FormLoginContainer = styled.div`
    display: flex; 
    width: 100%;
    height: 40%;

    form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 95%;
        font-family: "Lexend Deca", sans-serif;
    }
`