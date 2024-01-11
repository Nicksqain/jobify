import { FC, useState, useEffect, ReactNode, Children, cloneElement, isValidElement } from "react";
import './radioGroup.scss'
interface RadioGroupProps {
      name: string;
      setValue?: (value: string | null) => void;
      className?: string;
      children: ReactNode;
}

interface RadioButtonProps {
      value: string;
      children: ReactNode;
      name?: string;
      onChange?: (value: string) => void;

}

const RadioButton: FC<RadioButtonProps> = ({ value, children, name, onChange }) => {
      const handleRadioButtonChange = () => {
            if (onChange) {
                  onChange(value);
            }
      };

      return (
            <label className="j-radio">
                  <input
                        type="radio"
                        value={value}
                        className="j-radio-icon"
                        name={name}
                        onChange={handleRadioButtonChange}
                  />
                  <span className="j-radio-label">{children}</span>
            </label>
      );
};

const RadioGroup: FC<RadioGroupProps> = ({ name, setValue, className, children }) => {
      const [selectedValue, setSelectedValue] = useState<string | null>(null);

      useEffect(() => {
            if (setValue) {
                  setValue(selectedValue);
            }
      }, [selectedValue, setValue]);

      const handleRadioButtonChange = (value: string) => {
            setSelectedValue(value);
      };

      // Фильтруем только RadioButton и исключаем другие элементы
      const radioButtons = Children.toArray(children).filter((child) => {
            return isValidElement(child) && child.type === RadioButton;
      });

      const childrenWithProps = radioButtons.map((child) => {
            return cloneElement(child as React.ReactElement<RadioButtonProps>, {
                  name,
                  onChange: handleRadioButtonChange,

            });
      });

      return (
            <form className={`j-radio-group ${className}`} name={name}>
                  {childrenWithProps}
            </form>
      );
};

export { RadioGroup, RadioButton };
