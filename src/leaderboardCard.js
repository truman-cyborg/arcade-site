import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
class LeaderBoardCard extends Component{

  render(){
    return(
       <div className="center">
           <div className="box-1"> 
           <tr>
             <td>{this.props.card.name} </td>
             <td> {this.props.card.totalGain}</td>
          </tr>
          </div>
      </div>
    )
  }

}

export default LeaderBoardCard;
