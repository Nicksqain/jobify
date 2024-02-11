import React, { FC } from 'react'

interface ExternalLinkIconProps {

}

const ExternalLinkIcon: FC<ExternalLinkIconProps> = ({ }) => {
      return (
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
            >
                  <path
                        stroke="#b8bec5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4M20 9V4h-5M13 11l7-7"
                  ></path>
            </svg>
      )
}

export default ExternalLinkIcon;