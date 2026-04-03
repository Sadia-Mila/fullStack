import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [updateCategoryDescription, setUpdateCategoryDescription] =
    useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/category/singleCategorylist/${id}`)
      .then((res) => {
        setUpdateCategoryName(res.data.data.name);
        setUpdateCategoryDescription(res.data.data.description);
      });
  }, [id]);
  const handleUpdateCategoryBtn = () =>{
   try {
     const formData ={
      name: updateCategoryName,
      description: updateCategoryDescription,
    }
    axios.patch(`http://localhost:3000/api/v1/category/updatecategory/${id}`, formData)
    toast.success("Update Successfully")
    setTimeout(() => {
      navigate("/category/list")
      
    }, 1000);

    
   } catch (error) {
    toast.error("Update failed")
    
   }
  }
  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">
        Update Category ID: {id}
      </p>

      <div className="max-w-1/3 mt-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Update Category Name</FieldLabel>
            <Input
              value={updateCategoryName}
              placeholder="Update Category Name"
              onChange={(e) => {
                setUpdateCategoryName(e.target.value);
              }}
            />
          </Field>
          <Field>
            <FieldLabel>Update Category Description</FieldLabel>
            <Textarea
             value={updateCategoryDescription}
              placeholder="Type your updated Category Description here."
              onChange={(e) => {
                setUpdateCategoryDescription(e.target.value);
              }}
            />
          </Field>

          <Button className="max-w-1/2" onClick={handleUpdateCategoryBtn} >
            Update Category
          
          </Button>
        </FieldGroup>
      </div>
    </>
  );
};

export default UpdateCategory;
