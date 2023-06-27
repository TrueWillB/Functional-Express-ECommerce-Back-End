// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE", //If a category is deleted, all products in that category are deleted
});
// Categories have many Products
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
