import { FC } from 'react'

interface AccountIconProps {

}

const AccountIcon: FC<AccountIconProps> = ({ }) => {
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
                  className="icon icon-tabler icon-tabler-user-circle"
                  viewBox="0 0 24 24"
            >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M6.168 18.849A4 4 0 0110 16h4a4 4 0 013.834 2.855"></path>
            </svg>
      );
}

export default AccountIcon;