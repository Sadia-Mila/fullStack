const express = require('express')
const {categoryController, getAllCategory, updateCategoryController, deleteCategoryController, deleteallCategory, getSingleCategory} = require('../../controllers/categoryController')
const router = express.Router()

router.post("/createcategory", categoryController)
router.get("/allcategorylist", getAllCategory)
router.get("/singleCategorylist/:id", getSingleCategory)
router.patch("/updatecategory/:id", updateCategoryController)
router.delete("/deletecategory/:id", deleteCategoryController)
router.delete("/deleteallcategory", deleteallCategory)


module.exports = router