const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require("../../config/connection");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //I think I am going to try and include a count of products in each category
  console.log("GET /api/categories");
  try {
    const categoryData = await Category.findAll({
      // include: [{ model: Product }], //This is only necessary if you want to show all the products associated with categories
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM product WHERE category.id = product.category_id)"
            ),
            "product_count",
          ],
        ],
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
