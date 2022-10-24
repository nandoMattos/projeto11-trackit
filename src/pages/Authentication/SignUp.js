import axios from "axios";
import { useState } from "react"
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { API_URL } from "../../constants/urls";

export default function SignUp() {

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPicture, setInputPicture] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    function handleForm(e) {
        setIsLoading(true)
        e.preventDefault();

        const body = {
            email: inputEmail,
            name: inputName,
            image: inputPicture,
            password: inputPassword
        };

        axios.post(`${API_URL}/auth/sign-up`, body)
        .then(()=>navigate("/"))
        .catch((err)=>{
            alert(err.response.data.message)
            setIsLoading(false)
            setInputEmail("")
            setInputPassword("")
            setInputName("")
            setInputPicture("")
        })
    }

    return (
        <SignUpScreen>
            <SignUpContainer>
                <img alt="Logo Login" src="https://img.freepik.com/fotos-premium/cachorrinho-fofo-de-spitz-pomeranian-deitado-no-fundo-amarelo-brilhante_253512-22.jpg?w=2000"/>

                <FormSignUpContainer>
                    <form onSubmit={handleForm}>
                        <input 
                            type="email"
                            placeholder="email" 
                            required 
                            onChange={e => setInputEmail(e.target.value)}
                            value={inputEmail}
                            disabled={isLoading}
                        />

                        <input 
                            type="password"
                            placeholder="senha"
                            required 
                            minLength={6}
                            onChange={e => setInputPassword(e.target.value)}
                            value={inputPassword}
                            disabled={isLoading}
                        />
                        <input 
                            type="text"
                            placeholder="nome"
                            required 
                            onChange={e => setInputName(e.target.value)}
                            value={inputName}
                            disabled={isLoading}
                        />
                        <input
                            type="url"
                            placeholder="foto"
                            required
                            onChange={e => setInputPicture(e.target.value)}
                            value={inputPicture}
                            disabled={isLoading}
                        />

                        <button type="submit" disabled={isLoading}>
                            {
                                isLoading ?
                                <ColorRing
                                    visible={isLoading}
                                    colors={['white',   'white', 'white', 'white', 'white']}
                                    width="50px"
                                    height="50px"
                                />
                                :
                                <>Entrar</>
                            }
                        </button>

                        <Link to="/">
                            Já tem uma conta? Faça login!
                        </Link>
                    </form>
                </FormSignUpContainer>
            </SignUpContainer>
        </SignUpScreen>
    )
};

const SignUpScreen = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 10;
    position: relative;
`

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    height: 90%;
    
    img{
        width: 400px;
    }
`

const FormSignUpContainer = styled.div `
    display: flex; 
    width: 100%;
    height: 50%;

    form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: "Lexend Deca", sans-serif;
    }

    a {
        text-decoration: underline;
    }
`