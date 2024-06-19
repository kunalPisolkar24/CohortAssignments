
import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputCard() {
  const [name, setName] = useState("");
  const [showResultCard, setShowResultCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResultCard(true);
  };

  return (
    <div className="flex flex-col bg-white-900 items-center my-[10rem] gap-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Enter your Name:</CardTitle>
          <CardDescription>
            Enter your name to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showResultCard && (
        <Card className="w-auto h-[140px] flex justify-center">
          <CardHeader>
            <CardTitle>Welcome, {name} 🖐️!</CardTitle>
            <CardDescription className="py-3">
            🎉 🎊  This card is wishing you a Happy Birthday to you 🥳 🥳 🎊 🎉.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}