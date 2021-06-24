import React, { Component } from "react";
import Card from "./Card";

const Hand = props => {
  const cards = props.cards.map((card, i) => (
    <Card key={i} className={card.cardClass} />
  ));

  return <div className='hand'>{cards}</div>;
};

export default Hand;