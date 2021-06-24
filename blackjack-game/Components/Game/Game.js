import React, { Component } from "react";
import Hand from "./Hand";
import DealersHand from "./DealersHand";
import cards from "../../assets/cards";

class Game extends Component {
  state = {
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
    console.log(deckCards[randomIndex]);
    deckCards.splice(randomIndex, 1);

    const statesToSet = {
      dealerScore: dealerScore,
      dealerCards: dealerCards,
      deck: deckCards
    };

    if (dealerCards.length === 2) {
      if (playerScore !== 21 && dealerScore < 15) {
        const randomIndex = Math.floor(Math.random() * deckCards.length);
        dealerScore += deckCards[randomIndex].cardValue;
        dealerCards.push(deckCards[randomIndex]);
        console.log(deckCards[randomIndex]);
        deckCards.splice(randomIndex, 1);
        statesToSet.deck = deckCards;
        statesToSet.dealerCards = dealerCards;
        statesToSet.dealerScore = dealerScore;
        this.setState(statesToSet);
      }

      if (dealerScore === playerScore && dealerScore < 21 && playerScore < 21) {
        statesToSet.draw = true;
        statesToSet.dealerScore += dealerCards[0].cardValue;
      } else if (
        playerScore === 21 ||
        (dealerScore < playerScore && playerScore < 21) ||
        (dealerScore > 21 && playerScore < 21)
      ) {
        statesToSet.playerWin = true;
        statesToSet.dealerScore += dealerCards[0].cardValue;
      } else if (
        dealerScore === 21 ||
        (dealerScore > playerScore && dealerScore < 21) ||
        playerScore > 21
      ) {
        statesToSet.dealerWin = true;
        statesToSet.dealerScore += dealerCards[0].cardValue;
      }
    }
  };

  startNewGame = () => {
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
      playerWin = true;
      
    }
    if (playerScore > 21) {
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

  render() {
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
