import React,{Component} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

class Games extends Component{

    state = {
        redirect: null
    }  

    print = async e =>  {
      this.setState({ redirect: "/cointoss" });
    };
  
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
          <div>
              <div className="container">
              <div className="box-3">
                 <img onClick={this.print} src="https://media.tenor.com/images/60b3d58b8161ad9b03675abf301e8fb4/tenor.gif"  width="200" height="200"/>
                 </div>
              </div>   
          </div>
        )
      }
}

export default Games;
