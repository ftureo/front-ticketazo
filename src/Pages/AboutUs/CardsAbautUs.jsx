import React, { useEffect, useState } from "react";
import CardList from "./CardList";

const CardsAboutUs = () => {
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/aboutus");
        const data = await response.json();
        setCardInfo(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CardList cards={cardInfo} />
    </div>
  );
};

export default CardsAboutUs;
