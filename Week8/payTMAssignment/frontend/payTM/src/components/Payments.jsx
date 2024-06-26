import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atom";

export default function Payments() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:3000/api/payments", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const response2 = await fetch("http://localhost:3000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if(response2.ok) {
            const userData = await response2.json();
            setUser(userData);
          }

          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            console.error("Failed to fetch transactions");
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading Transactions....</div>;
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>Contains all your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-x-auto">
            <Table>
              <TableCaption>A list of your recent transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-lg font-semibold">
                    Sender
                  </TableHead>
                  <TableHead className="text-lg font-semibold">
                    Recipient
                  </TableHead>
                  <TableHead className="text-lg font-semibold text-right">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>
                      {transaction.sender._id === user._id
                        ? "You"
                        : transaction.sender.username}
                    </TableCell>
                    <TableCell>
                      {transaction.recipient._id === user._id
                        ? "You"
                        : transaction.recipient.username}
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.sender._id === user._id ? (
                        <span className="text-red-500">
                          $ -{transaction.amount}
                        </span>
                      ) : (
                        <span className="text-green-500">
                          $ +{transaction.amount}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}