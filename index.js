const config = require("./config");
const express = require("express");
const app = express();

let carritoDAO;
if (config.dbType === "mongo") {
  carritoDAO = require("./carrito.dao");
} else {
  carritoDAO = require("./carrito.firebase.dao");
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post("/carrito", async (req, res) => {
  const timestamp = Date.now();
  const label = req.body.label; // Requerido
  try {
    // Notese que CarritoDao no tiene un metodo save
    // Se hereda del Contenedor
    const _carrito = await carritoDAO.save({label, timestamp});
    res.json(_carrito);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

app.listen(3000, () => {
  console.log("😎 Server Running :: Puerto 3000");
})