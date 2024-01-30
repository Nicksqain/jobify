import React, { FC } from 'react'

interface LogoutIconProps {

}

const LogoutIcon: FC<LogoutIconProps> = ({ }) => {
      return (
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="icon icon-tabler icon-tabler-logout"
                  viewBox="0 0 24 24"
            >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"></path>
                  <path d="M7 12h14l-3-3m0 6l3-3"></path>
            </svg>
      );
}

export default LogoutIcon;