import { Router } from "express";
const productsRouter = Router();
import { findProducts } from "../controller/products.controller";

productsRouter.get("/", findProducts);

export default productsRouter;