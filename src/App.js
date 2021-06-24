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
       <div className="container">
       <div className="box-1">
         <h1>GET 500 FREE POINTS WITH NEW ACCOUNT</h1>
       </div>
       <div className="box-1">
         <img src="https://i.kym-cdn.com/photos/images/newsfeed/000/131/896/gaijin4koma2_peersblog_1200684608.jpg?1307579749" />
       </div>
       </div>
      </div>
    )
  }

}

export default App;
