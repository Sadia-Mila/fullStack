import React from "react";
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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/product/allproductList").then(
      (res) => setProducts(res.data.data),
      // console.log(res.data.data)
    );
  }, []);
  // console.log(categories);

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
                <TableHead className="text-end pr-14">Actions</TableHead>
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
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="font-medium">{item.ram}</TableCell>
                  <TableCell className="font-medium">{item.storage}</TableCell>

                  <TableCell>
                    <img src={item.image} alt={item.name} className="h-10" />
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Link to={`/product/update/${item._id}`}>
                      <Button size="sm" className={"bg-green-500 text-white"}>
                        Update
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
    </>
  );
};

export default ProductList;
