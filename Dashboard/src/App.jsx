import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import CreateCategory from "./components/pages/CreateCategory";
import CategoryList from "./components/pages/CategoryList";
import UpdateCategory from "./components/pages/UpdateCategory";
import DeleteCategory from "./components/pages/DeleteCategory";
import CreateProduct from "./components/pages/CreateProduct";
import ProductList from "./components/pages/ProductList";
import Orders from "./components/pages/Orders";
import Registration from "./components/pages/Registration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/category">
            <Route path="create" element={<CreateCategory />} />
            <Route path="list" element={<CategoryList />} />
            <Route path="update/:id" element={<UpdateCategory />} />
            <Route path="delete/:id" element={<DeleteCategory />} />
          </Route>
          <Route path="/product">
            <Route path="create" element={<CreateProduct />} />
            <Route path="list" element={<ProductList />} />
            {/* <Route path="update/:id" element={<UpdateCategory />} />
            <Route path="delete/:id" element={<DeleteCategory />} /> */}
          </Route>

          <Route path="/orders" element={<Orders />} />
        </Route>
          <Route path="/registration" element={<Registration/>} />
      </Routes>
    </>
  );
}

export default App;
