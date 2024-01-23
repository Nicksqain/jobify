import React, { FC } from 'react'

interface TaskDetailsProps {

      servicePlace: string
      author: string
      description: string
}
const servicePlaces: Record<string, string> = {
      myPlace: "У меня",
      freelancerPlace: "У исполнителя",
      dontMatter: "Неважно"
}
const getServicePlaceString = (place: string) => {
      return servicePlaces[place]
}
const TaskDetails: FC<TaskDetailsProps> = (props) => {
      return (
            <>
                  <div className="top">
                        <div className="left">
                              <div className="order-service-place">
                                    <p className="title">Место оказания услуги</p>
                                    <span>{getServicePlaceString(props?.servicePlace)}</span>
                              </div>
                        </div>
                        <div className="right">
                              <div className="orderer">
                                    <p className="title">Заказчик</p>
                                    <span className="person-name">{props?.author}</span>
                              </div>
                        </div>
                  </div>
                  <div className="bottom">
                        <div className="order-description">
                              <p className="title">Описание услуги</p>
                              <div className="description">
                                    {props?.description}
                              </div>
                        </div>

                  </div>
            </>
      )
}

export default TaskDetails;