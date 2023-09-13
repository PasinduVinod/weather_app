const mongoose = require('mongoose');
const User = require('../models/user');

class UserRepository {
  async findUser(email) {
    const userc = await User.findOne({ email: email });
    if (userc) {
      return "Failed";
    } else {
      return "Success";
    }
  }
  async create(email, password) {
    const user = new User({email, password});
    try {
      await user.save();
      return user;
      } catch (error) {
        throw error;
      }
    }
  async findLogin(email){
   const user = await User.findOne({ email: email });
  return user
  }  
  async findUser(email){
    const user = await User.findOne({ email: email });
   return user
   }
}
  
    
 module.exports = new UserRepository();
  