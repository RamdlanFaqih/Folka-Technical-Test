import express from "express";
import productController from "../controller/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/list-products", productController.list);
router.get("/product/:id", productController.getProduct);
router.post("/insert/product", upload, productController.createProduct);

export default router;