import React from "react";
import scissors from "./img/scissors.png";
import paper from "./img/paper.png";
import rock from "./img/rock.png";

const Player = ({choice}) => (
    <>
        <div className = "player">
            <img className = "item-image" src={choice === "rock" ? rock: choice === "scissors" ? scissors: paper}
            alt="Rock Paper Scissors"/>
        </div>
    </>
);

export default Player;