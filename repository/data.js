const mongoose = require('mongoose');
const { findOne } = require('../models/data');
const Data = require('../models/data');

class DataRepository {
 async create(UID,Age) { //create
     const data = new Data({UID,Age});
     try {
       await data.save();
       return data;
       } catch (error) {
         throw error;
       }
     }

  async edit(id,UID,Age) { //edit
    try {
      const data = await Data.findOne({ _id:id,UID:UID });
      if (!data) {
        throw new Error('Data not found');
      }
      data.Age = Age;
      console.log("Data "+data)
      await data.save();
      return data;
    } catch (error) {
      console.log("Error in edit repo")
      throw error;
    }
  }

  async find(UID) { //retrieve all
    try{
        const data = await Data.find({ UID });
        return data;
      } catch (error) {
        throw error;
      }
  }

  async findSpecial(id,UID){ //retrieve special one
    try{
      const data = await Data.findOne({_id:id,UID:UID});
      console.log(data)
      return data;
    }catch (error) {
      throw error;
    }
  }

  async delete(id) { //delete special one
    try {
      const result = await Data.findOneAndDelete({ id });
      return "Deleted";
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = new DataRepository();
