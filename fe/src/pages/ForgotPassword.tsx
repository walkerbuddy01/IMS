import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset request
    setTimeout(() => {
      if (email) {
        setIsSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions",
        });
      } else {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="mb-12">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            KOVORA
            <p className="text-xs text-muted-foreground mt-1">CONSULTANTS</p>
          </Link>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-medium">Reset Password</h1>
            <p className="text-muted-foreground mb-8">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />

              <Button
                type="submit"
                className="w-full h-12 bg-kovora hover:bg-kovora-dark"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 text-green-800 rounded">
                Reset link sent! Check your email for instructions.
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-kovora hover:underline font-medium"
            >
              Back to Sign In
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

export default ForgotPassword;
