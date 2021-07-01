import React from "react";
import "./spinner.styles.scss";
interface FormInputProps {
  size: number;
  [x: string]: any;
}
export const Spinner: React.FC<FormInputProps> = ({ size }) => {
  return (
    <div className="overlay" style={{ height: size * 3 + 5, width: size * 3 }}>
      <div
        className="overlay-container"
        style={{ height: size, width: size }}
      />
    </div>
  );
};

export default Spinner;
