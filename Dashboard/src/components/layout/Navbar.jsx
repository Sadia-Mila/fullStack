import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  // ======== handleLogOut ===================
  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/auth/logout",
        { withCredentials: true },
      );
      //force reload
      window.location.href = "/login";
      //force reload
    } catch (error) {
      console.log(error);
    }
  };

  // =================== handleLogOut =================
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
    <header className="h-14 border-b bg-white flex item-center justify-between pt-2">
      <h2 className="font-semibold text-lg">Admin Dashboard</h2>
      <Avatar className="w-40 h-8 gap-x-4 mt-2">
        {/* <AvatarImage src={currentUser?.profileImage} alt="profile" /> */}

        <AvatarFallback className="flex gap-x-1 px-4">
          <span className="font-bold uppercase">{currentUser?.firstName}</span>
          <span className="font-bold uppercase">{currentUser?.lastName}</span>
        </AvatarFallback>
      </Avatar>
      <button
        className="py-1 px-6 bg-amber-600 rounded-lg font-sm text-white mr-4"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </header>
  );
};

export default Navbar;
