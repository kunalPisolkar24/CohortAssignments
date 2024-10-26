import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import signupImage from "../../assets/signupImage.jpg";
import SignupCard from './SignupCard';

import { useState, useEffect } from 'react';

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024); // 'lg' breakpoint in Tailwind

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLarge;
};

const Signup: React.FC = () => {
  const isLargeScreen = useIsLargeScreen();

  if (!isLargeScreen) {
    return <SignupCard />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center py-6">
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Share your stories with the world
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our blogging community and start publishing your content today.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">User Name</Label>
                  <Input id="username" placeholder="Enter your UserName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your Password" required />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
          <img
            src={signupImage}
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </section>
    </main>
  );
}

export default Signup;
