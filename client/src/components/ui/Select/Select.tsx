import { FC, ReactNode, useState, useRef, Children, isValidElement, useEffect } from 'react';
import './select.scss';
interface CustomSelectProps {
  children: ReactNode;
  setValue?: (value: string) => void;
  setDefault?: boolean;
  title?: string;
  conctitle?: boolean;
  isCustom?: boolean
}
{/* 
ПРИМЕР ИСПОЛЬЗОВАНИЯ:
 <Select
  setValue={setCategory}
>
  <option value="it">IT</option>
  <option data-setdefault value="art">ART</option>
  <option value="design">DESIGN</option>
</Select> */}
const CustomSelect: FC<CustomSelectProps> = ({ children, setValue, conctitle, title, isCustom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBody, setSelectedBody] = useState<string | null>("");
  const selectRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value: string, selectedBody: string) => {
    setSelectedBody(selectedBody);
    if (setValue !== undefined) {
      setValue(value);
    }


    setIsOpen(false);
  };
  useEffect(() => {
    if (selectedBody) {

    }

  }, [selectedBody]);



  // Обработчик клика на глобальном уровне для закрытия выпадающего списка при клике вне его
  const handleGlobalClick = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Добавляем слушатель события click на глобальном уровне
    window.addEventListener('click', handleGlobalClick);

    // Убираем слушатель события click при размонтировании компонента
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);
  return (
    <div className={`j-select ${isOpen ? 'open' : ''}`} ref={selectRef}>
      <div className="selected-value" onClick={toggleDropdown}>
        <span className='title'>{(title && (conctitle ? title + " " + selectedBody : selectedBody)) || (title ? title : 'Select an option')}</span>
      </div>
      <img className='chevron' src="/Chevron_Down.svg" alt="" onClick={toggleDropdown} />
      {isOpen && (
        <div className="options">
          {Children.map(children, (child, i) => {
            if (isValidElement(child)) {
              const { value } = child.props;

              let selectedOptionText = child.props.children;
              if (selectedOptionText?.props?.children) {
                selectedOptionText = selectedOptionText.props.children
              }
              return (
                <div
                  key={value}
                  className={`option ${selectedBody === value ? 'selected' : ''}`}
                  onClick={() => handleItemClick(value, selectedOptionText)}
                >

                  {child.props.children}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;