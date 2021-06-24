import './App';
import React from 'react';
 import ReactDOM from 'react-dom';
import Player from "./players";
import { Redirect } from 'react-router-dom';

const choice = ["rock", "paper", "scissors"];

class RPS extends React.Component { 
    state = {
      redirect: null,
      myChoice: choice[0],
      opChoice: choice[0],
      playerWon: ""
    };

start = () =>{
    if(localStorage.getItem("currentBalance") == 0){
        alert("Have a no money, please add money to your account")
        this.setState({ redirect: "/profile" });
        return;
    }else if(parseInt(document.getElementById("bet").value) > parseInt(localStorage.getItem("currentBalance"))){
        alert("Your betting value is higher than your curren balance");
        return;
    }
    

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
  
  let amountBetted = parseInt(document.getElementById("bet").value);
  
  if((myChoice === "rock" && opChoice === "scissors") || (myChoice === "scissors" && opChoice === "paper") ||
  (myChoice === "paper" && opChoice === "rock")){
    let newCurrent = parseInt(localStorage.getItem("currentBalance")) + amountBetted;
    let newTotal = parseInt(localStorage.getItem("totalGain")) + amountBetted;
    const myData = {
        currentBalance: newCurrent,
        totalGain: newTotal
        }
    this.updateMoney(myData);      
    return "You win!";
  }else if(myChoice === opChoice){
      return "Tied!";
    }else{
    let newCurrent = parseInt(localStorage.getItem("currentBalance")) - amountBetted;
    let newTotal = parseInt(localStorage.getItem("totalGain")) - amountBetted;
    const myData = {
       currentBalance: newCurrent,
       totalGain: newTotal
        }
            this.updateMoney(myData);    
    return "Lost!";
  }
}

updateMoney = async (myData) =>{
    const url = "http://localhost:3001/updateMoney/"+ localStorage.getItem("user");
     
     try {
       const response = await fetch(url, {
         method: "POST",
         body: JSON.stringify(myData),
         headers: { 'Content-Type': 'application/json'}
       }).then(() => {
        localStorage.setItem("currentBalance", myData.currentBalance.toString())
        localStorage.setItem("totalGain", myData.totalGain.toString())
        window.location.reload(false);
       });
       console.log(response);
     } catch (err) {
       console.error(err.message);
     } 
}
  render(){
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
    const {myChoice, opChoice, playerWon} = this.state;
  return (
    <div className="RPS">
      <div>
        <h1>Rock Paper Scissors</h1>
      </div>
      <div>
        <Player choice={myChoice}/>
        <Player choice={opChoice}/>
      </div>
      <div className="center">
      <h3>Current Balance: {localStorage.getItem("currentBalance")}</h3>
      <h3>Amount to bet:</h3> <br></br>
      <input id="bet" min="1" name="bet" max={localStorage.getItem("currentBalance")} type="number" /> <br></br>
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
export default RPS;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<RPS/>, rootElement);