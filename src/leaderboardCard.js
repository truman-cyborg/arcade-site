import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
class LeaderBoardCard extends Component{

  render(){
    return(
       <div className="container">
           <div className="box-3"> 
           <h3>{this.props.card.name} </h3>
          </div>
          <div className="box-3">
          <h3> {this.props.card.totalGain}</h3>
          </div>
      </div>
    )
  }

}

export default LeaderBoardCard;
