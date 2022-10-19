import express, { NextFunction, Request, Response } from "express";
import { ItemInCartModel } from "../03-Models/item-in-cart-model";
import cartLogic from "../05-BLL/cart-logic";

const router = express.Router();

router.get("/user-cart/:userId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userId = req.params.userId;
            const userCart = await cartLogic.getUserCartByUserId(userId);
            res.json(userCart);
      } catch (err: any) {
            next(err);
      }
});

router.get("/user-cart-items/:userId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userId = req.params.userId;
            const itemsInCart = await cartLogic.getItemsFromCartByUserId(userId);
            res.json(itemsInCart);
      } catch (err: any) {
            next(err);
      }
});

router.post("/user-cart", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const itemToAdd = new ItemInCartModel(req.body);
            const addedItem = await cartLogic.addItemIntoCart(itemToAdd);
            res.status(201).json(addedItem);
      } catch (err: any) {
            next(err);
      }
});

router.post("/user-cart/:userId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userId = req.params.userId;
            const addedCart = await cartLogic.createNewShoppingCart(userId);
            res.status(201).json(addedCart);
      } catch (err: any) {
            next(err);
      }
});

router.delete("/:userCartId/:productId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userCartId = req.params.userCartId;
            const productId = req.params.productId;
            await cartLogic.deleteItemFromCart(userCartId,productId);
            res.status(200).json("Deleted...");
            console.log("deleted...");
      } catch (err: any) {
            next(err);
      }
})


export default router;