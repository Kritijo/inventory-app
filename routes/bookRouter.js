const { Router } = require("express");
const bookRouter = Router();

const inventoryController = require("../controllers/inventoryController");

bookRouter.get("/:id", inventoryController.viewBookDetails);
bookRouter.post("/:id/delete", inventoryController.deleteBook);
bookRouter.post("/:id/update", inventoryController.updateBook);

module.exports = bookRouter;
