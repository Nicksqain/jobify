import React, { FC } from 'react'

interface TaskListProps {

}

const TaskList: FC<TaskListProps> = ({ }) => {
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
                  className="icon icon-tabler icon-tabler-list"
                  viewBox="0 0 24 24"
            >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M9 6L20 6"></path>
                  <path d="M9 12L20 12"></path>
                  <path d="M9 18L20 18"></path>
                  <path d="M5 6L5 6.01"></path>
                  <path d="M5 12L5 12.01"></path>
                  <path d="M5 18L5 18.01"></path>
            </svg>
      );
}

export default TaskList;