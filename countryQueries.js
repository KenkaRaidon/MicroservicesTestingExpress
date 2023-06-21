const database = require("./databaseConnection");

const getCountries = function () {
  return new Promise((resolve, reject) => {
    database.pool.query(
      "SELECT country_id, country FROM country ORDER BY country_id ASC",
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
    getCountries
}
