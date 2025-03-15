import { useFormContext } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const Input = ({ label, name, type = "text", placeholder }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5">
      <label className="font-normal text-[14px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 
          ${errors[name] ? "border-red-500" : "border-[#D9D9D9]"} 
          placeholder:text-[#DDDDDD] placeholder:font-normal`}
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name] as any).message}
        </p>
      )}
    </div>
  );
};

export default Input;
