import { Link } from "react-router-dom";
import backgrounImage from "../../src/assets/signIn-image.svg";
import AuthForm from "../components/Form";

const SignUpPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="w-1/2 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="font-bold text-[28px]">Create an Account</h1>
          <p className="font-normal text-[14px] mt-2">
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

      {/* Right Column */}
      <div className="w-1/2">
        <img src={backgrounImage} alt="Background" />
      </div>
    </div>
  );
};

export default SignUpPage;
