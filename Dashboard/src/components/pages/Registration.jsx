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
import toast from "react-hot-toast";

      {/* OTP Modal */}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";

      {/* OTP Modal */}

const Registration = () => {
         {/* OTP Modal */}
  const [openOtpModal, setOpenOtpModal] = useState(false);
   const [otp, setOtp] = useState("")
   const navigate = useNavigate()
  
      {/* OTP Modal */}
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
    axios
      .post(
        "https://ecommerceapi-wpz8.onrender.com/api/v1/auth/signup",
        registrationData,
      )
      .then((data) => {
        console.log("Success");
        
        toast.success("Registration Done Successfully. Now Verify Otp");
        setOtp({ ...otp, email: registrationData.email });
        setOpenOtpModal(true); // Open OTP modal
        
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };
  /*Otp Varification */
  const handleOtpChange = (e) => {
    setOtp({
      ...otp,
      [e.target.name]: e.target.value,
    });
  };
   const handleVerifyOtp = () => {
    axios
      .post(
        "https://ecommerceapi-wpz8.onrender.com/api/v1/auth/otpVerify",
        otp
      )
      .then((data) => {
        toast.success("OTP Verified Successfully 🎉");
        setOpenOtpModal(false); // Close modal
        navigate("/login")
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Invalid OTP");
      });
  };
     /*Otp Varification */
 
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
              <Link to={"/login"}>
              <Button variant="link">Login</Button>
              </Link>
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
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="button" onClick={handleRegBtn} className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      
      
      {/* OTP Modal */}
      <Dialog open={openOtpModal} onOpenChange={setOpenOtpModal}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>OTP Verification</DialogTitle>
            <DialogDescription>
              Enter the OTP & sent to the email: {registrationData.email}
            </DialogDescription>
          </DialogHeader>
          {openOtpModal &&(
          <div className="space-y-4">
          
            <div>
                <Input
                name="otp"
                onChange={handleOtpChange}
                placeholder="Enter Your OTP"
              />
            </div>
            <Button onClick={handleVerifyOtp} className="w-full">
              Verify OTP
            </Button>
          </div>
         )}
        </DialogContent>
      </Dialog>
      
      </div>
    </div>
  );
};

export default Registration;
