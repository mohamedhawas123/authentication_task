import { Link } from "react-router-dom";
import backgrounImage from "../../src/assets/signIn-image.svg";
import AuthForm from "../components/Form";

const SignInPage = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Column (Form) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col w-full max-w-md">
          <div className="font-bold text-[28px] text-center md:text-left">
            Welcome back!
          </div>
          <div className="font-normal text-[14px] mt-2 text-center md:text-left">
            Enter your credentials to access your account
          </div>

          {/* Input Fields */}
          <div className="mt-9">
            <AuthForm isSignUp={false} />
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-5">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column (Image - Hidden on Small Screens) */}
      <div className="hidden md:block w-1/2">
        <img
          src={backgrounImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
