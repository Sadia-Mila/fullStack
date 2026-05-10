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
    badge,
  } = req.body;

  // ==========================
  //  image update
 if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const imgPath = req.file.path;
    const imgUrl = await uploadImage(imgPath);
  // ==========================
  const createproduct = productSchema({
    name,
    description,
    price,
    size,
    color,
    category,
    thumbnailImage: imgUrl.secure_url,
    // thumbnailImage: `http://localhost:3000/uploads/${req.file.filename}`,
    ram,

    storage,
    badge,
  });
  await createproduct.save();
    res.json({
      message: "Product Added",
      data: createproduct,
    });
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
    badge,
   
  } = req.body;
  const product = await productSchema.findById(id);
  
  // text fields update
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.size = req.body.size || product.size;
  product.color = req.body.color || product.color;
  product.category = req.body.category || product.category;
  product.ram = req.body.ram || product.ram;
  product.storage = req.body.storage || product.storage;

  // ✅ IMAGE UPDATE 
    if (req.file) {
      const imgPath = req.file.path;
      const imgUrl = await uploadImage(imgPath);
      product.thumbnailImage = imgUrl.secure_url;
    }

  await product.save();
  res.json({
    message: "Product is updated",
    data: updateProduct,
  });
}
async function singleproduct(req, res) {
  const { id } = req.params;
  const singleProduct = await productSchema.findById(id);
  res.json({
    message: "Single Product",
    data: singleProduct,
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
  singleproduct,
  singleproductdelete,
  deleteAllProduct,
};
