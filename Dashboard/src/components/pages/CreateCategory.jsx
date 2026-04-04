import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const navigate = useNavigate()

  const formData = {
    name: categoryName,
    description: categoryDescription,
  };

  const handleCreateCategory = async () => {
    if (!categoryName || !categoryDescription) {
      return toast.error("All fields are required");
    }
    try {
      const res = await axios.post(
        "https://ecommerceapi-wpz8.onrender.com/api/v1/category/createcategory",
        formData,
      );

      toast.success("Category Created Successfully!");
      navigate("/category/list")

      setCategoryName("");
      setCategoryDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <h2 className="font-bold">Create Category</h2>
      <div className="max-w-1/3 mt-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Category Name</FieldLabel>
            <Input
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
          </Field>
          <Field>
            <FieldLabel>Category Description</FieldLabel>
            <Textarea
              placeholder="Type your Description here."
              value={categoryDescription}
              onChange={(e) => {
                setCategoryDescription(e.target.value);
              }}
            />
          </Field>
          <Field>
            <Button type="submit" onClick={handleCreateCategory}>
              Add Category
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </>
  );
};

export default CreateCategory;
