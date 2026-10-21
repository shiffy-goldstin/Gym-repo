import React from "react";
import styled from "styled-components";

import gymImageOne from "../assets/1.webp";
import gymImageTwo from "../assets/2.jpeg";
import gymImageThree from "../assets/3.png";

const Hakkimizda = () => {
  return (
    <AboutContainer>
      <Section>
        <ImageContainer>
          <Image src={gymImageOne} alt="Who We Are" />
        </ImageContainer>
        <TextContainer>
          <h3>Who We Are</h3>
          <p>
            Our gym was founded to support healthy living and a stronger future.
            We help our members reach their fitness goals with experienced trainers
            and facilities suited to athletes of every level.
          </p>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer>
          <h3>Our Purpose</h3>
          <p>
            Our goal is to encourage healthy habits and help everyone reach their
            potential. We guide our members with personalized workout plans and
            group classes.
          </p>
        </TextContainer>
        <ImageContainer>
          <Image src={gymImageTwo} alt="Our Purpose" />
        </ImageContainer>
      </Section>

      <Section>
        <ImageContainer>
          <Image src={gymImageThree} alt="Our Services" />
        </ImageContainer>
        <TextContainer>
          <h3>Our Plans and Services</h3>
          <p>
            We offer a range of workout plans for different needs, including
            foundational fitness, muscle building, fat loss, flexibility, and
            mobility. Members can also join group classes, personal training
            sessions, and high-intensity interval training (HIIT).
          </p>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer>
          <h3>Our Facility</h3>
          <p>
            Our modern equipment, spacious workout areas, and airy studios create
            a comfortable place to train. With an energizing atmosphere and modern
            facilities, we are committed to giving our members a great experience.
          </p>
        </TextContainer>
        <ImageContainer>
          <Image src={gymImageTwo} alt="Gym Facility" />
        </ImageContainer>
      </Section>

      <Section>
        <ImageContainer>
          <Image src={gymImageOne} alt="How We Work" />
        </ImageContainer>
        <TextContainer>
          <h3>How We Work</h3>
          <p>
            Our gym is open six days a week for your convenience. Expert-led
            classes, personal training sessions, and regularly updated programs
            help every member work toward their fitness goals.
          </p>
        </TextContainer>
      </Section>
    </AboutContainer>
  );
};

// Styled Components
const AboutContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 150px;
  background-color: black;
  color: white;
  padding: 40px 20px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #222;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
  box-shadow: 0 0 20px rgba(57, 255, 20, 1); /* Daha belirgin kutu gölgesi */
}

  h3 {
    color: #39ff14;
    font-size: 1.8em;
    margin-bottom: 15px;
    text-align: center;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
  }
`;

const Image = styled.img`
  width: 80%;
  height: auto;
  border-radius: 10px;
`;

export default Hakkimizda;
