const DataRepository = require('../repository/data');

class DataService {
    async createData(uid, Age) { //create data     
      const data = await DataRepository.create(uid, Age);  //save data details
        return data;
    }
    async editData(id, uid, Age) { //edit data
      const data = await DataRepository.edit(id, uid, Age);  //save data details
      return data;
    }
    async FindData(uid) { //retrieve all
      const data = await DataRepository.find(uid);
      return data;
    }
    async FindSpecial(id, uid){ //retrieve special one
      const data = await DataRepository.findSpecial(id, uid);
      return data;
    }
    async DeleteData(id, uid){ //delete special one
      const data = await DataRepository.delete(id)
      return data;
    }

  }
module.exports = new DataService();
    