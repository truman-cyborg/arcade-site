import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import LeaderBoardCard from './leaderboardCard';
class LeaderBoard extends Component{

  state = {
    user:localStorage.getItem("user") ,
    user:[],
    leaderboard: []
  };


   compare = ( a, b ) => {
    if ( a.totalGain < b.totalGain ){
      return -1;
    }
    if ( a.totalGain > b.totalGain ){
      return 1;
    }
    return 0;
  }



  async componentDidMount(){
    
    
    const url = "http://localhost:3001/getAll";
    try {
     const response = await fetch(url, {
       method: "GET"
     }).
     then(response => response.json())
     .then(responseJson => {
       console.log(responseJson);
       console.log('FILLER');
       //console.log(response);
       this.setState({user: responseJson});
       console.log(this.state.user);
       console.log("amount of user is " + this.state.user.length);
     }).then(() =>{
      this.setState({user: this.state.user.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))});
      console.log(this.state.user);
       for(let i in this.state.user){
         console.log(this.state.user[i]);
         var joined = this.state.leaderboard.concat(<LeaderBoardCard card={this.state.user[i]}/>);
         this.setState({ leaderboard: joined });
       }
     });
   } catch (err) {
     console.error(err.message);
   } 
    
   };
 

  render(){
    return(
       <div className="center">
         {this.state.leaderboard}
      </div>
    )
  }

}

export default LeaderBoard;
