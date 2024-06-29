import React from "react";
import { CircleUser, Menu, CreditCard, Search, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, usersState } from "@/store/atom";
import { useEffect, useState, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
function Dashboard() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  const users = useRecoilValue(usersState);
  const setUsers = useSetRecoilState(usersState);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.log("Failed to fetch user data");
          }
        } catch (error) {
          console.log("Failed to fetch user data");
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    let timeoutId;
    const fetchUsers = async () => {
      if (searchQuery) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `http://localhost:3000/api/users?query=${String(searchQuery)}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const users = await response.json();
            console.log("users", users);
            setUsers(users);
          } else {
            console.log("Failed to fetch user data");
          }
        } catch (error) {
          console.log("Failed to fetch user data", error);
        }
      }
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    navigate("/login");
  };

  const [paymentData, setPaymentData] = useState({
    recipientId: "",
    amount: 0,
    password: "",
  });

  const handlePaymentChange = (e) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendMoney = async () => {
    try {
      if (paymentData.password !== "confirm") {
        alert("Please enter valid password");
        return;
      }

      if (paymentData.amount <= 0 || !paymentData.password) {
        alert("Please enter valid amount and password");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient: paymentData.recipientId,
          amount: parseFloat(paymentData.amount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Payment successful", data);
        alert("Payment successful");

        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:3000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.log("Failed to fetch updated user data");
          }
        }
      } else {
        const errorData = await response.json();
        console.log("Payment failed", errorData.message);
        alert(`Payment failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error while sending payment:", error);
      alert(`An error occurred while sending payment: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <CreditCard className="h-6 w-6" />
              <span className="sr-only">PayTM App</span>
            </Link>
            <Link
              href="#"
              className="text-lg font-semibold hover:text-foreground"
            >
              PayTM
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="sr-only">PayTM App</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  PayTM
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
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
                  <Link to={``}>
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

        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-8 ">
          <Card x-chunk="dashboard-01-chunk-0" className="w-[20rem]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Your Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $ {user?.balance ? user.balance : 0}
              </div>
            </CardContent>
          </Card>

          <div className="py-8 md:py-[0]">
            <form className="">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  value={searchQuery}
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className=""></div>

          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {user.username.charAt(0).toUpperCase()}{" "}
                        {/* Display first letter as capital */}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {user.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="ml-auto"
                          onClick={() =>
                            setPaymentData({
                              ...paymentData,
                              recipientId: user._id,
                            })
                          }
                        >
                          Send Money
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Make Payment </DialogTitle>
                          <DialogDescription>
                            Make payment to {user.username}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                              Amount
                            </Label>
                            <Input
                              id="amount"
                              value={paymentData.amount}
                              onChange={handlePaymentChange}
                              type="number"
                              name="amount"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                              Password
                            </Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={paymentData.password}
                              onChange={handlePaymentChange}
                              placeholder="Enter your password"
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => {
                              handleSendMoney(user._id);
                              setPaymentData({
                                recipientId: user._id,
                                amount: 0,
                                password: "",
                              });
                            }}
                          >
                            Send Money
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
