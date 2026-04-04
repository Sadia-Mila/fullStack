import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast/headless";

const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegBtn = () => {
    axios.post("http://localhost:3000/api/v1/auth/signup", registrationData)
    .then((data)=>{
      toast.success("Registration Done Successfully Now Verify Otp")
    })
    .catch((error)=>{
      
    })
  };
  return (
    <div className="py-12 m-auto">
      <div className="max-w-292.5 m-auto">
        <Card className="w-full max-w-sm m-auto text-left mt-5">
          <CardHeader>
            <CardTitle>Login your account</CardTitle>
            <CardDescription>
              Enter your Firstname, LastName, Email & Password below to login
              your account .....!
            </CardDescription>
            <CardAction>
              <Button variant="link">Login</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Last Name</Label>
                  <Input
                    name="lastName"
                    onChange={handleChange}
                    type="text"
                    placeholder="LastName"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Your email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label onChange={handleChange} htmlFor="password">
                      Password
                    </Label>
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button onClick={handleRegBtn} className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
