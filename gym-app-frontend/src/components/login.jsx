import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import loginImage from "../assets/1.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/generateToken`,
        {
          email,
          password,
        }
      );

      const { accessToken: token, refreshToken: refresh, role } = response.data;

      if (!token || !refresh) {
        throw new Error("The server returned an incomplete login response.");
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userRole", JSON.stringify(role));

      navigate("/profil");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.code === "ERR_NETWORK"
        ? "Unable to reach the server. Make sure the backend is running and try again."
        : error.response?.status === 401 || error.response?.status === 403
          ? "The email or password is incorrect. If you don't have an account, register first."
          : "Login failed. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoginContainer>
        <ImageSection>
          <LoginImage src={loginImage} alt="Login Background" />
        </ImageSection>
        <FormSection>
          <LoginForm onSubmit={handleLogin}>
            <FormTitle>Member Log In</FormTitle>
            <FormInput
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <LoginError role="alert">{errorMessage}</LoginError>}
            <LoginButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </LoginButton>
            <RegisterPrompt>
              Don't have an account? <RegisterLink to="/register">Sign up</RegisterLink>
            </RegisterPrompt>
          </LoginForm>
        </FormSection>
      </LoginContainer>
      <br />
    </>
  );
};

export default Login;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: 24px;
  padding: 120px 24px 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 200px 20px 40px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    max-height: 180px;
    overflow: hidden;
  }
`;

const LoginImage = styled.img`
  width: min(65%, 460px);
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    width: min(70%, 280px);
  }
`;

const RegisterPrompt = styled.p`
  color: white;
  margin-top: 18px;
  text-align: center;
`;

const RegisterLink = styled(Link)`
  color: #39ff14;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const LoginForm = styled.form`
  width: min(100%, 400px);
  box-sizing: border-box;
  padding: 40px;
  margin: 0;
  border: 2px solid #39ff14;
  border-radius: 8px;
  box-shadow: 0 0 20px #39ff14;
  background-color: #1e1e1e;
  text-align: center;

  @media (max-width: 768px) {
    padding: 28px 22px;
  }
`;

const LoginError = styled.p`
  color: #ff6b6b;
  margin: 0 0 15px;
`;

const FormTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
`;

const LoginButton = styled.button`
  width: auto;
  min-width: 120px;
  padding: 10px;
  background-color: #39ff14;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  color: black;
  font-weight: bold;

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }

  &:hover {
    background-color: #32e30f;
  }
`;
