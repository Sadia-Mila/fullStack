const express = require('express')
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const {productController, getAllProduct, updateProduct, singleproductdelete, deleteAllProduct} = require('../../controllers/productController')
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split(".")[1])
  }
})

const upload = multer({ storage: storage })

router.post("/createproduct", upload.single('image'), productController)
router.get("/allproductList", getAllProduct)
router.patch("/updateproduct/:id", updateProduct)
router.delete("/singleproductdelete/:id", singleproductdelete)
router.delete("/allproductdelete", deleteAllProduct)



module.exports = router