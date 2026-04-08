import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const UserList = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/auth/userlist").then(
      (res) => setUser(res.data.data),
      // console.log(res.data.data)
    );
  }, []);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User List</h1>

        <Input placeholder="Search user..." className="w-[250px]" />
      </div>

      {/* User Table */}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {user.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {item.firstName} {item.lastName}
                </TableCell>

                <TableCell>{item.email}</TableCell>

                <TableCell>
                  <Badge variant="outline">{item.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{new Date(item.createdAt).toLocaleDateString()}</Badge>
                </TableCell>

                <TableCell>
                  {item.isVerified ? (
                    <Button size="sm" className={"bg-green-500 text-white"}>
                      Verified
                    </Button>
                  ) : (
                    <Button size="sm" className={"bg-blue-500 text-white"}>
                      Pending
                    </Button>
                  )}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button size="sm">Edit</Button>

                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
