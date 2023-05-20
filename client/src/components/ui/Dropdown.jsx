import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Children } from "react";
import "./dropDown.scss";

const Dropdown = ({ children, center, title, header }) => {
  // HOOKS
  const listRef = useRef(null);

  // STATE
  const defaultOption = null;
  const centerCheck = center ? "center" : "";
  const [show, setShow] = useState(false);

  // const orientationCheck = horizontal ? "list-group-horizontal" : "";
  // FUNCTIONS
  // useEffect(() => {
  //   setValue(choosen);
  // }, [choosen, setValue]);
  useEffect(() => {
    // Выключение дропдауна при клике вне области
    const onClick = (e) => listRef.current.contains(e.target) || setShow(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  useEffect(() => {
    const dropDownMenuItems = [...listRef.current.childNodes];
    // console.log(dropDownMenuItems);

    dropDownMenuItems.forEach((el) => {
      const CheckInnerAttr = function (attr) {
        return el.getAttribute(attr);
      };
      if (CheckInnerAttr("dropdown") === "true") {
        el.closest("button").onClick = (event) => {
          console.log(event.target);
        };
      }
      // console.log(el);
      el.onclick = (event) => {
        try {
          // Свитч состояния отображения выпадающего меню
          if (
            event.target
              .closest("button")
              ?.classList.contains("dropdown-button")
          ) {
            setShow((prev) => !prev);
          }
        } catch (error) {
          console.log(error);
        }
      };
    });
  }, []);

  //   Render
  return (
    <div ref={listRef} className={`dropdown ${show ? "show" : "hide"}`}>
      {title ? (
        <button className="dropdown-button" dropdown="true">
          {title}
        </button>
      ) : (
        void 0
      )}
      <div className={`dropdown-menu ${centerCheck}`}>
        <div className="header dropdown-item-text">{header}</div>
        {Children.map(children, (child, i) => {
          return <div className={`dropdown-item w-100`}>{child}</div>;
        })}
      </div>
    </div>
  );
};

export default memo(Dropdown);
