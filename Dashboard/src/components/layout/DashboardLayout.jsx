import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardLayout = () => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/auth/getme", {
      withCredentials : true
    })
    .then((res)=>{
      setUser(res.data);
    })
    .catch((err)=>{
      navigate("/login")
    })
    .finally(()=>{
      setLoading(false);
    })

  }, [])
  if(loading){
    return <div>Loading .........</div>
  }
  return (
        <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-muted/40 flex-1 overflow-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout