import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import registerImage from "../assets/2.jpeg";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);

    if (!firstName || lastNameParts.length === 0) {
      setIsError(true);
      setMessage("Please enter your first and last name.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/v1/register`, {
        firstName,
        lastName: lastNameParts.join(" "),
        email,
        password,
      });
      setIsError(false);
      setMessage("Registration successful. Redirecting you to log in...");
      navigate("/login");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.status === 409
        ? "An account with this email address already exists."
        : "Unable to complete registration. Check your details and try again.");
    }
  };

  return (
    <RegisterContainer>
      <FormSection>
        <RegisterForm onSubmit={handleRegister}>
          <FormTitle>Create an Account</FormTitle>
          <FormInput type="text" placeholder="Full name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
          <FormInput type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <FormInput type="password" placeholder="Password (at least 8 characters)" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required />
          {message && <FormMessage $error={isError}>{message}</FormMessage>}
          <RegisterButton type="submit">Sign Up</RegisterButton>
        </RegisterForm>
      </FormSection>
      <ImageSection>
        <RegisterImage src={registerImage} alt="Register Background" />
      </ImageSection>
    </RegisterContainer>
  );
};

export default Register;

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px); /* Adjusting for header height */
  align-items: center;
  margin-left: 180px; /* Shift the entire container to the right */
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const RegisterForm = styled.form`
  width: 80%;
  max-width: 450px;
  padding: 30px;
  border: 2px solid #39ff14;
  border-radius: 8px;
  box-shadow: 0 0 20px #39ff14;
  background-color: #1e1e1e;
  text-align: center;
`;

const FormTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
`;

const RegisterButton = styled.button`
  width: 30%;
  padding: 10px;
  background-color: #39ff14;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  color: black;
  font-weight: bold;
  
  &:hover {
    background-color: #32e30f;
  }
`;

const FormMessage = styled.p`
  color: ${({ $error }) => ($error ? "#ff6b6b" : "#39ff14")};
  margin: 0 0 15px;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
`;
