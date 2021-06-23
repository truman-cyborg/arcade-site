import React from "react";
import scissors from "./scissors.png";
import paper from "./paper.png";
import rock from "./rock.png";

const Player = ({choice}) => (
    <>
        <div className = "player">
            <img className = "item-image" src={choice === "rock" ? rock: choice === "scissors" ? scissors: paper}
            alt="Rock Paper Scissors"/>
        </div>
    </>
);

export default Player;