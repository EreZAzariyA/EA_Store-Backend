class SubCategoryModel {
      public subCategoryId: string;
      public categoryId: string;
      public subCategory: string;
      constructor(subCategory: SubCategoryModel) {
            this.subCategoryId = subCategory.subCategoryId;
            this.categoryId = subCategory.categoryId
            this.subCategory = subCategory.subCategory
      }
}
export default SubCategoryModel