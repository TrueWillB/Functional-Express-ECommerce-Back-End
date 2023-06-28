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

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log("GET /api/categories/:id");
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    //simply takes in the json data from the post request body, then creates it in the table based on the Category model
    console.log("POST /api/categories");
    const newCategory = await Category.create(req.body);
    //returns a successful code if the request is successful
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    //I decided to return the updated category data to the user
    res.status(200).json({ message: `Category updated successfully` });
  } catch (err) {}
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    //serializing data to pull out the category name to place into the response message
    const deleteCategoryData = await Category.findByPk(req.params.id);
    const deleteCategoryName = deleteCategoryData.get({ plain: true });
    console.log(deleteCategoryName.category_name);
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: ` -${deleteCategoryName.category_name}- category deleted successfully`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
