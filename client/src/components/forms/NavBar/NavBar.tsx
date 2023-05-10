import React, { FC, useContext, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { romoveFromLocalStorage } from '../../../helpers/auth';
import './navbar.scss'
interface MenuProps {
      children?: JSX.Element | string;
}
interface CollapseProps {
      children?: React.ReactNode | JSX.Element | string;
      end?: boolean;
}
interface BrandProps {
      children?: JSX.Element | string;
      href?: string;
}
interface ItemProps {
      children?: JSX.Element | string;
}
interface LinkProps {
      children?: JSX.Element | string;
      to?: string;
      onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
interface ContainerProps {
      children?: JSX.Element | React.ReactNode;
}

const MyNavBar = {
      // 
      Container: function Container(props: ContainerProps) {
            return <div className='navbar-container'>{props.children}</div>;
      },
      //
      Menu: function Menu(props: MenuProps) {
            return <div >{props.children}</div>;
      },
      //
      Collapse: function Collapse(props: CollapseProps) {
            return <div className={`collapse ${props.end ? "end" : ""}`}>{props.children}</div>;
      },
      //
      Brand: function Brand(props: BrandProps) {
            const navigate = useNavigate()
            const location = useLocation()
            const brandRef = useRef<HTMLDivElement>(null);

            // Функция проверки одинакового роута в пропсах и текущего локейшна
            function isContainGlobalSameRoute(): boolean {
                  const path = location.pathname;
                  if (path === props.href) {
                        return true
                  } return false
            }

            useEffect(() => {
                  if (null !== brandRef.current) {
                        brandRef.current.onclick = () => {
                              if (!isContainGlobalSameRoute()) {
                                    props.href === undefined ? navigate("/") : navigate(props.href)
                              }
                        }
                  }
            }, [props.href])

            return <div className='navbar-brand' ref={brandRef}>
                  <h4>{props.children}</h4>
            </div>;
      },
      //
      Item: function Item(props: ItemProps) {
            return <div></div>;
      },
      Link: function Link(props: LinkProps) {
            return <NavLink className="nav-link" to={`${props.to ?? "/"}`} onClick={props.onClick}>{props.children}</NavLink>;
      },


}

export default MyNavBar;