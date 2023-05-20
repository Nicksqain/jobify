import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Children } from "react";
import "./listGroup.scss";
const ListGroup = ({ children, horizontal, selectable }) => {
  // HOOKS
  const listRef = useRef(null);

  // STATE
  const defaultOption = "freelancer";
  const [choosen, setChoosen] = useState(defaultOption);

  const orientationCheck = horizontal ? "list-group-horizontal" : "";
  // FUNCTIONS
  useEffect(() => {
    let listGroupItems = [...listRef.current.childNodes];
    // console.log(listGroupItems);
    const checkHandle = (i) => {
      console.log("qq");
    };
    listGroupItems.map((el, i) => {
      // Функция чистки состояния

      if (i === 0) {
        // Установить активным первый элемент
        el.setAttribute("isselected", "true");
        el.classList.add("active");
      } else {
        el.setAttribute("isselected", "false");
        el.classList.remove("active");
      }
      el.onclick = (event) => {
        try {
          let currentOption = event.target.closest(".list-group-item");

          for (let i = 0; i < listGroupItems.length; i++) {
            listGroupItems[i].setAttribute("isselected", "false");
            listGroupItems[i].classList.remove("active");
          }
          currentOption.setAttribute("isselected", "active");
          currentOption.classList.add("active");

          setChoosen(event.target.getAttribute("selectValue"));
        } catch (error) {
          setChoosen(defaultOption);
        }

        return choosen;
      };
      return console.log(choosen);
    });
  }, []);
  const handleClick = (e) => {
    const allOption = e.target.closest(".list-group").childNodes;
    console.log(listRef.current.childNodes);
  };

  // Check selectable
  // try {
  //   if (selectable) {
  //     console.log(choosen);
  //   } else console.log("no select");
  // } catch (error) {
  //   console.log("no select");
  // }

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
