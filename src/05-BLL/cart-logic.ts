import { ItemInCartModel } from "../03-Models/item-in-cart-model";
import { UserCartModel } from "../03-Models/user-cart-model";
import dal from "../04-DAL/dal";
import { v4 as uuid } from "uuid";
import moment from "moment";
import ClientError from "../03-Models/client-error";


async function createNewShoppingCart(userId: string): Promise<UserCartModel> {
      const userCart = new UserCartModel();
      userCart.userCartId = uuid();
      userCart.userId = userId;
      userCart.cartCreateDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const cartSql = `INSERT INTO userscarts 
      VALUES (
            '${userCart.userId}',
            '${userCart.userCartId}',
            '${userCart.cartCreateDate}')`;

      // Execute the commend to create a new cart on the server
      await dal.execute(cartSql);
      return userCart;
}

async function getUserCartByUserId(userId: string): Promise<UserCartModel> {
      const sql = `SELECT * FROM userscarts WHERE userId = '${userId}'`;
      const userCarts = await dal.execute(sql);
      const userCart = userCarts[0];
      return userCart;
}

async function getItemsFromCartByUserId(userId: string): Promise<ItemInCartModel[]> {
      const sql = `select * from userscarts as uc join itemsincart as iic on uc.userCartId = iic.userCartId WHERE userId = '${userId}'`;

      const itemsInCart = await dal.execute(sql);
      return itemsInCart;
}

async function addItemIntoCart(itemToAdd: ItemInCartModel): Promise<void> {
      const itemsSql = `select * from itemsincart where userCartId = '${itemToAdd.userCartId}'`;
      const items: ItemInCartModel[] = await dal.execute(itemsSql);
      if (items.find(i => i.productId === itemToAdd.productId)) {
            const sql = `update itemsincart set stock = '${itemToAdd.stock}',
                                          totalPrice = '${itemToAdd.totalPrice}',
                                          productId = '${itemToAdd.productId}',
                                          userCartId = '${itemToAdd.userCartId}' where productId = '${itemToAdd.productId}';`
            await dal.execute(sql);
      } else {

            const sql = `INSERT INTO itemsincart 
            VALUES 
            (
                  '${itemToAdd.productId}',
                  '${itemToAdd.stock}',
                  '${itemToAdd.totalPrice}',
                  '${itemToAdd.userCartId}')`;
            await dal.execute(sql);
      }
}

async function deleteItemFromCart(userCartId: string, itemIdToDelete: string): Promise<void> {
      const sql = `DELETE FROM itemsincart WHERE productId = '${itemIdToDelete}' AND userCartId = '${userCartId}'`;
      await dal.execute(sql);
}

export default {
      createNewShoppingCart,
      getUserCartByUserId,
      getItemsFromCartByUserId,
      addItemIntoCart,
      deleteItemFromCart
}