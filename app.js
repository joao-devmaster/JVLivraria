require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//config json response
app.use(express.json());

//rotas da api
const RentRoutes = require("./routes/RentRoutes");
app.use("/rent", RentRoutes);
const BookRoutes = require("./routes/BookRoutes");
app.use("/book", BookRoutes);
const UserRoutes = require("./routes/UserRoutes");
app.use("/auth", UserRoutes);

//credenciais para conexão com o banco
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.dqsomzz.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Banco de dados conectado");
  })
  .catch((err) => console.log(err));
