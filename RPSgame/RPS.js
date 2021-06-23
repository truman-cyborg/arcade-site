import './Rock.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Player from "./players";

const choice = ["rock", "paper", "scissors"];

class App extends React.Component { 
    state = {
      myChoice: choice[0],
      opChoice: choice[0],
      playerWon: ""
    };

start = () =>{
  let counter = 0;
  let inter = setInterval(() =>{
    counter++;
    this.setState({
      opChoice: choice[Math.floor(Math.random() * 3)],
      playerWon: ""
    });
    if(counter > 5){
      clearInterval(inter);
      this.setState({
        playerWon: this.selectWinner()
      });
    }
  }, 100);
};

selectItem = choice => {
  this.setState({
    myChoice: choice,
    playerWon: ""
  });
};

selectWinner = () => {
  const {myChoice, opChoice} =this.state;
  console.log("p1" + myChoice + "p2"+ opChoice);
  
  if((myChoice === "rock" && opChoice === "scissors") || (myChoice === "scissors" && opChoice === "paper") ||
  (myChoice === "paper" && opChoice === "rock")){
    return "You win!";
  }else if(myChoice === opChoice){
      return "Tied!";
    }else{
    return "Lost!";
  }
}

  render(){
    const {myChoice, opChoice, playerWon} = this.state;
  return (
    <div className="RPS">
      <div>
        <h1>Rock Paper Scissors</h1>
        <h1>Player</h1>
        <h1>Opponent</h1>
        <p>Score:</p>
      </div>
      <div>
        <Player choice={myChoice}/>
        <Player choice={opChoice}/>
      </div>
      <div className="buttons">
        <button className="selectHand" onClick={() =>this.selectItem("rock")}>Rock</button>
        <button className="selectHand" onClick={() =>this.selectItem("paper")}>Paper</button>
        <button className="selectHand" onClick={() =>this.selectItem("scissors")}>Scissors</button>
      </div>
      <div id="winner">{playerWon ? this.selectWinner() : null}</div>
      <button type="button" onClick={this.start}> Start</button>
    </div>
  );
}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
