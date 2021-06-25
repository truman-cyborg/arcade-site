import React, { Component } from "react";
import Hand from "./Hand";
import DealersHand from "./DealersHand";
import cards from "../../assets/cards";
import { Redirect } from 'react-router-dom';
class Game extends Component {
  state = {
    redirect: null,
    deck: [...cards],
    playerCards: [],
    dealerCards: [],
    playerScore: 0,
    dealerScore: 0,
    playerWin: false,
    dealerWin: false,
    draw: false,
  };

  getRandomCards = () => {
    for (let i = 0; i < 2; i++) {
      setTimeout(this.getPlayerCard, 100);
    }
    this.getDealerCard();
  };

  getDealerCard = () => {
    const { deck, dealerCards, playerScore, money, bet } = this.state;
    let { dealerScore } = this.state;
    const deckCards = deck.length > 0 ? deck : [...cards];

    const randomIndex = Math.floor(Math.random() * deckCards.length);
    dealerScore += deckCards[randomIndex].cardValue;
    dealerCards.push(deckCards[randomIndex]);
    deckCards.splice(randomIndex, 1);

    const statesToSet = {
      dealerScore: dealerScore,
      dealerCards: dealerCards,
      deck: deckCards,
      bet: 5
    };

    if (dealerCards.length === 2) {
      if (playerScore !== 21 && dealerScore < 15) {
        const randomIndex = Math.floor(Math.random() * deckCards.length);
        dealerScore += deckCards[randomIndex].cardValue;
        dealerCards.push(deckCards[randomIndex]);
        deckCards.splice(randomIndex, 1);
        statesToSet.deck = deckCards;
        statesToSet.dealerCards = dealerCards;
        statesToSet.dealerScore = dealerScore;
        this.setState(statesToSet);
      }

      if (dealerScore === playerScore && dealerScore < 21 && playerScore < 21) {
        statesToSet.draw = true;
        statesToSet.money = money + bet;
      } else if (
        playerScore === 21 ||
        (dealerScore < playerScore && playerScore < 21) ||
        (dealerScore > 21 && playerScore < 21)
      ) {
        this.win();
        statesToSet.playerWin = true;
        statesToSet.money = money + bet * 2;
      } else if (
        dealerScore === 21 ||
        (dealerScore > playerScore && dealerScore < 21) ||
        playerScore > 21
      ) {
        this.lost()
        statesToSet.dealerWin = true;
        statesToSet.money = money - bet;
      }
    }
  };

  startNewGame = () => {
    if(parseInt(localStorage.getItem("currentBet")) >  parseInt(localStorage.getItem("currentBalance"))){
      alert("Have a no money, please add money to your account");
      this.setState({ redirect: "/profile" });
    }

    this.setState({
      gameStarted: false,
      deck: [],
      playerCards: [],
      dealerCards: [],
      playerScore: 0,
      dealerScore: 0,
      playerWin: false,
      dealerWin: false,
      draw: false
    });
  };

  getPlayerCard = () => {
    const { deck, playerCards, bet } = this.state;
    let { playerScore, playerWin, dealerWin, money } = this.state;
    const deckCards = deck.length > 0 ? deck : [...cards];
    const randomIndex = Math.floor(Math.random() * deckCards.length);
    playerScore += deckCards[randomIndex].cardValue;
    playerCards.push(deckCards[randomIndex]);
    deckCards.splice(randomIndex, 1);
    
    if (playerScore === 21) {
      this.win()
      playerWin = true;
      
    }
    if (playerScore > 21) {
      this.lost()
      dealerWin = true;
     
    }
    this.setState({
      deck: deckCards,
      playerCards: playerCards,
      playerScore: playerScore,
      playerWin: playerWin,
      dealerWin: dealerWin,
    });
  };

  endRound = () => {
    this.getDealerCard();
  };


  componentDidMount() {
    this.getRandomCards(4);
  }

  componentDidUpdate() {
    if (this.state.deck.length === 0) {
      this.getRandomCards();
    }
  }

  win = () =>{
    let newCurrent = parseInt(localStorage.getItem("currentBalance")) + parseInt(localStorage.getItem("currentBet"));
        let newTotal = parseInt(localStorage.getItem("totalGain")) + parseInt(localStorage.getItem("currentBet"));
        console.log("You Lost");
        const myData = 
        {
            currentBalance: newCurrent,
            totalGain: newTotal
          }
        this.updateMoney(myData);
  }

  lost = () =>{
    let newCurrent = parseInt(localStorage.getItem("currentBalance")) - parseInt(localStorage.getItem("currentBet"));
        let newTotal = parseInt(localStorage.getItem("totalGain")) - parseInt(localStorage.getItem("currentBet"));
        console.log("You Lost");
        const myData = 
        {
            currentBalance: newCurrent,
            totalGain: newTotal
          }
        this.updateMoney(myData);
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
       });
       console.log(response);
     } catch (err) {
       console.error(err.message);
     } 
}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const {
      dealerScore,
      playerScore,
      dealerCards,
      playerCards,
      playerWin,
      dealerWin,
      draw
    } = this.state;

      return (
        <div className='col-md-12 col-xs-12'>
          <h1>Current Balance: {localStorage.getItem("currentBalance")} Bet Amount: {localStorage.getItem("currentBet")}</h1>
          <DealersHand cards={dealerCards} />
          <div className='panel'>
            <h3>Dealer's score: {dealerScore}</h3>
          </div>
          <Hand cards={playerCards} />
          {draw || playerWin || dealerWin ? (
            <div className='game-status'>
              {dealerWin ? <div className='info lose'>You lost.</div> : null}
              {playerWin ? <div className='info win'> You won!</div> : null}
              {draw ? <div className='info draw'>Draw.</div> : null}
              <div>
                <div className='buttons'>
                  <button className='game-button' onClick={this.startNewGame}>
                    Play again
                  </button>
                  
                </div>
              </div>
            </div>
          ) : null}
          <div className='panel'>
            <h3>Your score: {playerScore}</h3>
          </div>
          <div className='panel'>
            <button
              className='game-button'
              onClick={this.getPlayerCard}
              disabled={playerScore > 20 || playerWin || dealerWin || draw}>
              Hit
            </button>
            <button
              className='game-button'
              onClick={this.endRound}
              disabled={playerScore > 20 || playerWin || dealerWin || draw}>
              Stand
            </button>
          </div>
        </div>
      );
  }
}

export default Game;