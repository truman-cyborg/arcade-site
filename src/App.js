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
         <h1>GET 500 FREE POINTS WHEN MAKING A NEW ACCOUNT</h1>
       </div>
       <div className="box-1">
         <img src="https://i.kym-cdn.com/photos/images/newsfeed/000/131/896/gaijin4koma2_peersblog_1200684608.jpg?1307579749" />
       </div>
       </div>

       <div className="container">
       <div className="box-1">
        <h1>About us</h1> <br></br>
        <h3>We are a site that does 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        
        </h3>
       </div>
       </div>

       <div className="container">
       <div className="box-1">
        <h1>See why over 5 million people have played.</h1> <br></br>
       </div>
       </div>

       <div className="container">
       <div className="box-3" >
        <h1>Truman</h1> <br></br>
        <h3> I been playing on this site for 5 years. Even though this site takes no money, I have lost everything
          from my job to my family. I am currently playing at the public libary.
        </h3>
       </div>

       <div className="box-3">
       <h1>Bryant</h1> <br></br>
       <h3> I been playing on this site for 5 years. Even though this site takes no money. I lost everything
          from my job to my family. I am currently playing at the public libary.
        </h3>
       </div>

       <div className="box-3">
       <h1>Some Mean Person</h1> <br></br>
       <h3> Got there at 7:49pm expecting to place a large order for the family... And was turned away, because 
         clearly they care more about being out of the shop at 8pm (their published closing time) than about running a profitable restaurant with satisfied customers.
        </h3>
       </div>

       </div>
      </div>
    )
  }

}

export default App;
