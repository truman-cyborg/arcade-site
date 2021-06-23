import React from 'react';
import './App.css';
import heads from './img/heads.png';
import tails from './img/tails.png';
import Coin from './coin';
import { Redirect } from 'react-router-dom';

class Cointoss extends React.Component {
    static defaultProps = { coinSide: [heads, tails]};
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            flipping: false,
             front: this.props.coinSide[0],
            back: this.props.coinSide[0]
        }
    }


    randomSide = () => {
        return this.props.coinSide[Math.floor(Math.random() * this.props.coinSide.length)];
    }

    flipCoin = () =>{
        if(localStorage.getItem("currentBalance") == 0){
            alert("Have a no money, please add money to your account")
            this.setState({ redirect: "/profile" });
            return;
        }else if(parseInt(document.getElementById("bet").value) > parseInt(localStorage.getItem("currentBalance"))){
            alert("Your betting value is higher than your curren balance");
            return;
        }

        if(document.getElementById("side").value == "Head"){
            this.setState({front: this.props.coinSide[0]})
            console.log(document.getElementById("side").value)
        }else{
            this.setState({front: this.props.coinSide[1]})
            console.log(document.getElementById("side").value)
        }

        this.setState({flipping: true});
        let face = this.randomSide();
        console.log(face);

        setTimeout(() =>{
            this.setState({
                // front: face === heads ? this.props.coinSide[0] : this.props.coinSide[1], 
                 back: face === heads ? this.props.coinSide[0] : this.props.coinSide[1],
                results : this.results()
            })
        },50)

        setTimeout(() =>{
            this.setState({flipping: false, results: ""});
        }, 500);
        //do comparision here
    }

    results = () =>{

        let amountBetted = parseInt(document.getElementById("bet").value);
        const {front,back} = this.state;
        console.log("You: " + front + " Coin : " + back);
        if(front === back){
            console.log("You Win");
            let newCurrent = parseInt(localStorage.getItem("currentBalance")) + amountBetted;
            let newTotal = parseInt(localStorage.getItem("totalGain")) + amountBetted;
            const myData = {
                currentBalance: newCurrent,
                totalGain: newTotal
                }
                this.updateMoney(myData);    
            return "You Win!";
        }else{
            let newCurrent = parseInt(localStorage.getItem("currentBalance")) - amountBetted;
            let newTotal = parseInt(localStorage.getItem("totalGain")) - amountBetted;
            console.log("You Lost");
            const myData = {
                currentBalance: newCurrent,
                totalGain: newTotal
                }
                this.updateMoney(myData);
            return "You Lost";
        }
    }

    updateMoney = async (myData) =>{
        const url = "http://localhost:3001/updateMoney/"+ localStorage.getItem("user");
         
         try {
           const response = await fetch(url, {
             method: "POST",
             body: JSON.stringify(myData),
             headers: { 'Content-Type': 'application/json'}
           }).then(() => {
            localStorage.setItem("currentBalance", myData.currentBalance.toString())
            localStorage.setItem("totalGain", myData.totalGain.toString())
            window.location.reload(false);
           });
           console.log(response);
         } catch (err) {
           console.error(err.message);
         } 
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
            <div id="CoinGame">
                <h1>Coin Flip</h1>
                <div className='flip-coin'>
                    {/* <div className='flip-coin-front'>
                        <Coin face={this.state.front} /> 
                    </div> */}
                    <div className='flip-coin-back'>
                        <Coin face={this.state.back} /> 
                    </div>  
                </div>
                <h3>Current Balance: {localStorage.getItem("currentBalance")}</h3>
                <label for="side">What side do you bet on:</label>
                <select name="side" id="side">
                 <option value="Head">Head</option>
                 <option value="Tail">Tail</option>
                </select> <br></br>
                <label for="bet">Amount to bet: </label> <br></br>
                <input id="bet" min="1" name="bet" max={localStorage.getItem("currentBalance")} type="number" /> <br></br>
                <button onClick={this.flipCoin}>
                    Toss!
                </button>
                <div className="results"> {this.state.results ? this.results():null}</div> 
            </div>
        )
    }

}
export default Cointoss;