//controller class

const UserService = require('../service/user');

class UserController {
  async Register(req, res) {
    const {email,password} = req.body;
    // check input validity
    if (!(email && password)) {
      res.status(400).send("Both email and password required");
    }
    const user = await UserService.createUser(email,password); 
    res.json(user);
  }
  async Login(req, res) {
    const {email,password} = req.body;
    // check input validity
    if (!(email && password)) {
      res.status(400).send("Both email and password required");
    }
    const user = await UserService.LoginUser(email,password); 
    if(user != "failed"){
      res.status(200).json(user);
    }else{
      res.status(400).send("Invalid Credentials");
    }
    
  }
}

module.exports = new UserController();