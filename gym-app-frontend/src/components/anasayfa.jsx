import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./header";
import gymImageOne from "../assets/1.webp";
import gymImageTwo from "../assets/2.jpeg";
import gymImageThree from "../assets/3.png";
import { Link } from 'react-router-dom';
import Footer from "./footer"; // Import the Footer component





const Anasayfa = () => {
  return (
    <>
      <div>
        <Header />
        <HeroSection>
          <HeroImage src={gymImageOne} alt="Motivational Background" />
          <MotivationalText>
            <MainText>BECOME A BETTER YOU!</MainText>
            <SubText>Reach your goals and discover your potential.</SubText>
          </MotivationalText>
        </HeroSection>
      </div>
      <br />
      <br />
      <br />
      <AboutUs />
      <CustomizedPrograms />
     
      <OurTeam />
      <Gallery /> {/* Galeri bileşenini buraya ekledik */}
      <Footer /> {/* Add Footer component here */}
    </>
  );
};

const AboutUs = () => {
  return (
    <>
    <AboutUsContainer>
  <AboutText>
    <h3 style={{ color: "#00ff00", textAlign: "center" }}>Who We Are</h3>
    <h2 style={{ textAlign: "center" }}>&quot;Be Part of a Strong Community!&quot;</h2>
    <p>
      We are a fitness community dedicated to healthy living and personal growth.
      Our goal is to give every member an outstanding fitness experience and the
      motivation to reach their goals. Our programs welcome people of all ages and
      fitness levels, helping you feel stronger, more energetic, and healthier.
      We believe we can achieve more together.
    </p>
  </AboutText>
  <AboutText>
    <h3 style={{ color: "#00ff00", textAlign: "center" }}>Our Mission</h3>
    <h2 style={{ textAlign: "center" }}>Live Well. Reach Your Goals.</h2>
    <p>
      Our mission is to encourage healthy living and support our members' personal
      growth. We create an exceptional fitness experience that motivates you to
      reach your goals. Our programs are designed for people of all ages, helping
      everyone build a healthier life and a stronger future together.
    </p>
  </AboutText>
  <AboutText>
    <h3 style={{ color: "#00ff00", textAlign: "center" }}>Our Vision</h3>
    <h2 style={{ textAlign: "center" }}>A Healthier Future Through Fitness!</h2>
    <p>
      We envision a fitness community that inspires healthy living and personal
      growth. We are here to support our members, help them reach their goals, and
      build a community of energetic, healthy people. Together, we are creating a
      healthier future.
    </p>
  </AboutText>
</AboutUsContainer>

    <br/>
    </>
  );
};

const CustomizedPrograms = () => {
  return (
    <>
   <div>
  <ProgramSection>
    <ProgramImage src={gymImageOne} alt="First Program" />
    <ProgramText>
      <h3>Personalized Programs to Help You Reach Your Goals</h3>
      <p>
        At Gym App, getting closer to your fitness goals can be both effective and
        enjoyable. Our trainers create personalized workout plans, and our virtual
        group classes offer flexible scheduling and more than 100 options to match
        your goals.
      </p>
    </ProgramText>
  </ProgramSection>

  <ProgramSection>
    <ProgramText>
      <h3>GFX: A Full-Body Workout in 30 Minutes</h3>
      <p>
        Make the most of a 30-minute session with Gym App's GFX (Gym Floor
        Exercise) program. Work every major muscle group, burn calories, and enjoy
        high-intensity HIIT sessions tailored to your goals, with guidance from
        your trainer. Get started today!
      </p>
    </ProgramText>
    <ProgramImage src={gymImageTwo} alt="Second Program" />
  </ProgramSection>

  <ProgramSection>
    <ProgramImage src={gymImageThree} alt="Third Program" />
    <ProgramText>
      <h3>Here for Every Step of Your Fitness Journey</h3>
      <p>
        Gym App is with you at every stage of your fitness journey. Our experienced
        trainers and modern equipment help you build healthy habits in an engaging,
        motivating environment. Sign up today and take a step toward a stronger,
        healthier future.
      </p>
    </ProgramText>
  </ProgramSection>
</div>


    <br/>
    </>
  );
};




const OurTeam = () => {
    return (
      <>
      <h1 style={{textAlign:'center'}}>OUR FITNESS PROGRAMS</h1>
   <OurTeamContainer>
   
  <TeamText>
    
      <h2 style={{ textAlign: "center", color: 'white' }}>PILATES</h2>
   
    <img src={gymImageOne} style={{ width: '100%', height: 'auto' }} />
    <p>
      Pilates is a great way to build strength and improve flexibility. With our
      instructors, you will focus on breath and posture while developing physical
      and mental balance. Personalized programs help you move toward a healthier,
      more balanced life.
    </p>
  </TeamText>

  <TeamText>
  
      <h2 style={{ textAlign: "center", color: 'white' }}>YOGA</h2>
  
    <img src={gymImageTwo} style={{ width: '100%', height: 'auto' }} />
    <p>
      Yoga brings body and mind together to help you find inner balance. Our
      classes for different experience levels can help you improve flexibility,
      reduce stress, and reconnect with your body. Find your balance with guidance
      from our instructors.
    </p>
  </TeamText>

  <TeamText>
  
      <h2 style={{ textAlign: "center", color: 'white' }}>FITNESS</h2>
 
    <img src={gymImageThree} style={{ width: '100%', height: 'auto' }} />
    <p>
      Fitness is an effective way to improve your overall health and strength. Our
      group classes and personal training sessions work every major muscle group
      and help you build a stronger, fitter body. Train in a motivating environment
      and work toward your goals.
    </p>
  </TeamText>

  <TeamText>
   
      <h2 style={{ textAlign: "center", color: 'white' }}>KICKBOXING</h2>
    
    <img src={gymImageOne} style={{ width: '100%', height: 'auto' }} />
    <p>
      Kickboxing builds physical endurance and offers a great way to relieve
      stress. Train with our instructors to develop your technique and confidence.
      Get stronger, feel more dynamic, and have fun along the way.
    </p>
  </TeamText>
</OurTeamContainer>
      </>
    );
  };

const Gallery = () => {
  return (
    <>
      <GalleryContainer>
        <h1 style={{ textAlign: "center" }}>GYM APP</h1>
        <br />
        <ImagesGrid>
          {Array.from({ length: 12 }, (_, index) => [gymImageOne, gymImageTwo, gymImageThree][index % 3]).map((src, index) => (
            <ImageWrapper key={index}>
              <StyledImage src={src} alt={`Gym image ${index + 1}`} />
            </ImageWrapper>
          ))}
        </ImagesGrid>
      </GalleryContainer>
      <br />
      <br />
    </>
  );
};


// Styled Components
const HeroSection = styled.div`
  position: relative;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const MotivationalText = styled.div`
  color: white;
  z-index: 1;
  text-align: center;
  position: relative;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const MainText = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubText = styled.p`
  font-size: 1.5rem;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// About Us Styled Components
const AboutUsContainer = styled.div`
  display: flex; /* Yatayda yan yana yerleştirmek için */
  justify-content: space-between; /* Boşluğu eşit dağıtmak için */
  
  margin: 20px; /* Üst ve alt margin */
  padding: 20px; /* İç boşluk */
`;

const AboutText = styled.div`
  flex: 1; /* Her bir dikdörtgen divin genişliğini ayarlamak için */
  margin: 20px; /* Divler arasında boşluk bırakmak için */
  padding: 20px; /* İçerik için alan */
  background-color: black; /* Koyu arka plan rengi */
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.8); /* Neon gölge efekti */
  color: #fff; /* Yazı rengi beyaz */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
  box-shadow: 0 0 20px rgba(57, 255, 20, 1); /* Daha belirgin kutu gölgesi */
}
`;

// Program Styled Components
const ProgramSection = styled.div`
  display: flex; /* Yatayda yan yana yerleştirmek için */
  justify-content: space-between; /* Boşluğu eşit dağıtmak için */
  margin: 20px; /* Üst ve alt margin */
  padding: 20px; /* İç boşluk */
  width: 80%;
  margin-left: 150px;

`;

const ProgramImage = styled.img`
  width: 50%; /* Resmin genişliğini ayarlamak için */
  height: auto; /* Yüksekliği orantılı tutmak için */
`;

const ProgramText = styled.div`
  flex: 1; /* Metin alanını genişletmek için */
  margin: 20px; /* Divler arasında boşluk bırakmak için */
  padding: 30px; /* İçerik için alan */
  background-color: black; /* Koyu arka plan rengi */
  color: #fff; /* Yazı rengi beyaz */
  margin-top: 50px;
`;


// Styled Components
const OurTeamContainer = styled.div`
  display: flex; /* Yatayda yan yana yerleştirmek için */
  justify-content: space-between; /* Boşluğu eşit dağıtmak için */
  
  margin: 20px; /* Üst ve alt margin */
  padding: 20px; /* İç boşluk */
`;

const TeamText = styled.div`
  flex: 1;
  margin: 20px;
  padding: 20px;
  background-color: black;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.8);
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
    box-shadow: 0 0 20px rgba(57, 255, 20, 1); /* Daha belirgin kutu gölgesi */
  }
`;

// Galeri için Styled Components
const GalleryContainer = styled.div`
  padding: 20px;
  
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 sütun */
  gap: 20px; /* Resimler arasında boşluk */
  
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Yükseklik, genişliğe eşit olacak şekilde ayarlandı */
  position: relative;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Resmin boyutunu koruyarak kapsama */
`;


export default Anasayfa;
