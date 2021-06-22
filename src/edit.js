import React,{Component} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';
class EditCampus extends Component{

//this is for later when we have free time
    state ={
        redirect: null,
        id:"",
        cname: "",
        image: "",
        address: "",
        description: "",
    }

    async  componentDidMount(){
       }

      handleFormChanges =(event) => {
        // This accesses the name of the input  field
        let nam = event.target.name; 
        //The following accesses the value inside the input field
        let val = event.target.value;
        this.setState({ [nam]:val });
      }     
  
  //if we submit but some parts are missing
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
    //if everything is filled insert the data to the database with PATCH
    // const myData = {
    //   campusName: document.getElementById("campusName").value.trim(),
    //   campusLocation: document.getElementById("campusLocation").value.trim(),
    //   campusImageURL: document.getElementById("campusImage").value.trim(),
    //   campusDescription: document.getElementById("campusDescription").value.trim(),
    //   }
    //   const {params} = this.props.match;
    //   const url = "http://localhost:3001/patch/"+params.id;
    //   try {
    //     const response = await fetch(url, {
    //       method: "POST",
    //       body: JSON.stringify(myData),
    //       headers: { 'Content-Type': 'application/json'}
    //     }).then(() => {
    //       this.setState({ redirect: "/" });
    //     });
    //     console.log(response);
    //   } catch (err) {
    //     console.error(err.message);
    //   } 
    

    e.preventDefault();
  }


  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <div>
       
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
      </div>
    )
  }

}
export default EditCampus;
