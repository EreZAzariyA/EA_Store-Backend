import express, { NextFunction, Request, Response } from "express";
import CategoryModel from "../03-Models/category-model";
import ProductModel from "../03-Models/product-model";
import storeLogic from "../05-BLL/store-logic";

const router = express.Router();

router.get("/categories", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categories = await storeLogic.getAllCategories();
            res.json(categories);
      } catch (err: any) {
            next(err);
      }
});

router.get("/category/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categoryId = req.params.categoryId;
            const category = await storeLogic.getOneCategoryByCategoryId(categoryId);
            res.json(category);
      } catch (err: any) {
            next(err);
      }
});

router.post("/categories", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categoryToAdd = new CategoryModel(req.body);
            const addedCategory = await storeLogic.addNewCategory(categoryToAdd);
            res.status(200).json(addedCategory);
      } catch (err: any) {
            next(err);
      }
});

router.get("/categories/sub-categories-by-category-id/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categoryId = req.params.categoryId;
            const subCategories = await storeLogic.getSubCategoriesByCategoryId(categoryId);
            res.json(subCategories);
      } catch (err: any) {
            next(err);
      }
});
router.get("/categories/all-sub-categories", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const subCategories = await storeLogic.getAllSubCategories();
            res.json(subCategories);
      } catch (err: any) {
            next(err);
      }
});

router.get("/products", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const products = await storeLogic.getAllProducts();
            res.json(products);
      } catch (err: any) {
            next(err);
      }
});

router.get("/product/:productId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const productId = req.params.productId;
            const product = await storeLogic.getOneProductByProductId(productId);
            res.json(product);
      } catch (err: any) {
            next(err);
      }
});

router.post("/products", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const productToAdd = new ProductModel(req.body);
            const addedProduct = await storeLogic.addNewProduct(productToAdd);
            res.status(200).json(addedProduct);
      } catch (err: any) {
            next(err);
      }
});

router.delete("/products/:productId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const productIdToDelete = req.params.productId;
            storeLogic.deleteProductByProductId(productIdToDelete);
            res.status(201).json("Deleted...")
      } catch (err: any) {
            next(err);
      }
})

router.get("/products/products-by-category-id/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categoryId = req.params.categoryId;
            const products = await storeLogic.getProductsByCategoryId(categoryId);
            res.json(products);
      } catch (err: any) {
            next(err);
      }
});

router.get("/products/products-by-sub-category-id/:subCategoryId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const subCategoryId = req.params.subCategoryId;
            const products = await storeLogic.getProductsBySubCategoryId(subCategoryId);
            res.json(products);
      } catch (err: any) {
            next(err);
      }
})




export default router;