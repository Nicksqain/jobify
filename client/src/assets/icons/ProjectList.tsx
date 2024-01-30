import React, { FC } from 'react'

interface ProjectListProps {

}

const ProjectList: FC<ProjectListProps> = ({ }) => {
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
                  className="icon icon-tabler icon-tabler-list-details"
                  viewBox="0 0 24 24"
            >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M13 5h8M13 9h5M13 15h8M13 19h5"></path>
                  <rect width="6" height="6" x="3" y="4" rx="1"></rect>
                  <rect width="6" height="6" x="3" y="14" rx="1"></rect>
            </svg>
      );
}

export default ProjectList;