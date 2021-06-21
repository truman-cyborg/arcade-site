import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Logo from './logo';
import LoginPage from './loginPage';
import NewUser from './newUser';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
ReactDOM.render(
 
  <React.StrictMode>
    <Logo/>
    <BrowserRouter>
    <div>
    <div class="container">
    <div class="box-1">  
    <Link to="/" > Home </Link>
    </div>
    <div class="box-1">
    <Link to="/" > Games </Link>
    </div>
    <div class="box-1">
    <Link to="/loginPage" > login </Link>
    </div>  
    </div>  

    <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/loginPage" component={LoginPage}/>
    <Route exact path="/newUser" component={NewUser}/>
    </Switch>
   </div>
  </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
