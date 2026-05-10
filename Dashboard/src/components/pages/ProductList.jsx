import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [singleProduct, setSingleProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [idStore, setIdStore] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //edit product
  const handleEdit = (id, name, description, thumbnailImage) => {
    setIdStore(id);
    setProductName(name);
    setProductDescription(description);
    setImagePreview(thumbnailImage);
    setProductImage(null);
    setPopUp(true);
  };
  //edit product

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/product/allproductList").then(
      (res) => setProducts(res.data.data),
      // console.log(res.data.data)
    );
  }, [refresh]);

  //Edit Single Product
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/product/singleproduct/${idStore}`)
      .then(
        (res) => setSingleProduct(res.data.data),
        // console.log(res.data.data)
      );
  }, [idStore]);
  //Edit Single Product

  //update Product list
  const handleUpdate = () => {
  if (productImage) {
    // 👉 image থাকলে FormData
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("thumbnailImage", productImage);

    axios.put(
      `http://localhost:3000/api/v1/product/updateproduct/${idStore}`,
      formData
    )
    .then(res => {
      console.log("updated", res.data);
      setPopUp(false);
      setRefresh(prev => !prev);
    })
    .catch(err => console.log(err));

  } else {
    // 👉 image না থাকলে normal JSON
    axios.put(
      `http://localhost:3000/api/v1/product/updateproduct/${idStore}`,
      {
        name: productName,
        description: productDescription
      }
    )
    .then(res => {
      console.log("updated", res.data);
      setPopUp(false);
      setRefresh(prev => !prev);
    })
    .catch(err => console.log(err));
  }
};

  //update Product list

  //Image update
  const handleImageCnage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  //Image update

  //Product Delete
  const handleProductDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/product/singleproductdelete/${id}`,
      );

      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  //Product Delete
  return (
    <>
      <div className="">
        <div className="p-6">
          <h4 className="text-2xl font-bold mb-6">Product List</h4>
        </div>
        <div className="">
          <div className="rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sl. no.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>category</TableHead>
                  <TableHead>Ram</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-end pr-16">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell className="font-medium">{item.price}</TableCell>
                    <TableCell className="font-medium">{item.size}</TableCell>
                    <TableCell className="font-medium">{item.color}</TableCell>
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell className="font-medium">{item.ram}</TableCell>
                    <TableCell className="font-medium">
                      {item.storage}
                    </TableCell>

                    <TableCell>
                      <img src={item.thumbnailImage} alt={item.name} className="h-10" />
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Link>
                        <Button
                          size="sm"
                          className={"bg-green-500 text-white"}
                          onClick={() => {
                            handleEdit(
                              item._id,
                              item.name,
                              item.description,
                              item.thumbnailImage,
                            );
                          }}
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => handleProductDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#00000090]">
          <div className="w-[400px] h-[550px] bg-white rounded-md py-10 px-6">
            <h2 className="font-bold text-md">Update Products: </h2>
            <div className="max-w-md mt-4 ">
              <FieldGroup>
                <Field>
                  <FieldLabel>Product Name</FieldLabel>
                  <Input
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel>Product Description</FieldLabel>
                  <Textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Type your Description here."
                  />
                </Field>
                <Field>
                  <FieldLabel>Product Image</FieldLabel>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-15 h-15 mb-2 rounded border"
                    />
                  )}
                  <input
                    onChange={handleImageCnage}
                    type={"file"}
                    accept="image/*"
                    placeholder="Image"
                    className="block w-[80%] text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-500 file:text-green-700"
                  />
                </Field>
              </FieldGroup>
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={() => setPopUp(false)}
                className="py-2 px-6 text-white bg-purple-500 mr-4 rounded-md font-bold"
              >
                Back
              </button>
              <button
                onClick={handleUpdate}
                className="py-2 px-6 text-white bg-purple-500 rounded-md font-bold"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
