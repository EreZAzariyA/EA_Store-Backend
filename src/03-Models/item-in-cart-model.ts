export class ItemInCartModel{
      productId: string;
      stock: number;
      totalPrice: number;
      userCartId: string;
      cartCreateDate: string;

      constructor(itemInCart: ItemInCartModel) {
            this.productId = itemInCart.productId;
            this.stock = itemInCart.stock;
            this.totalPrice = itemInCart.totalPrice;
            this.userCartId = itemInCart.userCartId;
            this.cartCreateDate = itemInCart.cartCreateDate;
      }
}