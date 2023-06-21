const Pool = require("pg").Pool;

const pool = new Pool({
  user: "taller05",
  host: "148.231.233.241",
  database: "sakila",
  password: "545342xs",
  port: 5432,
});

const getUsers = function () {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM customer ORDER BY customer_id ASC",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getUser = function (id) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM customer WHERE customer_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const saveUser = function (customer) {
  console.log(customer)
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO customer(store_id, first_name, last_name, email, address_id, activebool, create_date) VALUES($1, $2, $3, $4, $5, $6, current_timestamp)",
      [customer[0], customer[1], customer[2], customer[3], customer[4], customer[5]],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

module.exports = {
  getUsers,
  getUser,
  saveUser
};
