const express = require("express");
const app = express();
const db = require("./queries");
const port = 3000;

// Middlewa que verifica si el usuario es un administrador.
const middleware = (req, res, next) => {
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

app.post("/saveCustomer", (req, res) => {
  db.saveUser(req.body).then((result)=>{
    res.send(result);
  })
});

app.listen(port, () => {
  console.log(`Server listeting on port ${port}`);
});
