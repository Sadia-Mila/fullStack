const express = require("express");
const categorySchema = require("../model/categorySchema");
const router = express.Router();

async function categoryController(req, res) {
  const { name, description } = req.body;
  try {
    const existingCategory = await categorySchema.findOne({name})
        if(existingCategory){
            return res.json({
                message: "Category Already Exists"
            })
        }
    const createCategory = categorySchema({
      name,
      description,
    });
    createCategory.save();
    res.json({
      message: "Category added Successfully",
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
}
//get all category
async function getAllCategory(req, res) {
  const allCategoryList = await categorySchema.find({});
  res.json({
    message: "category Paichi",
    data: allCategoryList,
  });
}

//Get Single Category

async function getSingleCategory(req, res) {
  const {id} = res.params
  const singleCategoryList = await categorySchema.findById(id);
  res.status(200).json({
    message: "Single Category Paichi",
    data: singleCategoryList,
  });
}


//update category
async function updateCategoryController(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const updateCategory = await categorySchema.findById(id);
  updateCategory.name = name,
  updateCategory.description = description,
  await updateCategory.save(),
  res.json({
    message: "Category updated",
    data: updateCategory,
  })

}
//category delete-one(hard)
async function deleteCategoryController(req, res) {
  const { id } = req.params
  const deleteCategory = await categorySchema.findByIdAndDelete(id)
  res.json({message: "Data Deleted",
    data: deleteCategory

  })

  
}

async function deleteallCategory(req, res) {
  const{id} = req.params
  const deleteall = await categorySchema.deleteMany({})
  res.json({
    message: "All category is Deleted",
    data: deleteall
  })
  
}

module.exports = {
  categoryController,
  getAllCategory,
  updateCategoryController,
  deleteCategoryController,
  deleteallCategory,
  getSingleCategory
};
