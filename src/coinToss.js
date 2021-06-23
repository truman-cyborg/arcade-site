import React from 'react';
import './App.css';
import heads from './img/heads.png';
import tails from './img/tails.png';
import Coin from './coin';


class Cointoss extends React.Component {
    static defaultProps = { coinSide: [heads, tails]};
    constructor(props){
        super(props);
        this.state = {
            flipping: false,
            front: this.props.coinSide[0],
            back: this.props.coinSide[0]
        }
    }


    randomSide = () => {
        return this.props.coinSide[Math.floor(Math.random() * this.props.coinSide.length)];
    }

    flipCoin = () =>{
        this.setState({flipping: true});
        let face = this.randomSide();
        console.log(face);

        setTimeout(() =>{
            this.setState({
                front: face === heads ? this.props.coinSide[0] : this.props.coinSide[1], 
                back: face === heads ? this.props.coinSide[1] : this.props.coinSide[0],
            })
        },50)

        setTimeout(() =>{
            this.setState({flipping: false});
        }, 500);
    }

    render(){
        return(
            <div id="CoinGame">
                <h1>Coin Flip</h1>
                <div className='flip-coin'>
                    <div className='flip-coin-front'>
                        <Coin face={this.state.front} /> 
                    </div>
                    <div className='flip-coin-back'>
                        <Coin face={this.state.back} /> 
                    </div>  
                </div>
                <button onClick={this.flipCoin}>
                    Toss!
                </button>
            </div>
        )
    }

}
export default Cointoss;