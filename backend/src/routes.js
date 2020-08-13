const { Router } = require("express");

const routes = Router();

const userController = require("./controller/userController");

routes.post("/user", userController.createUser);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);
routes.get("/users", userController.get);
routes.get("/user/:id", userController.getById);
routes.post("/match-password/:id", userController.validatePassword);

module.exports = routes;
