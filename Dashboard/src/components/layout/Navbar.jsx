import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = () => {
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
    <header className="h-16 border-b bg-white flex item-center justify-between">
      <h2 className="font-semibold text-lg">Admin Dashboard</h2>
      <Avatar className="w-10 h-10">
        {/* <AvatarImage src={currentUser?.profileImage} alt="profile" /> */}

        <AvatarFallback className="flex gap-x-1">
          <span className="font-bold uppercase">{currentUser?.firstName?.[0]}</span>
          <span className="font-bold uppercase">{currentUser?.lastName?.[0]}</span>
        </AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Navbar;
