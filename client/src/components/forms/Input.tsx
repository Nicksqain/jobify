import React, { FC, useEffect } from "react";
import "./input.scss";
interface InputProps {
  type: string;
  className?: string;
  placeholder?: string;
  label?: string;
  help?: string;
  value?: string | number,
  mask?: string,
  defaultValue?: string | number,
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const Input: FC<InputProps> = ({ label, placeholder, setValue, type, className, defaultValue, value, mask }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

  };

  // Функция для применения маски
  const applyNumberMask = (value: string) => {
    // Удаляем все символы, кроме цифр
    return value.replace(/[^0-9]/g, '');
  };

  return (
    <>
      {label ? <label htmlFor="exampleInputEmail1" className="form-label">
        {label}
      </label> : void (0)}

      <input
        placeholder={placeholder}
        onChange={handleInputChange}
        type={type}
        value={value}
        defaultValue={defaultValue}
        className={`form-control j-input ${className ?? ""}`}
      />
      {/* <div className={type + "Help form-text"}>{help}</div> */}
    </>
  );
};

export default Input;
