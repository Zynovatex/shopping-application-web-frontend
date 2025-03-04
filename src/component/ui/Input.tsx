import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="border rounded-md p-2 mt-1" />
    </div>
  );
};

export default Input;
