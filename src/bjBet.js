import './App';
import React from 'react';
 import ReactDOM from 'react-dom';
import Player from "./players";
import { Redirect } from 'react-router-dom';


class BJBet extends React.Component { 
    state = {
      redirect: null,
    };


placeBet = () => {
    if(localStorage.getItem("currentBalance") == 0){
        alert("Have a no money, please add money to your account")
        this.setState({ redirect: "/profile" });
        return;
    }else if(parseInt(document.getElementById("bet").value) > parseInt(localStorage.getItem("currentBalance"))){
        alert("Your betting value is higher than your curren balance");
        return;
    }

    localStorage.setItem("currentBet",document.getElementById("bet").value);
    this.setState({ redirect: "/blackjack" });

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
    <div className="center">
    <h1>Blackjack</h1>
    <h3>Current Balance: {localStorage.getItem("currentBalance")}</h3>
    <h3>Amount to bet:</h3> <br></br>
    <input id="bet" min="1" name="bet" max={localStorage.getItem("currentBalance")} type="number" /> <br></br>
    <button type="button" onClick={this.placeBet}> Bet</button>
    </div>
  );
}
}
export default BJBet;
