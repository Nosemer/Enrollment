import LoginForm from "../components/forms/loginForm";
import { useEffect } from "react";

const LoginPage = () => {
    useEffect(() => {
      document.title = "Student Login";
    }, []);
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm role="students" />
        
        {/* Register link below the form */}
        <p className="text-sm mt-2 text-center text-dark">
          Don’t have an account?{" "}
          <a href="/students/register" className="text-blueish font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
