const uploadImage = require("../middleware/cloudinary");
const productSchema = require("../model/productSchema");

async function productController(req, res) {
  const {
    name,
    description,
    price,
    size,
    color,
    category,
    image,
    ram,
    storage,
  } = req.body;

  // ==========================
  // console.log(req.file.path);
  
    const imgPath = req.file.path
    // console.log(imgPath);
    const imgUrl = await uploadImage(imgPath)
    
  // ==========================
  const createproduct = productSchema({
    name,
    description,
    price,
    size,
    color,
    category,
    image: imgUrl.secure_url,
    // image: `http://localhost:3000/uploads/${req.file.filename}`,
    ram,

    storage,
  });
  (await createproduct.save(),
    res.json({
      message: "Product Added",
      data: createproduct,
    }));
}

async function getAllProduct(req, res) {
  const allProductList = await productSchema.find({});
  res.json({
    message: "All Product List",
    data: allProductList,
  });
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    size,
    color,
    category,
    ram,
    storage,
    timestamps,
  } = req.body;
  const updateProduct = await productSchema.findById(id);
  updateProduct.name = name;
  updateProduct.description = description;
  updateProduct.price = price;
  updateProduct.size = size;
  updateProduct.color = color;
  updateProduct.category = category;
  updateProduct.ram = ram;
  updateProduct.storage = storage;
  await updateProduct.save();
  res.json({
    message: "Product is updated",
    data: updateProduct,
  });
}

async function singleproductdelete(req, res) {
  const { id } = req.params;
  const deleteProduct = await productSchema.findByIdAndDelete(id);
  res.json({
    message: "Single Product Delete",
    data: deleteProduct,
  });
}

async function deleteAllProduct(req, res) {
  const deleteAll = await productSchema.deleteMany({});
  res.json({
    message: "All Product is deleted",
    data: deleteAll,
  });
}

module.exports = {
  productController,
  getAllProduct,
  updateProduct,
  singleproductdelete,
  deleteAllProduct,
};
