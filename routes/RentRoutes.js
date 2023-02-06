const router = require("express").Router();
const Rent = require("../models/Rent");
const Book = require("../models/Book");

router.post("/", async (req, res) => {
  const { name, address, zipCode, birthDate, phoneNumber } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatorio!" });
    return;
  }

  if (!address) {
    res.status(422).json({ error: "O endereço é obrigatorio!" });
    return;
  }

  if (!zipCode) {
    res.status(422).json({ error: "O CEP é obrigatorio!" });
    return;
  }

  if (!birthDate) {
    res.status(422).json({ error: "A data de nascimento é obrigatorio!" });
    return;
  }

  if (!phoneNumber) {
    res.status(422).json({ error: "O numero de telefone é obrigatorio!" });
    return;
  }

  const rent = {
    name,
    address,
    zipCode,
    birthDate,
    phoneNumber,
  };

  try {
    await Rent.create(rent);
    res.status(201).json({
      mensagem: `Olá ${name}, o livro foi alugado com sucesso!, você receberá o livro em sua casa, ou se preferir, busque-o em uma de nossas unidades`,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// criaçao de aluguel correta
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    address,
    zipCode,
    birthDate,
    phoneNumber,
    bookName,
    author,
    publishingCompany,
    literaryGenre,
    parentalRating,
  } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatorio!" });
    return;
  }

  if (!address) {
    res.status(422).json({ error: "O endereço é obrigatorio!" });
    return;
  }

  if (!zipCode) {
    res.status(422).json({ error: "O CEP é obrigatorio!" });
    return;
  }

  if (!birthDate) {
    res.status(422).json({ error: "A data de nascimento é obrigatorio!" });
    return;
  }

  if (!phoneNumber) {
    res.status(422).json({ error: "O numero de telefone é obrigatorio!" });
    return;
  }

  if (!bookName) {
    res.status(422).json({ error: "O nome do livro é obrigatorio!" });
    return;
  }

  if (!author) {
    res.status(422).json({ error: "O nome do autor do livro é obrigatorio!" });
    return;
  }

  if (!publishingCompany) {
    res.status(422).json({ error: "O nome do livro é obrigatorio!" });
    return;
  }

  if (!literaryGenre) {
    res.status(422).json({ error: "O genero literario é obrigatorio!" });
    return;
  }

  if (!parentalRating) {
    res
      .status(422)
      .json({ error: "a classificaçao indicativa do livro é obrigatorio!" });
    return;
  }

  const rent = {
    name,
    address,
    zipCode,
    birthDate,
    phoneNumber,
    bookName,
    author,
    publishingCompany,
    literaryGenre,
    parentalRating,
  };

  try {
    await Rent.create({ rent });
    const book = await Book.findOne({ _id: id });
    res.status(200).json({ mensagem: "Livro Reservado com sucesso!!", book });

    if (!id) {
      res.status(422).json({ message: "Desculpe, livro não encontrado" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Desculpe, erro no sistema!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const rent = await Rent.find();

    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, address, zipCode, birthDate, phoneNumber, nameBook } = req.body;

  const rent = {
    name,
    address,
    zipCode,
    birthDate,
    phoneNumber,
    nameBook,
  };

  try {
    const updateRent = await Rent.updateOne({ _id: id }, rent);

    if (updateRent === 0) {
      res.status(442).json({ message: "O usuario não foi encontrado!" });
      return;
    }
    res
      .status(200)
      .json({ mensagem: "As atualizaçoes foram efetuadas com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const rent = await Rent.findOne({ _id: id });

  if (!Rent) {
    res.status(422).json({ message: "Não existe esse aluguel!" });
  }

  try {
    await Rent.deleteOne({ _id: id });
    res.status(200).json({ mensagem: "Aluguel excluido com sucesso!!" });
  } catch (error) {}
});

module.exports = router;
