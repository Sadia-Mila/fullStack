const express = require('express')
const { subCategoryController, getAllSubCategory, updateSubCategoryController, deleteSubCategoryController, deleteallSubCategory,  } = require('../../controllers/subCategoryController')
const router = express.Router()

router.post("/createsubcategory", subCategoryController)
router.get("/getallsubcategory", getAllSubCategory)
router.patch("/updatesubcategory/:id", updateSubCategoryController)
router.delete("/deletesubcategory/:id", deleteSubCategoryController)
router.delete("/deleteallsubcategory", deleteallSubCategory)


module.exports = router