import React, { FC } from "react";
import "./input.scss";
interface InputProps {
  type: string;
  value: string;
  label?: string;
  help?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const Input = (props: InputProps) => {
  return (
    <div className="">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        type={props.type}
        className="form-control j-input"
      />
      {/* <div className={type + "Help form-text"}>{help}</div> */}
    </div>
  );
};

export default Input;
