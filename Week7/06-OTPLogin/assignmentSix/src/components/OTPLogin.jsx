
import React, { useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OTPLogin() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);


  const handleInputChange = (index, value) => {
    if (isNaN(Number(value)) && value !== "") return;
  
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });
  
    // Focus on the next input field
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleClick = () => {
    if (validateEmail(email)) {
      setShowLogin(!showLogin);
    } else {
      setIsEmailValid(false);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Card className="w-[350px] m-auto mt-[20rem]">
      <CardHeader>
        <CardTitle>Login via OTP</CardTitle>
        <CardDescription>Enter your OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        {showLogin ? (
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(true);
                  }}
                  className={!isEmailValid && "border-red-500"}
                />
                {!isEmailValid && (
                  <p className="text-red-500 text-xs">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <Button type="button" onClick={handleClick}>
                Send
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                {otp.slice(0, 3).map((digit, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    value={digit}
                    onChange={(value) => handleInputChange(index, value)}
                    id={`otp-${index}`}
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {otp.slice(3, 6).map((digit, index) => (
                  <InputOTPSlot
                    key={index + 3}
                    index={index + 3}
                    value={digit}
                    onChange={(value) => handleInputChange(index + 3, value)}
                    id={`otp-${index + 3}`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="flex gap-8">
              <Button variant="outline" onClick={handleClick} className=" mt-8">
                Cancel
              </Button>
              <Button type="submit" className=" mt-8 w-full">
                Send
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}