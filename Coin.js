import './CoinToss';
import React from 'react';
import './Coin.css';

class Coin extends React.Component{
    render(){
        return(<img className='Coinimg' src={this.props.face} alt={`coin showing ${this.props.face}`}/>
        )}
}
export default Coin;
