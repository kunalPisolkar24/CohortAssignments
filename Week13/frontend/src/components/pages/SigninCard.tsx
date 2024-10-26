import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SigninCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">Login to your Account</p>
        </div>
        <form className="space-y-4 mt-8">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  ) 
}
export default SigninCard;
