const database = require("./databaseConnection");

const getStores = function () {
  return new Promise((resolve, reject) => {
    database.pool.query(
      "SELECT store_id, name FROM store ORDER BY store_id ASC",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports={
    getStores
}