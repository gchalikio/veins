const config      = require('../config/config');

module.exports = {
    createDBString : () => {
      let databaseList = "";
      for (let i = 0; i < config.modules.length; i++) {
        const title = config.modules[i].title;
        databaseList += title+'\n'
      }
      return databaseList;
    },
    createDBArray : () => {
      const dbArray = config.modules.map((db, i) => {
        return {
          name: db.title,
          value: i,
          short: db.code
        };
      });
      return dbArray;
    },
    respond : (res, status, result, msg, data) => {
      res.status(status).json({
          result: result,
          msg: msg || "",
          data: data || null
      });
  }
}
