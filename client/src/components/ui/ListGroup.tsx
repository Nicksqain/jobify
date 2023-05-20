import React, { FC, ReactElement, ReactNode, memo, useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Children } from "react";
import "./listGroup.scss";

interface ListGroupProps {
  children: ReactElement | ReactNode,
  setValue: (value: string) => void,
  horizontal: boolean,
  setDefault?: string,
  selectable?: boolean,
}

const ListGroup: FC<ListGroupProps> = ({ children, setValue, horizontal, selectable }) => {

  // HOOKS
  const listRef = useRef<HTMLDivElement | null>(null);

  // STATE
  const defaultOption: string | null = null;
  const [choosen, setChoosen] = useState<string | null>(defaultOption);

  const orientationCheck = horizontal ? "list-group-horizontal" : "";
  // FUNCTIONS
  useEffect(() => {
    if (choosen) {
      setValue(choosen);
    }
  }, [choosen, setValue]);
  useEffect(() => {
    let listGroupItems: HTMLElement[] = [];

    if (listRef.current !== null) {
      listGroupItems = Array.from(listRef.current.childNodes)
        .filter((node) => node instanceof HTMLElement) as HTMLElement[];
    }


    // console.log(listGroupItems);

    listGroupItems.forEach((el, i) => {
      // Функция чистки состояния

      if (selectable) {
        // if (setDefault) {
        //   if (i === setDefault) {
        //     // Установить активным первый элемент
        //     el.setAttribute("isselected", "true");
        //     el.classList.add("active");
        //   } else {
        //     el.setAttribute("isselected", "false");
        //     el.classList.remove("active");
        //   }
        // }

        el.onclick = (event: MouseEvent) => {
          // console.log(event.target);
          try {
            let currentOption: HTMLElement | null = null;

            if (event.target instanceof HTMLElement) {
              currentOption = event.target.closest(".list-group-item");
            }

            for (let i = 0; i < listGroupItems.length; i++) {
              listGroupItems[i].setAttribute("isselected", "false");
              listGroupItems[i].classList.remove("active");
            }
            currentOption?.setAttribute("isselected", "active");
            currentOption?.classList.add("active");
            console.log(currentOption)
            // setChoosen(currentOption?.childNodes[0].getAttribute("selectValue"));
            if (currentOption instanceof HTMLElement && currentOption.firstChild instanceof HTMLElement) {
              const selectValue = currentOption.firstChild.getAttribute("data-selectvalue");
              if (selectValue) {
                console.log(selectValue)
                setChoosen(selectValue);
              }
            }
          } catch (error) {
            setChoosen(defaultOption);
          }
        };
      }
    });
  }, []);

  //   Render
  return (
    <div ref={listRef} className={`list-group ${orientationCheck}`}>
      {Children.map(children, (child, i) => {
        return (
          <div className={`list-group-item text-center w-100`}>{child}</div>
        );
      })}
    </div>
  );
};

export default memo(ListGroup);
