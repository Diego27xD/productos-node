import { Router } from "express";
import * as Controller from "./controller";

const contactoRouter = Router()

contactoRouter.route("/").get(Controller.findAll);
contactoRouter.route("/upload").post(Controller.create);
contactoRouter.route("/editar").post(Controller.update);
contactoRouter.route("/show").post(Controller.show)
contactoRouter.route("/borrar/:id").get(Controller.destroy);

export default contactoRouter