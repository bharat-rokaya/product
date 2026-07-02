import express from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post(
    "/",
    upload.single("image"),
    productController.createProduct
);

router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;