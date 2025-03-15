import { useState } from "react";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ label, disabled, onClick }: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setLoading(true);
      await onClick();
      setLoading(false);
    }
  };

  return (
    <button
      type="submit"
      className={`mt-6 p-2 rounded-lg text-white transition-all duration-300 
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#3A5B22] hover:bg-[#2c4718]"
        }`}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
