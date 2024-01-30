import React, { FC } from 'react'

interface DashBoardIconProps {

}

const DashBoardIcon: FC<DashBoardIconProps> = ({ }) => {
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
                  className="icon icon-tabler icon-tabler-dashboard"
                  viewBox="0 0 24 24"
            >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <circle cx="12" cy="13" r="2"></circle>
                  <path d="M13.45 11.55L15.5 9.5"></path>
                  <path d="M6.4 20a9 9 0 1111.2 0z"></path>
            </svg>
      );
}

export default DashBoardIcon;