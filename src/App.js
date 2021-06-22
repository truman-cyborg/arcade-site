import React,{Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
class App extends Component{

  state = {
    user:localStorage.getItem("user") ,
    campusCard:[]
  };


  render(){
    return(
      <div>
       <h3>{localStorage.getItem("user")}</h3>
        
      </div>
    )
  }

}

export default App;
