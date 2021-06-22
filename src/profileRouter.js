import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LoginPage from './loginPage';
import Profile from './profile';
class ProfileRouter extends Component{

    state = {
        card: []
    }  

  async  componentDidMount(){
      if (localStorage.getItem("user") === ""){
        this.setState({card : <LoginPage/>})
      }else{
        this.setState({card : <Profile/>})
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

export default ProfileRouter;
