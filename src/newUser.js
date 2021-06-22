import React,{Component} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';
class NewUser extends Component{

  
  state ={
    redirect: null
  }
    submit = async e =>
    {
      e.preventDefault();
      if(document.getElementById("loginUser").value.trim() === ""){
          alert("Please insert User");
          document.getElementById("loginUser").style.borderColor = "red"
          e.preventDefault();
          return;   
      }else{
          document.getElementById("loginUser").style.borderColor = "black"    
      }
      if(document.getElementById("loginPassword").value.trim() === ""){
          alert("Please insert password");
          document.getElementById("loginPassword").style.borderColor = "red";
          e.preventDefault();
          return;
      }else{
          document.getElementById("loginPassword").style.borderColor = "black"    
      }
  
     
        console.log("form is filled");
      
       //if everything is filled insert the data to the database with POST 
      const myData = {
        name: document.getElementById("loginUser").value.trim(),
        password: document.getElementById("loginPassword").value.trim(),
        currentBalance: 500,
        totalGain: 0
      }
      const url = "http://localhost:3001/formSubmit";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(myData),
          headers: { 'Content-Type': 'application/json'}
        }).then(() => {
          console.log("NEW USER MADE");
          this.setState({ redirect: "/profileRouter" });
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
      <div class="center">
        <form onSubmit={this.submit}> 
                <h3> New User form</h3> <br></br>
                <label for="user">User:</label> <br></br>
                <input id="loginUser" name="user" type="text" /> <br></br>

                <label for="password">Password:</label> <br></br>
                <input id="loginPassword" type="password" name="password"/> <br></br>
                <button> Submit</button> <br></br>
                
               
                
            </form>  
      </div>
    )
  }

}
export default NewUser;
