import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../constants/urls";
import LoginContext from "../../contexts/LoginContext";
import { ColorRing } from "react-loader-spinner";
import image from "../../assets/images/logo.png";

export default function SignIn() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      email: inputEmail,
      password: inputPassword,
    };

    axios
      .post(`${API_URL}/auth/login`, body)
      .then((res) => {
        setAuthInfo(res.data);
        navigate("/hoje");
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data.message);
      });
  }

  return (
    <LoginScreen>
      <LoginContainer>
        <img src={image} alt="Logo Login"></img>

        <FormLoginContainer>
          <form onSubmit={handleForm}>
            <input
              type="email"
              placeholder="email"
              required
              onChange={(e) => setInputEmail(e.target.value)}
              disabled={isLoading}
              data-identifier="input-email"
            />

            <input
              type="password"
              placeholder="senha"
              required
              onChange={(e) => setInputPassword(e.target.value)}
              disabled={isLoading}
              data-identifier="input-password"
            />

            <button
              type="submit"
              disabled={isLoading}
              data-identifier="login-btn"
            >
              {isLoading ? (
                <ColorRing
                  visible={isLoading}
                  colors={["white", "white", "white", "white", "white"]}
                  width="50px"
                  height="50px"
                />
              ) : (
                <>Entrar</>
              )}
            </button>

            <Link
              to="cadastrar"
              disabled={isLoading}
              data-identifier="sign-up-action"
            >
              Não tem uma conta? Cadastre-se!
            </Link>
          </form>
        </FormLoginContainer>
      </LoginContainer>
    </LoginScreen>
  );
}

const LoginScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 10;
  position: relative;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  height: 90%;

  img {
    width: 250px;
  }

  a {
    text-decoration: underline;
  }
`;

const FormLoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 95%;
    font-family: "Lexend Deca", sans-serif;
  }
`;
