import React,{Component} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';
class EditPic extends Component{

  
  state ={
    redirect: null
  }
    submit = async e =>
    {
      e.preventDefault();
      if(document.getElementById("picture").value.trim() === ""){
          alert("Please insert picture url");
          document.getElementById("picture").style.borderColor = "red"
          e.preventDefault();
          return;   
      }else{
          document.getElementById("picture").style.borderColor = "black"    
      }
     
  
      
       //if everything is filled insert the data to the database with POST 
      const myData = {
        image: document.getElementById("picture").value.trim(),
      }
      const url = "http://localhost:3001/updateMoney/"+ localStorage.getItem("user");
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(myData),
          headers: { 'Content-Type': 'application/json'}
        }).then(() => {
          localStorage.setItem("Url", document.getElementById("picture").value.trim());
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
                <label for="user">Picture Url:</label> <br></br>
                <input id="picture" name="user" type="text" /> <br></br>
                <button> Submit</button> <br></br>
                
               
                
            </form>  
      </div>
    )
  }

}
export default EditPic;
