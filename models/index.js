// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE", //If a category is deleted, all products in that category are deleted.
  //I made this decision to prevent orphaned products from being left in the database
});
// Categories have many Products
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
//This ties together the products and the tags with a many-to-many relationship, using the ProductTag model as the bridge uniting them
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "tags",
  foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
//the same as above, but with the foreign key being the tag_id
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "products",
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
