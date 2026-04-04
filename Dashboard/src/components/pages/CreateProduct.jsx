import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [selectCategory, setSelectCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [image, setImage] = useState(null);
  const handleProductBtn = () => {
    const formData = new FormData();

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("category", selectCategory);
    formData.append("ram", ram);
    formData.append("storage", storage);
    formData.append("image", image);

    axios
      .post("https://ecommerceapi-wpz8.onrender.com/api/v1/product/createproduct", formData)
      .then((res) => console.log(res));

    toast.success("Product Created Successfully!");

    setProductName("");
    setProductDescription("");
    setPrice("");
    setSize("");
    setColor("");
    setCategory("");
    setRam("");
    setStorage("");
  };

  //Get Category List
  const [categories, setCategories] = useState([]);
  //For selection Category
  //For selection Category
  useEffect(() => {
    axios
      .get("https://ecommerceapi-wpz8.onrender.com/api/v1/category/allcategorylist")
      .then((res) => {
        setCategories(res.data.data);
        if(res.data.data.length > 0) {
          setSelectCategory(res.data.data[0].name);
          console.log(res.data.data[0].name);
          
        }
      });
  }, []);
  //Get Category List

  return (
    <>
      <h2 className="font-bold">Add Products</h2>
      <div className="max-w-md mt-4">
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
            <FieldLabel>Price</FieldLabel>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </Field>
          <Field>
            <FieldLabel>Size</FieldLabel>
            <Input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="size"
            />
          </Field>
          <Field>
            <FieldLabel>Color</FieldLabel>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
            />
          </Field>
          <Field>
            <FieldLabel>Category</FieldLabel>
            {/* <Select>
              <SelectTrigger>
                <SelectValue  value={category}
              onChange={(e) => setCategory(e.target.value)}placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            <Select onValueChange={(value) => setSelectCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item._id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <select onChange={selectCategory}>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
                  
                ))}
            </select> */}
          </Field>
          <Field>
            <FieldLabel>Ram</FieldLabel>
            <Input
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="ram"
            />
          </Field>
          <Field>
            <FieldLabel>Storage</FieldLabel>
            <Input
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              placeholder="Storage"
            />
          </Field>
          <Field>
            <FieldLabel>Product Image</FieldLabel>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type={"file"}
              accept="image/*"
              placeholder="Image"
              />
          </Field>
          <Field>
            <Button onClick={handleProductBtn}>Add Product</Button>
          </Field>
        </FieldGroup>
      </div>
    </>
  );
};

export default CreateProduct;
