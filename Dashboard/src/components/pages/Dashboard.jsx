import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/auth/currentuser",
          { withCredentials: true },
        );
        setCurrentUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="space-y-8">
    <h2 className="text-3xl font-bold">Welcome <span className="capitalize">{currentUser?.firstName} {currentUser?.lastName}</span> to Dashboard </h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>$12,400</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>320</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>1,240</CardContent>
      </Card>
    </div>
    </div>
   
  );
};

export default Dashboard;
