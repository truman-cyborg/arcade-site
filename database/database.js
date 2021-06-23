let express = require('express');
let bodyParser = require('body-parser');
let {Sequelize} = require('sequelize');
let app = express();
var sequelize = new Sequelize('postgres://postgres:qwe329@localhost/postgres');
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const User = sequelize.define('user',{
    name:{type: Sequelize.STRING} ,
    password: {type: Sequelize.STRING},
    image: {type: Sequelize.STRING},
    currentBalance: {type: Sequelize.INTEGER},  
    totalGain: {type: Sequelize.INTEGER}, 
});

//used to making new users
app.post('/formSubmit',function(request, response){
  console.log("SUBMITTING FORMS");
      console.log(request.body);
    const User = sequelize.define('user',{
    name:{type: Sequelize.STRING} ,
    password: {type: Sequelize.STRING},
    image: {type: Sequelize.STRING},
    currentBalance: {type: Sequelize.INTEGER}, 
    totalGain: {type: Sequelize.INTEGER}, 
    });
    User.sync().then(() => {
        User.create(request.body).then(response => response.send(response));
  })
  response.send("The form has been received");

});


//used for login in and seeing if the data matches with the input
app.get('/login/:name/:password', function(request, res) {
    const user = request.params.name;
    const password = request.params.password;
    console.log("LOGGING IN");
    console.log("USER: " + user);
    console.log("PASSWORD: " + password);
    //fine the one that matches the user name in the database
    //then see if the password match with the one in the database
    //if match => return the info of the account
    //else return a false value
    User.findOne({ where: { name: user } }).then((data) => {
        console.log("USER: " + data.name);
         console.log("PASSWORD: " + data.password);
        if(data.password === password){
            res.send(data);
        }else{
            res.send(false);
        }
    }).catch((error) => {
      res.send(false);
    });
  });


  //to update user with new total money
app.post('/updateMoney/:name', function(request, res) {
  const user = request.params.name;
  
  console.log("UPDATING MONEY");
  console.log("USER: " + user);
  
  //find the user then patch the data with the new total and currentBalance
    User.update(request.body, {
      where: { name: user }
      }).then(res => res.send(res));

      response.send("The form has been received");

     
});


//anything below is from old campus code 



  app.get('/getid/:id', function(request, res) {
    const id = request.params.id;
    User.findByPk(id).then((data) => {
        res.send(data);
    });
  }); 
app.get('/getAll', function(request, res) {
    User.findAll().then((data) => {
        res.send(data);
    });
  });

  app.get('/getid/:id', function(request, res) {
    const id = request.params.id;
    User.findByPk(id).then((data) => {
        res.send(data);
    });
  }); 

 //this works
 app.get('/login/:name', function(request, res){ 
    const name = request.params.name;
    User.destroy({
        where: { name: name }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
 });

 app.post('/patch/:id', function(request, res){ 
    const id = request.params.id;
    User.update(request.body, {
        where: { id: id }
      }).then(res => res.send(res));

      response.send("The form has been received");
    });
     
 

 console.log("Test");
app.listen(3001);