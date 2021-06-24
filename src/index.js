import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./styles/index.scss";
import LoginPage from './loginPage';
import NewUser from './newUser';
import Profile from './profile';
import EditPic from './editPic';
import ProfileRouter from './profileRouter';
import GameRouter from './gameRouter';
import reportWebVitals from './reportWebVitals';
import Cointoss from './coinToss';
import RPS from './RPS';
import Game from './Components/Game/Game';
import BJBet from './bjBet';
import LeaderBoard from './leaderboard';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
ReactDOM.render(

  <React.StrictMode>
    <img id ="logo" src="https://i.pinimg.com/564x/0a/af/7b/0aaf7bc9cd18138505c1dd66bf1d0bbf.jpg" width="600" height="100"/>
    <BrowserRouter>
    <div>
    <div class="container">
    <div class="box-3">  
    <Link to="/" > <h2>Home</h2> </Link>
    </div>
    <div class="box-3">
    <Link to="/gameRouter" > <h2>Game</h2> </Link>
    </div>
    <div class="box-3">
    <Link to="/leaderboard" > <h2>LeaderBoard</h2> </Link>
    </div>
    <div class="box-3">
    <Link to="/profileRouter" > <h2>Profile</h2> </Link>
    </div>  
    </div>  

    <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/loginPage" component={LoginPage}/>
    <Route exact path="/newUser" component={NewUser}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/profileRouter" component={ProfileRouter}/>
    <Route exact path="/gameRouter" component={GameRouter}/>
    <Route exact path="/editpic" component={EditPic}/>
    <Route exact path="/cointoss" component={Cointoss}/>
    <Route exact path="/rps" component={RPS}/>
     <Route exact path="/blackjack" component={Game}/> 
     <Route exact path="/blackjackbet" component={BJBet}/> 
     <Route exact path="/leaderboard" component={LeaderBoard}/> 
    </Switch>
   </div>
  </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
