import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLoginUser } from "@/hooks/use-LoginUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const mutation = useLoginUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({ email, password });

    if (mutation.isSuccess && mutation.data) {
      toast({
        title: "Login successful",
        description: "Welcome back to Kovora Inventory Management System",
      });
      navigate("/dashboard");
    } else if (mutation.isError) {
      toast({
        title: "Login failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    // This would integrate with Supabase authentication for Google sign-in
    toast({
      title: "Google Login",
      description: "Google authentication requires Supabase integration",
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
       
        {/* Logo */}
        <div className="mb-12">
          <Link
            to="/"
            className="text-2xl font-bold leading-tight tracking-tight"
          >
            KOVORA
            <p className="text-xs text-black poppins-regular mt-1">
              CONSULTANTS
            </p>
          </Link>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-2 mb-8 text-[#1D2460] ">
            <h1 className="text-3xl text-center poppins-regular">
              Powering{" "}
              <span className="instrument-serif-regular-italic">Precision</span>
            </h1>
            <h2 className="text-3xl text-center poppins-regular  mb-8">
              in Inventory
            </h2>
            <h3 className="text-2xl poppins-bold text-center mb-6">
              Log in to your account
            </h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter product supplier"
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

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-kovora hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-kovora hover:bg-kovora-dark"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* TODO: Integrate the google login using express and authjs  */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 flex rounded-full items-center justify-center space-x-2"
              onClick={handleGoogleLogin}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>
              <span>Sign In with Google</span>
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>{" "}
            <Link
              to="/signup"
              className="text-sm text-kovora hover:underline font-medium"
            >
              Sign Up
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

export default Login;
