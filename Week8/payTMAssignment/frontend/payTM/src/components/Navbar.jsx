import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom"; 
import { useSetRecoilState } from "recoil";
import { usersState } from "@/store/atom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const navigate = useNavigate();
  const setUsers = useSetRecoilState(usersState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/" 
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <CreditCard className="h-6 w-6" />
          <span className="sr-only">PayTM App</span>
        </Link>
        <Link to="/" className="text-lg font-semibold hover:text-foreground">
          PayTM
        </Link>
        <Link to="/payments" className="text-muted-foreground hover:text-foreground">
          Payments
        </Link>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/" 
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <CreditCard className="h-6 w-6" />
              <span className="sr-only">PayTM App</span>
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              PayTM
            </Link>
            <Link to="/payments" className="text-muted-foreground hover:text-foreground">
              Payments
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full l items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 flex-initial">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile"> 
                <DropdownMenuItem>My Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}