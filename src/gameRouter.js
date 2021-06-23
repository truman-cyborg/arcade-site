import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Games from './games';
import LoginPage from './loginPage';    
class GameRouter extends Component{

    state = {
        card: []
    }  

  async  componentDidMount(){
      if (localStorage.getItem("user") === "" || localStorage.getItem("user") === undefined){
        this.setState({card : <LoginPage/>})
      }else{
        this.setState({card : <Games/>})
      }
  }
    render(){
        return(
          <div>
              {this.state.card}
          </div>
        )
      }
}

export default GameRouter;
