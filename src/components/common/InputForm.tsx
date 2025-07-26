import React from "react";

type Props = {
  defaultValue?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  children?: React.ReactNode;
  min?: string;
};

const InputForm = ({
  defaultValue,
  type,
  name,
  placeholder,
  children,
  min,
}: Props) => {
  return (
    <div className="relative">
      <input
        min={min}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
      />
      {children}
    </div>
  );
};

export default InputForm;
