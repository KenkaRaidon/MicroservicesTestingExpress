const database = require("./databaseConnection");

const getCustomers = function () {
  return new Promise((resolve, reject) => {
    database.pool.query(
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

const getCustomerById = function (id) {
  return new Promise((resolve, reject) => {
    database.pool.query(
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

const saveCustomer = function (customer) {
  return new Promise((resolve, reject) => {
    database.pool.query(
      "WITH x AS (\n" +
        "INSERT INTO address  (address, district, city_id, postal_code, phone, last_update)\n" +
        "VALUES ($6, 'whatever', $5, $7, $4, now())\n" +
        "RETURNING address_id\n" +
        ")\n" +
        "INSERT INTO customer (store_id, first_name, last_name, email, address_id, activebool, create_date)\n" +
        "SELECT $8, $1, $2, $3, x.address_id, true, now() FROM x",
          [customer[0],//Nombre
          customer[1],//Apellido
          customer[2],//Correo
          customer[3],//Telefono
          customer[4],//Ciudad Id
          customer[5],//Direccion
          customer[6],//Codigo Postal
          customer[7]//Store ID
        ],
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
  getCustomers,
  getCustomerById,
  saveCustomer,
};
