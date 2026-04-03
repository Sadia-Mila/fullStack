import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const Sidebar = () => {
   const [openCategory, setOpenCategory] = useState(false);
   const [openProducts, setOpenProducts] = useState(false);

  return (
    <div className="w-64 border-r bg-background p-4 space-y-4">
      <h2 className="text-xl font-bold">Ecommerce</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/" className="flex gap-2 items-center">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        {/* Category Dropdown */}
        <Collapsible open={openCategory} onOpenChange={setOpenCategory}>
          <CollapsibleTrigger className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <Layers size={18} />
              Category
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openCategory ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="ml-6 mt-2 flex flex-col gap-2 text-sm">
            <Link to="/category/create">Create Category</Link>
            <Link to="/category/list">Category List</Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Product Drop Down */}
        <Collapsible open={openProducts} onOpenChange={setOpenProducts}>
          <CollapsibleTrigger className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <Layers size={18} />
              Products
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openProducts ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="ml-6 mt-2 flex flex-col gap-2 text-sm">
            <Link to="/product/create">Create Product</Link>
            <Link to="/product/List">Product List</Link>
          </CollapsibleContent>
        </Collapsible>

        {/* <Link to="/products" className="flex gap-2 items-center">
          <Package size={18} /> Add Products
        </Link>
        <Link to="/productList" className="flex gap-2 items-center">
          <Package size={18} /> Product List
        </Link> */}

        <Link to="/orders" className="flex gap-2 items-center">
          <ShoppingCart size={18} /> Orders
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
