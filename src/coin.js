  
import './coinToss';
import React from 'react';


class Coin extends React.Component{
    render(){
        return(<img className='Coinimg' src={this.props.face} alt={`coin showing ${this.props.face}`}/>
        )}
}
export default Coin;