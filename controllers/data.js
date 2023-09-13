//controller class

const DataService = require('../service/data');
const UserService = require('../service/user');
const jwt = require('jsonwebtoken');

class DataController {
  async createData(req, res) {
    // Get the token from the request header
    const token = req.header('Authorization');

    // If there is no token, return an error
    if (!token) {
       return res.status(401).json({ message: 'Unauthorized' });
    }try{
    // Verify the token
        const user = await UserService.verifyToken(req.headers.authorization);
        // console.log("User: "+user);
        const uid = user._id;
        const {Age} = req.body;
    // check input validity
        if (!(Age)) {
            res.status(400).send("Age required");
        }
    //call createData function
        const data = await DataService.createData(uid,Age); 
        res.json(data);
    }catch(error){
        res.json({message:"Error in authenticatoin"})
    }
  }

  async editData(req, res) {
    // Get the token from the request header
    const token = req.header('Authorization');

    // If there is no token, return an error
    if (!token) {
       return res.status(401).json({ message: 'Unauthorized' });
    }try{
    // Verify the token
        const user = await UserService.verifyToken(req.headers.authorization);
        // console.log("User: "+user);
        const uid = user._id;
        const {id,Age} = req.body;
    // check input validity
        if (!(Age)) {
            res.status(400).send("Age required");
        }
    //call createData function
        try{
          const data = await DataService.editData(id,uid,Age); 
          res.json(data);
        }catch(error){
          console.log("Error in function call")
        }
        
    }catch(error){
        res.json({message:"Error in authenticatoin"})
    }
  }

  async ViewData(req, res){
    const token = req.header('Authorization');

    // If there is no token, return an error
    if (!token) {
       return res.status(401).json({ message: 'Unauthorized' });
    }try{
    // Verify the token
        const user = await UserService.verifyToken(req.headers.authorization);
        // console.log("User: "+user);
        const uid = user._id;
    //call createData function
        try{
          const data = await DataService.FindData(uid); 
          res.json(data);
        }catch(error){
          console.log("Error in function call")
        }
        
    }catch(error){
        res.json({message:"Error in authenticatoin"})
    }
  }

  async ViewOneData(req, res){
    const token = req.header('Authorization');

    // If there is no token, return an error
    if (!token) {
       return res.status(401).json({ message: 'Unauthorized' });
    }try{
    // Verify the token
        const user = await UserService.verifyToken(req.headers.authorization);
        const {id} = req.body;
        const uid = user._id;
    // check input validity
        if (!(id)) {
          res.status(400).send("id required");
        }
    //call createData function
        try{
          const data = await DataService.FindSpecial(id,uid); 
          res.json(data);
        }catch(error){
          console.log("Error in function call")
        }
        
    }catch(error){
        res.json({message:"Error in authenticatoin"})
    }
  }

  async Delete(req, res){
    const token = req.header('Authorization');

    // If there is no token, return an error
    if (!token) {
       return res.status(401).json({ message: 'Unauthorized' });
    }try{
    // Verify the token
        const user = await UserService.verifyToken(req.headers.authorization);
        const {id} = req.params.id;
    //call createData function
    try{
        const data = await DataService.DeleteData(id); 
        res.json(data);
    }catch(error){
        console.log("Error in function call")
    }
        
    }catch(error){
        res.json({message:"Error in authenticatoin"})
    }
  }
  
}

module.exports = new DataController();