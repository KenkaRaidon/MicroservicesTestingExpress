const Pool = require("pg").Pool;

const pool = new Pool({
  user: "taller05",
  host: "148.231.233.241",
  database: "sakila",
  password: "545342xs",
  port: 5432,
});

module.exports = {
    pool
};