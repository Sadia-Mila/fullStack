import StatCard from "@/components/ui/StatCard";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

const StatCard = () => {
  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Sales"
        value="$12,400"
        icon={<DollarSign size={18} />}
      />

      <StatCard
        title="Orders"
        value="320"
        icon={<ShoppingCart size={18} />}
      />

      <StatCard
        title="Customers"
        value="1,240"
        icon={<Users size={18} />}
      />
      </div>

  )
}

export default StatCard