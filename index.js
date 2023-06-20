const express = require("express");
const app = express();
const db = require("./queries");
const port = 3000;
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "taller05",
  host: "148.231.233.241",
  database: "sakila",
  password: "545342xs",
  port: 5432,
});

// Middlewa que verifica si el usuario es un administrador.
const middleware = (req, res, next) => {
  console.log(db.getUsers);
  next();
};

// Permite recibir parámetros en formato JSON.
app.use(express.json());

// Se agrega el middleware en la aplicación.
app.use(middleware);

// Ruta a la cual solo deben ingresar usuarios administradores.
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/customers", (req, res) => {
  const maries = [];
  db.getUsers().then((result) => {
    result.forEach((element) => {
      element.first_name == "MARY" ? maries.push(element) : "";
    });
    console.log(maries);
    res.send(result);
  });
});

app.get("/customer/:customer_id", (req, res) => {
  const id = req.params.customer_id;

  db.getUser(id).then((result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server listeting on port ${port}`);
});