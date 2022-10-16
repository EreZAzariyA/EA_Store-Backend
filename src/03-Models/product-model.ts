class ProductModel{
      public productId: string;
      public categoryId: string;
      public subCategoryId: string;
      public productName: string;
      public productPrice: number;
      public productDescription: string;
      public productImage: string;

      public constructor(product: ProductModel) {
            this.subCategoryId = product.subCategoryId;
            this.categoryId = product.categoryId;
            this.productDescription = product.productDescription;
            this.productId = product.productId;
            this.productImage = product.productImage;
            this.productName = product.productName;
            this.productPrice = product.productPrice;
      }
}
export default ProductModel