import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser, registerUser } from "../services/authService";
import Input from "./Input";
import Button from "./Button";

interface AuthFormProps {
  isSignUp?: boolean; // determines if the form is for sign-up or sign-in
}

interface AuthFormValues {
  email: string;
  password: string;
  name?: string; // nnly used for sign-up
}

// Validation schemas for Sign In and Sign Up
const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Za-z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const AuthForm = ({ isSignUp = false }: AuthFormProps) => {
  const methods = useForm<AuthFormValues>({
    defaultValues: { email: "", password: "", name: "" },
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data: AuthFormValues) => {
    setError(""); // reset error message
    try {
      if (isSignUp) {
        const response = await registerUser(
          data.email,
          data.name!,
          data.password
        ); // sign Up
        login(response.access_token);
        navigate("/profile"); // redirect to Profile
      } else {
        const response = await loginUser(data.email, data.password); // Sign In
        login(response.access_token);
        navigate("/profile");
      }
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-md"
      >
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {isSignUp && (
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
          />
        )}
        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Button label={isSignUp ? "Sign Up" : "Sign In"} disabled={!isValid} />
      </form>
    </FormProvider>
  );
};

export default AuthForm;
