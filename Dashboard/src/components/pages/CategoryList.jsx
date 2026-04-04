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
import CreateCategory from "./CreateCategory";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://ecommerceapi-wpz8.onrender.com/api/v1/category/allcategorylist").then(
      (res) => setCategories(res.data.data),
      // console.log(res.data.data)
    );
  }, []);
  // console.log(categories);

  const handleCategoryListDelete =(id)=>{
    axios.delete(`https://ecommerceapi-wpz8.onrender.com/api/v1/category/deletecategory/${id}`)
    setCategories(categories.filter((item) => item._id !== id))
  }

  return (
    <>
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
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <Link to={`/category/update/${item._id}`}>
                      <Button size="sm" className={"bg-green-500 text-white"}>
                        Update
                      </Button>
                    </Link>
                    <Link to={`/category/delete/${item._id}`}>
                      <Button size="sm" variant="destructive" onClick={(e)=>handleCategoryListDelete(item._id)}>
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
    </>
  );
};

export default CategoryList;
