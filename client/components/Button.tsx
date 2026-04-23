import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onclick?: () => void;   // ✅ rename
  Icon?: IconType;
  type?: "button" | "submit";
}

const Button = ({ label, onclick, Icon, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className="dark:bg-[#354050] cursor-pointer hover:bg-[#29303c] px-2 py-2 rounded-md flex justify-center items-center gap-3"
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;