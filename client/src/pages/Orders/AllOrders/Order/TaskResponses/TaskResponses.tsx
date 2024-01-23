import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react'

interface TaskResponsesProps {

}

const TaskResponses: FC<TaskResponsesProps> = ({ }) => {
      return (
            <div className="responses">
                  <div className="response">
                        <div className="header">
                              <div className="person">
                                    <div className="avatar">
                                          <img src="images/users/avatars/avatar.jpg" alt="" />
                                    </div>
                                    <div className="data">
                                          <div className="fullname">
                                                <span>Алексей Кариков</span>
                                                <FontAwesomeIcon icon={faCircleCheck} />
                                          </div>
                                          <div className="date">17.12.2022</div>
                                    </div>
                              </div>
                              <button className="my-btn discuss-btn">
                                    Обсудить условия
                              </button>
                        </div>
                        <div className="footer">
                              <div className="price">Стоимость: 35 000 KZT</div>
                              <div className="description-text">
                                    Добрый день, заинтересовало ваше предложение. Готова
                                    сделать для вас крутой лендинг. Имею большой опыт в
                                    разработке сайтов. Мои работы вы можете посмотреть по
                                    ссылке (портфолио): https://youdo.com/u3849629
                              </div>
                        </div>
                  </div>
                  {/* <div className="response">2</div> */}
            </div>
      )
}

export default TaskResponses;