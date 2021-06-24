import React, { Component } from "react";
import Card from "./Card";

const DealersHand = props => {
  const { cards } = props;

  return (
    <div className='hand'>
      {cards.map((card, i) => (
        <Card key={i} className={card.cardClass} />
      ))}
    </div>
  );
};

export default DealersHand;