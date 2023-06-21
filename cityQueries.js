const database = require("./databaseConnection");

const getCityByCountryId= function(id){
    return new Promise((resolve, reject) => {
        database.pool.query(
          "SELECT city_id, city FROM city where country_id=$1 ORDER BY country_id asc",
          [id],
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results.rows);
          }
        );
      });
}

module.exports={
    getCityByCountryId
}