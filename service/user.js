const UserRepository = require('../repository/user');
import * as dotenv from 'dotenv';
const jwt = require('jsonwebtoken');
import * as bcrypt from 'bcrypt'; 

// const uuid = require('uuid'); //library to auto generate secret id
const secret = "een2jjnJNIUEJFNSUDFJNDSnkjs"


class UserService {
  async createUser(email, password) { //create user
    const check = await UserRepository.findUser(email);
    console.log("REpo returned: " + check);
    if (check != "Success") {
      return "User already exists";
    } else {
      const lowercaseEmail = email.toLowerCase();
      const encryPassword = await bcrypt.hash(password, 10); //hashing password
     
      const user = await UserRepository.create(lowercaseEmail, encryPassword);  //save user details

      //token generation
      const token = jwt.sign({ user_id: user._id, email }, secret, {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;
      return user;
    }
  }
  async LoginUser(email, password) { //create user
    const user = await UserRepository.findLogin(email);
    // console.log("password : "+user)
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
        const token = jwt.sign({ user_id: user._id, email }, secret, {
          expiresIn: "2h",
        });

      // save user token
      // user.token = token;
      return {user,token};
      // user
    }else{
      return "failed"
    }
   // res.status(400).send("Invalid Credentials");
  }
  async verifyToken(token) {
    try {
      //to remove bearer from token
      const Token = token.replace('Bearer ', '');
      try {
        // Verify the JWT
        const decoded = jwt.verify(Token, secret);
        const mail = decoded['email'];
        console.log(mail);
        // Check if the user still exists in the database
        const user = await UserRepository.findUser(mail);
        if (!user) {
          throw new Error("User not found");
        }
        // Return the user
        return user;
      } catch(err) {
        // If the JWT is invalid or has been tampered with, an exception will be thrown
        console.error(err);
      }
    } catch (error) {
      throw error;
    }
  }
}
  module.exports = new UserService();
  