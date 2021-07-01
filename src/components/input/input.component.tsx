import React from "react";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  label?: string;
  [x: string]: any;
}

const Input: React.FC<InputProps> = ({ onChange, ...otherProps }) => (
  <input className="input" onChange={onChange} {...otherProps} />
);

export default Input;
