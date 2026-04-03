import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header className="h-16 border-b bg-white flex item-center justify-between">
      <h2 className="font-semibold text-lg">Admin Dashboard</h2>
      <Avatar>
        <AvatarFallback>Sadia</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Navbar;
