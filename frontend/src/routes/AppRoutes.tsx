import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import ProfilePage from "../pages/Profile";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Accessible Without Login) */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes (Requires Login) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to SignIn */}
          <Route path="*" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
