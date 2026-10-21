// src/components/footer.jsx
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #000; /* Dark background */
  color: #fff; /* White text */
  display: flex;
  padding: 20px; /* Add padding for spacing */
`;

const Column = styled.div`
  flex: 1; /* Allow columns to take equal width */
  padding: 20px;
  text-align: center; /* Center text in each column */
`;

const Logo = styled.img`
  width: 200px; /* Adjust logo size */
  height: 200px; /* Adjust logo size */
  border-radius: 50%; /* Circular logo */
  box-shadow: 0 1px 10px rgba(0, 255, 0, 0.9); /* Shadow effect */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Column>
        <h2>Contact Us</h2>
        <p>
          <i className="fa fa-map-marker-alt"></i> Address: Sivas
        </p>
        <p>
          <i className="fa fa-phone-alt"></i> Phone: 123-456-7890
        </p>
        <p>
          <i className="fa fa-envelope"></i> Email: gym.app36@gmail.com
        </p>
      </Column>
      <Column>
        <h2>Opening Hours</h2>
        <p>Weekdays: 09:00 - 21:00</p>
        <p>Saturday: 10:00 - 18:00</p>
        <p>Sunday: Closed</p>
      </Column>
    </FooterContainer>
  );
};

export default Footer;
