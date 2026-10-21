import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_BASE_URL } from "../api";

const SporPlanlari = () => {
  const [submittingMonths, setSubmittingMonths] = useState(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionError, setSubscriptionError] = useState(false);
  const [plans, setPlans] = useState([
    { title: "1 AYLIK PLAN", months: 1, price: "Yükleniyor..." },
    { title: "3 AYLIK PLAN", months: 3, price: "Yükleniyor..." },
    { title: "6 AYLIK PLAN", months: 6, price: "Yükleniyor..." },
    { title: "12 AYLIK PLAN", months: 12, price: "Yükleniyor..." }
  ]);

  const subscribeToPlan = async (months) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setSubscriptionError(true);
      setSubscriptionMessage("התחברי לחשבון לפני בחירת תוכנית.");
      return;
    }

    setSubmittingMonths(months);
    setSubscriptionError(false);
    setSubscriptionMessage("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/subscriptions`,
        { months },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSubscriptionMessage(`המנוי הופעל עד ${response.data.endDate}.`);
    } catch (error) {
      setSubscriptionError(true);
      setSubscriptionMessage(error.response?.status === 401 || error.response?.status === 403
        ? "ההתחברות פגה. התחברי מחדש ונסי שוב."
        : "לא ניתן להפעיל את התוכנית כרגע. נסי שוב.");
    } finally {
      setSubmittingMonths(null);
    }
  };

  useEffect(() => {
    // Axios ile fiyatları çekme
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/prices`
        );
        const { oneMonths, threeMonths, sixMonths, twelveMonths } = response.data;
        
        // Planları güncelleme
        setPlans([
          { title: "1 AYLIK PLAN", months: 1, price: `${oneMonths} TL / Ay` },
          { title: "3 AYLIK PLAN", months: 3, price: `${threeMonths} TL / 3 Ay` },
          { title: "6 AYLIK PLAN", months: 6, price: `${sixMonths} TL / 6 Ay` },
          { title: "12 AYLIK PLAN", months: 12, price: `${twelveMonths} TL / 12 Ay` }
        ]);
      } catch (error) {
        console.error("Fiyatları alırken hata oluştu:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <>
      <PlanContainer>
        {plans.map((plan, index) => (
          <Plan key={index}>
            <h2>{plan.title}</h2>
            <p>{plan.price}</p>
            <PriceButton
              type="button"
              onClick={() => subscribeToPlan(plan.months)}
              disabled={submittingMonths !== null}
            >
              {submittingMonths === plan.months ? "נרשם..." : "בחרי תוכנית"}
            </PriceButton>
          </Plan>
        ))}
      </PlanContainer>
      {subscriptionMessage && (
        <SubscriptionMessage role="status" $error={subscriptionError}>
          {subscriptionMessage}
        </SubscriptionMessage>
      )}
      <br />
      <br />
    </>
  );
};

// Styled Components
const PlanContainer = styled.div`
  display: grid;
  width: 130%;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  text-align: center;
  margin-top: 140px;
  margin-left: 50px;
  padding: 20px;
  background-color: black;
  color: #fff;
`;

const Plan = styled.div`
  background-color: #222;
  padding: 20px;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.8);
  }
`;

const PriceButton = styled.button`
  background-color: rgba(57, 255, 20, 0.8);
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(57, 255, 20, 1);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

const SubscriptionMessage = styled.p`
  color: ${({ $error }) => ($error ? "#ff6b6b" : "#39ff14")};
  text-align: center;
`;

export default SporPlanlari;
