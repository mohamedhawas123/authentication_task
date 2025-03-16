import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  //if not token redirect to sign in
  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
