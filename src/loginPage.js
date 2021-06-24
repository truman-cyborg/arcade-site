import React,{Component} from 'react';
import './App.css';
import { Redirect,Link } from 'react-router-dom';
class LoginPage extends Component{


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
        password: document.getElementById("loginPassword").value.trim()
      }

      console.log(myData.name)
      const url = "http://localhost:3001/login/" + myData.name + "/"+ myData.password;
      console.log(url)
      try{
        const response = await fetch(url, {
            method: "GET"
          }).then(response => response.json())
          .then(responseJson => {
             console.log("line 41", responseJson);
              if(responseJson === false){
                alert("wrong user and/or password");
              }else{
                
                localStorage.setItem("user",responseJson.name);
                localStorage.setItem("currentBalance", responseJson.currentBalance.toString());
                localStorage.setItem("totalGain", responseJson.totalGain.toString());
                localStorage.setItem("Url", responseJson.image.toString());
                console.log(localStorage.getItem("user"));
                console.log(localStorage.getItem("currentBalance"));
                console.log(localStorage.getItem("totalGain"));
                window.location.reload(false);
                //add data to localStorage
                //redirect to home page 
              }   
           })
           .catch((error) => {
              console.log("Failed to retrieve trending gifs");
            });
          console.log(response);
      }catch(err) {
        console.error(err.message);
      }
       
    }  

  render(){
    return(
      <div class="center">
        <form> 
                <h3> Login User</h3> <br></br>
                <label for="user">User:</label> <br></br>
                <input id="loginUser" name="user" type="text" /> <br></br>
                <label for="password">Password:</label> <br></br>
                <input id="loginPassword" type="password" name="password"/> <br></br>
                <button onClick={this.submit}> Submit</button> <br></br>
                <Link to={"/newUser/"} > 
                <button> New User</button>
                </Link> 
                
               
                
            </form>  
      </div>
    )
  }

}
export default LoginPage;
