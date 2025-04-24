const { Router } = require("express");
const bookRouter = Router();

const inventoryController = require("../controllers/inventoryController");
const bookController = require("../controllers/bookController");

bookRouter.get("/:id", inventoryController.viewBookDetails);
bookRouter.post("/:id/delete", bookController.deleteBook);
bookRouter.post("/:id/update", bookController.updateBook);

module.exports = bookRouter;
