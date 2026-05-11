import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [idStore, setIdStore] = useState('');

  //Edit Category
  const handleEdit = (id, name, description) => {
    setIdStore(id);
    setCategoryName(name);
    setCategoryDescription(description);
    setPopUp(true);
  };
  //Edit Category

  //update Category
  const handleUpdateCategory = ()=>{
    axios.patch(`http://localhost:3000/api/v1/category/updatecategory/${idStore}`,
      {name: categoryName,
        description: categoryDescription,
      }
    ).then((res)=>{
      setCategories((prev)=>
      prev.map((item)=>
      item._id === idStore
    ?{
      ...item,
      name: categoryName,
      description: categoryDescription,
    }
    :
    item
    ))
    setPopUp(false)
        
    })
  }
  //update Category

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category/allcategorylist")
      .then((res) => setCategories(res.data.data));
  }, []);
  // console.log(categories);

  const handleCategoryListDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/category/deletecategory/${id}`);
    setCategories(categories.filter((item) => item._id !== id));
  };

  return (
    <>
      <div className="">
        <div className="p-6">
          <h4 className="text-2xl font-bold mb-6">Category List</h4>
        </div>
        <div className="max- w-2/3">
          <div className="rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sl. no.</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Category Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium capatalized">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        onClick={() =>
                          handleEdit(item._id, item.name, item.description)
                        }
                        size="sm"
                        className={"bg-green-500 text-white"}
                      >
                        Edit
                      </Button>

                      <Link to={`/category/delete/${item._id}`}>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => handleCategoryListDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#00000080] ">
          <div className="w-[500px] h-[350px] bg-white rounded-lg py-6 px-8">
            <h2 className="font-bold text-center text-2xl">Update Category</h2>
            <div className="w-full mt-2">
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
                  <div className="flex justify-center items-center">
                    <Button onClick={() => setPopUp(false)} className="mr-4">
                      Back
                    </Button>
                    <Button onClick={handleUpdateCategory}>
                      Update Category
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
