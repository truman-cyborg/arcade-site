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
        
      </div>
    )
  }

}

export default App;
