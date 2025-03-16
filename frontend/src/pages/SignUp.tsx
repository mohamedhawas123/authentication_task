import { Link } from "react-router-dom";
import backgrounImage from "../../src/assets/signIn-image.svg";
import AuthForm from "../components/Form";

const SignUpPage = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Column (Form) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="font-bold text-[28px] text-center md:text-left">
            Create an Account
          </h1>
          <p className="font-normal text-[14px] mt-2 text-center md:text-left">
            Fill in the details below to register.
          </p>

          {/* Sign-up Form */}
          <div className="mt-9">
            <AuthForm isSignUp={true} />
          </div>

          {/* Log In Link */}
          <div className="text-center mt-5">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-500 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column (Image - Hidden on Mobile) */}
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

export default SignUpPage;
