const http = require("http");

const getMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour <= 12) {
    return "Buenos dias!";
  } else if (hour >= 13 && hour <= 19) {
    return "Buenas tardes!";
  } else {
    return "Buenas noches!";
  }
};

const server = http.createServer((req, res) => {
  res.end(getMessage());
});

server.listen(8080, (err) => {
  err
    ? console.error(`Error al iniciar el puerto: ${err}`)
    : console.log(`Servidor escuchando puerto: 8080`);
});
