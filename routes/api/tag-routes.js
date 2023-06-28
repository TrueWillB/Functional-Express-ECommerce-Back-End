const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  console.log("GET /api/tags");
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log("GET /api/tags/:id");
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  console.log("POST /api/tags");
  try {
    //the post method is quite simple. It just makes a tag from the contents of the request body
    //the request body just takes in a tag name, the ID is generated automatically
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  console.log("PUT /api/tags/:id");
  try {
    await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Tag updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  console.log("DELETE /api/tags/:id");
  try {
    //clean out orphaned productTags first to prevent memory leaks
    await ProductTag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ message: "Product associations and Tag deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
