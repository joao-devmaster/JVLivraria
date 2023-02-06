const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Acesso negado!!!" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ mensagem: "token invalido" });
  }
}

// rota privada
router.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //verificar se o usuario existe
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({
      mensagem: "usuario náo encontrado",
    });
  }

  res.status(200).json(user);
});

//Register User
router.post("/", async (req, res) => {
  const { name, email, password, confirmpassword, age, userType } = req.body;

  if (!name) {
    return res.status(422).json({ mensagem: "o campo 'Nome' é obrigatorio!" });
  }

  if (!email) {
    return res.status(422).json({ mensagem: "o campo 'Email' é obrigatorio!" });
  }

  if (!password) {
    return res.status(422).json({ mensagem: "o campo 'Senha' é obrigatorio!" });
  }

  if (!age) {
    return res.status(422).json({ mensagem: "o campo 'idade' é obrigatorio!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ mensagem: "As senhas não conferem" });
  }

  // verificar se o email existe
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res
      .status(422)
      .json({ mensagem: "por favor, ultilize outro email!!" });
  }

  // criando a senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    name,
    email,
    password: passwordHash,
    age,
    userType,
  });
  try {
    await user.save();
    res.status(201).json({ mensagem: "usuario criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "ocorreu um erro no servido" });
  }
});

//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //validations
  if (!email) {
    return res
      .status(422)
      .json({ mensagem: "Insira o email para fazer o login!!" });
  }
  if (!password) {
    return res
      .status(422)
      .json({ mensagem: "Insira a senha para fazer o login" });
  }

  // verificar se o usuario existe
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).json({ mensagem: "usuario nao encontrado" });
  }

  // verificar se a senha é correta
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ mensagem: "senha invalida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    res
      .status(200)
      .json({ mensagem: "Autenticaçao realizada com sucesso!!", token });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensagem: "Aconteceu um erro no servido, tente mais tarde!!!",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res
      .status(422)
      .json({ message: "Impossivel excluir essa conta no momento!" });
  }

  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ mensagem: "conta excluida com sucesso!!" });
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
