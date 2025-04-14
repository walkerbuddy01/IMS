
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRegisterUser } from "@/hooks/use-RegisterUser";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mutation = useRegisterUser();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    e.preventDefault();

    mutation.mutate({ fullname, email, password });

  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Signup Form */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="mb-12">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            KOVORA
            <p className="text-xs text-black poppins-regular mt-1">CONSULTANTS</p>
          </Link>
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-medium">Create Account</h1>
            <h2 className="text-lg text-muted-foreground mb-8">Join Kovora Inventory Management System</h2>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
          <Input
              type="text"
              placeholder="FullName"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="h-12 rounded-2xl"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-2xl"
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-2xl"
            />
            
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 rounded-2xl"
            />
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-kovora hover:bg-kovora-dark rounded-full"
              disabled={isLoading}
            >
              {mutation.isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Already have an account?</span>{" "}
            <Link to="/login" className="text-sm text-kovora hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </div>
        
        {/* Footer space */}
        <div className="h-12"></div>
      </div>
      
      {/* Right side - Branding Background */}
      <div className="hidden lg:block flex-1 bg-kovora relative overflow-hidden">
        <div className="absolute inset-0">
        <img 
            src="/images/7f96cec3-2d0e-4d0c-8ce9-fe2a67a487ed.png" 
            alt="KOVORA Analytics" 
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
