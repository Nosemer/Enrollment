import RegisterForm from "../components/forms/registerForm";

const RegisterPage = () => {
  return (
   <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
      <RegisterForm role="student" />
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
        </div>
      </div>
  );
};

export default RegisterPage;
