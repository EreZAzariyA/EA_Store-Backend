class CategoryModel {
      public categoryId: string;
      public category: string;

      constructor(category: CategoryModel) {
            this.categoryId = category.categoryId;
            this.category = category.category;
      }
}

export default CategoryModel;