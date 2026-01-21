import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  onMouseEnter,
  disabled,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 !px-4 !py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition ${className}`}
      onMouseEnter={onMouseEnter}
    >
      {label}
      {icon && <span className="text-xl">{icon}</span>}
    </button>
  );
};

export default Button;
