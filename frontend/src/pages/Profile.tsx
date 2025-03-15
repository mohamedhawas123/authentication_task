import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../services/profileService";
import { useNavigate } from "react-router-dom";
import backgrounImage from "../../src/assets/signIn-image.svg";
import Button from "../components/Button";

const ProfilePage = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect if no token
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token);
        console.log(profileData)
        setUser(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        logout(); // Logout on failure
        navigate("/signin");
      }
    };

    fetchProfile();
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="w-1/2 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="font-bold text-[28px]">
            Welcome, {user ? user.name : "User"}!
          </h1>
          <p className="font-normal text-[14px] mt-2">
            {user ? `Email: ${user.email}` : "Loading..."}
          </p>

          {/* Logout Button */}
          <div className="text-center mt-5">
            <Button label="Logout" onClick={handleLogout} />
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

export default ProfilePage;
