const subcategorySchema = require("../model/subcategorySchema");
const categorySchema = require("../model/categorySchema");

async function subCategoryController(req, res) {
  const { name, description, categoryId } = req.body;

  try {
    // check existing
    const existingSubCategory = await subcategorySchema.findOne({ name });
    if (existingSubCategory) {
      return res.json({
        message: "SubCategory Already Exists",
      });
    }
    // create subcategory

    const createSubCategory = await subcategorySchema.create({
      name,
      description,
      categoryId,
    });
    await createSubCategory.save();

    // push subcategory id into category

    await categorySchema.findOneAndUpdate(
      { _id: categoryId },
      { $push: { subcategorylist: createSubCategory._id } },
      { new: true },
    );
    res.status(200).json({
      message: "SubCategory added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
//get all subcategory
async function getAllSubCategory(req, res) {
  const allSubCategoryList = await subcategorySchema.find({});
  res.json({
    message: "All Subcategory Paichi",
    data: allSubCategoryList,
  });
}

//update subcategory
async function updateSubCategoryController(req, res) {
  const { id } = req.params;
  const { name, description, categoryId } = req.body;
  const updateSubCategory = await subcategorySchema.findById(id);
  if (!updateSubCategory) {
    return res.json({
      message: "SubCategory not found",
    });
  }
  ((updateSubCategory.name = name),
    (updateSubCategory.description = description),
    (updateSubCategory.categoryId = categoryId),
    await updateSubCategory.save(),
    res.json({
      message: "Sub Category updated",
      data: updateSubCategory,
    }));
}
//delete-one(hard) Subcategory
async function deleteSubCategoryController(req, res) {
  const { id } = req.params;
  const deleteSubCategory = await subcategorySchema.findByIdAndDelete(id);
  res.json({ message: "Data Deleted", data: deleteSubCategory });
}

// delete-all(hard) Subcategory

async function deleteallSubCategory(req, res) {
  const { id } = req.params;
  const deleteallSubCategory = await subcategorySchema.deleteMany({});
  res.json({
    message: "All Subcategory is Deleted",
    data: deleteallSubCategory,
  });
}

module.exports = {
  subCategoryController,
  getAllSubCategory,
  updateSubCategoryController,
  deleteSubCategoryController,
  deleteallSubCategory,
};
