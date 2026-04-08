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
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  console.log(loginData);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginBtn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        loginData,
      );
      if (res.data.success === true) {
         toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/")
          
        },800);
    
      } else {
        toast.error("Invalid Email and Password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="py-12">
        <div className="max-w-292.5 mx-auto">
          <Card className="w-full max-w-sm m-auto">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      onChange={handleLoginChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" onClick={handleLoginBtn}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
