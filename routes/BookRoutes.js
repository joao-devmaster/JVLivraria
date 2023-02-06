const router = require("express").Router();
const Book = require("../models/Book");

//adicionar um livro
router.post("/", async (req, res) => {
  const { bookName, author, publishingCompany, literaryGenre, parentalRating } =
    req.body;

  if (!bookName) {
    res.status(422).json({ error: "Inserir o nome do livro é obrigatorio!" });
    return;
  }

  if (!author) {
    res.status(422).json({ error: "Inserir o autor do livro é obrigatorio!" });
    return;
  }

  if (!publishingCompany) {
    res.status(422).json({ error: "Inserir editora é obrigatorio!" });
    return;
  }

  if (!literaryGenre) {
    res.status(422).json({ error: "Inserir o genêro do livro é obrigatorio!" });
    return;
  }

  if (!parentalRating) {
    res.status(422).json({ error: "Inserir classificação indicativa" });
    return;
  }

  const book = {
    bookName,
    author,
    publishingCompany,
    literaryGenre,
    parentalRating,
  };

  try {
    await Book.create(book);
    res.status(201).json({
      mensagem: `O livro ${bookName} foi adicionado com sucesso! e já está disponivel para os usuarios.`,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//excluir um livro
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await Book.findOne({ _id: id });

  if (!book) {
    res.status(422).json({ message: "Impossivel excluir esse livro!!!" });
  }

  try {
    await Book.deleteOne({ _id: id });
    res.status(200).json({ mensagem: "o livro foi excluido com sucesso!!" });
  } catch (error) {}
});

//exibir todos os livros
router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//editar dados de um livro
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { bookName, author, publishingCompany, literaryGenre, parentalRating } =
    req.body;

  const book = {
    bookName,
    author,
    publishingCompany,
    literaryGenre,
    parentalRating,
  };

  try {
    const updateBook = await Book.updateOne({ _id: id }, book);

    if (updateBook === 0) {
      res
        .status(442)
        .json({ message: "Não foi possivel editar os dados do livro!" });
      return;
    }
    res
      .status(200)
      .json({ mensagem: "As atualizaçoes foram efetuadas com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
