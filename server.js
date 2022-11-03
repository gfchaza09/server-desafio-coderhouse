const express = require("express");

const Contenedor = require("./contenedor");

const app = express();

const PORT = 8080;

const products = new Contenedor("./db/productos.txt");

app.get("/", (req, res) => {
  res.send("Hola este es el desafío. Prueba /productos y /productoRandom");
});

app.get("/productos", async (req, res) => {
  let productsArr = await products.getAll();
  res.send(productsArr);
});

app.get("/productoRandom", async (req, res) => {
  let productRandom = await products.getProductRandom();
  res.send(productRandom);
});

// Configuramos el puerto
const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto: ${PORT}`);
});

// Escuchamos un evento en caso de error
server.on("error", (error) =>
  console.log(`Error en servidor: ${error.message}`)
);
