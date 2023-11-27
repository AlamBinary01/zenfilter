import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Appi from "./Appi";
import App from "./LoginForm.jsx";
import { Routes,Route } from "react-router-dom";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: solid 4px #f79817;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

const Title = styled.h1`
  font-weight: bold;
  color: #f79817;
  margin: 0;
`;

const Paragraph = styled.p`
  color:#fff;
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0;
  text-align: center;
  width: 60%;
`;

const GetStartedButton = styled.button`
  border-radius: 20px;
  border: 1px solid #e67315;
  background-color: #e67315;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <LandingContainer>
      <div className="App">
            <Routes>
                <Route path="/Login" element={<App/>}/>
            </Routes>
        </div>
      <Title>Welcome to Zen-Filter</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla
        augue nec lacus maximus, sit amet tempus justo efficitur. Sed id orci at
        libero fringilla fermentum vitae eget sem. Nullam vel sollicitudin neque.
        Mauris bibendum purus ut aliquam feugiat. Donec eu velit risus.
      </Paragraph>
      <GetStartedButton onClick={()=>navigate("/Login")}>Get Started</GetStartedButton>
    </LandingContainer>
  );
};

export default LandingPage;

