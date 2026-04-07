import React from 'react'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div className="p-5">
      <h1>Dashboard Layout</h1>
      <Outlet /> 
    </div>
  )
}

export default DashboardLayout