import { v4 as uuid } from "uuid";
import CategoryModel from "../03-Models/category-model";
import ProductModel from "../03-Models/product-model";
import SubCategoryModel from "../03-Models/sub-category-model";
import dal from "../04-DAL/dal";
import socketLogic from "./socket-logic";


async function getAllCategories(): Promise<CategoryModel[]> {
      const sql = "SELECT * FROM categories";
      const categories = await dal.execute(sql);
      return categories;
}

async function getOneCategoryByCategoryId(categoryId: string): Promise<CategoryModel> {
      const sql = `SELECT * FROM categories WHERE categoryId = '${categoryId}'`;
      const categories = await dal.execute(sql);
      const category = categories[0];
      return category;
}

async function getAllSubCategories(): Promise<SubCategoryModel[]> {
      const sql = "SELECT * FROM subcategories";
      const subCategories = await dal.execute(sql);
      return subCategories;
}

async function getSubCategoriesByCategoryId(categoryId: string): Promise<SubCategoryModel[]> {
      const sql = `SELECT * FROM subcategories WHERE categoryId = '${categoryId}'`;
      const subcategories = await dal.execute(sql);
      return subcategories;
}

async function addNewCategory(category: CategoryModel): Promise<CategoryModel> {
      category.categoryId = uuid();
      const sql = `INSERT INTO categories 
                              VALUES 
                                    (
                                          '${category.categoryId}',
                                          '${category.category}'
                                    )`;
      await dal.execute(sql);
      return category;
}

async function getAllProducts(): Promise<ProductModel[]> {
      const sql = 'SELECT * FROM eastore.products'
      const products = await dal.execute(sql);
      return products;
}

async function getOneProductByProductId(productId: string): Promise<ProductModel> {
      const sql = `SELECT * FROM products inner join categories on products.categoryId = categories.categoryId WHERE products.productId = '${productId}'`;
      const products = await dal.execute(sql);
      const product = products[0];
      return product
}

async function addNewProduct(product: ProductModel): Promise<ProductModel> {
      product.productId = uuid();
      const sql = `INSERT INTO products 
                              VALUES (
                                    '${product.productId}',
                                    '${product.categoryId}',
                                    '${product.subCategoryId}',
                                    '${product.productName}',
                                    '${product.productDescription}',
                                    '${product.productPrice}',
                                    '${product.productImage}'
                              )`
      await dal.execute(sql);
      socketLogic.emitAddProduct(product);
      return product;
}

async function deleteProductByProductId(productId: string): Promise<void> {
      const sql = `DELETE FROM products WHERE productId = '${productId}'`;
      await dal.execute(sql);
}

async function getProductsByCategoryId(categoryId: string): Promise<ProductModel[]> {
      const sql = `SELECT * FROM products WHERE categoryId = '${categoryId}'`;
      const products = await dal.execute(sql);
      return products
}

async function getProductsBySubCategoryId(subCategoryId: string): Promise<ProductModel[]> {
      const sql = `SELECT * FROM products WHERE subCategoryId = '${subCategoryId}'`;
      const products = await dal.execute(sql);
      return products;
}


export default {
      getAllCategories,
      getOneCategoryByCategoryId,
      addNewCategory,
      getSubCategoriesByCategoryId,
      getAllSubCategories,
      getAllProducts,
      getOneProductByProductId,
      addNewProduct,
      deleteProductByProductId,
      getProductsByCategoryId,
      getProductsBySubCategoryId
}