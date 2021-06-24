import React,{Component} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

class Games extends Component{

    state = {
        redirect: null
    }  

    sentToCoin = async e =>  {
      this.setState({ redirect: "/cointoss" });
    };

    sentToRPS = async e =>  {
        this.setState({ redirect: "/rps" });
      };

      sentToBJ = async e =>  {
        this.setState({ redirect: "/blackjackbet" });
      };
  
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
          <div>
              <div className="container">
              <div className="box-3">
                 <img onClick={this.sentToCoin} src="https://media.tenor.com/images/60b3d58b8161ad9b03675abf301e8fb4/tenor.gif"  width="200" height="200"/>
                 <img onClick={this.sentToRPS} src="https://i.pinimg.com/originals/3b/f2/f4/3bf2f45865bc4a63a663611ea357de4c.gif"  width="200" height="200"/>
                 <img onClick={this.sentToBJ} src="https://bamcasinoparties.com/wp-content/uploads/2018/04/blackjack.gif"  width="200" height="200"/>
                 </div>
              </div>   
          </div>
        )
      }
}

export default Games;
