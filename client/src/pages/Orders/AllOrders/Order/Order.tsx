import { FC } from "react";

import "./order.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Tab from "../../../../components/ui/Tabs/Tab";
import Tabs from "../../../../components/ui/Tabs/Tabs";

interface OrderProps {
  title?: string,
  role?: string
}
const Order: FC<OrderProps> = ({ title, role }) => {
  if (role === "freelancer") {
    return (
      <div className="order">
        <div className="order-header">
          <div className="top">
            <div className="left">
              <div className="order-title">Лендинг на Tilda</div>
              <div className="views">
                <FontAwesomeIcon icon={faEye} /> <span>135</span>
              </div>
            </div>
            <div className="right">
              <div className="price-range">30 000 KZT</div>
            </div>
          </div>
          <div className="bottom">
            <div className="creation-date">Создано 03 октября 2022</div>
          </div>
        </div>
        <div className="order-details">
          <div className="top">
            <div className="left">
              <div className="order-service-place">
                <p className="title">Место оказания услуги</p>
                <span>Любое</span>
              </div>
            </div>
            <div className="right">
              <div className="orderer">
                <p className="title">Заказчик</p>
                <span className="person-name">Ренат Аримов</span>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="order-description">
              <p className="title">Описание услуги</p>
              <div className="description">
                Ищем Тильда-гения Человека, который умеет делать красивые сайты
                на тильде, есть около 4-6 сайтов-лендингов, которые нужно
                сделать, присылайте свои резюме в виде уже готовых
                сайтов/дизайнов, цены на лендинг со свой точки зрения тоже
                пишите сразу. Всем спасибо, ждём талант
              </div>
            </div>
            <button className="write-orderer">Написать заказчику</button>
          </div>
        </div>
      </div>
    );
  }
  if (role === "orderer") {
    return (
      <div className="order">
        <div className="order-header">
          <div className="top">
            <div className="left">
              <div className="order-title">Лендинг на Tilda</div>
              <div className="views">
                <FontAwesomeIcon icon={faEye} /> <span>135</span>
              </div>
            </div>
            <div className="right">
              <div className="price-range">30 000 KZT</div>
            </div>
          </div>
          <div className="bottom">
            <div className="creation-date">Создано 03 октября 2022</div>
          </div>
        </div>
        <div className="order-details">
          <Tabs>
            <Tab title="Order details">
              <div className="top">
                <div className="left">
                  <div className="order-service-place">
                    <p className="title">Место оказания услуги</p>
                    <span>Любое</span>
                  </div>
                </div>
                <div className="right">
                  <div className="orderer">
                    <p className="title">Заказчик</p>
                    <span className="person-name">Ренат Аримов</span>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="order-description">
                  <p className="title">Описание услуги</p>
                  <div className="description">
                    Ищем Тильда-гения Человека, который умеет делать красивые
                    сайты на тильде, есть около 4-6 сайтов-лендингов, которые
                    нужно сделать, присылайте свои резюме в виде уже готовых
                    сайтов/дизайнов, цены на лендинг со свой точки зрения тоже
                    пишите сразу. Всем спасибо, ждём талант
                  </div>
                </div>
                <button className="my-btn my-btn-danger">Cancel order</button>
              </div>
            </Tab>
            <Tab title="Responses">
              <div className="responses">
                <div className="response">
                  <div className="header">
                    <div className="person">
                      <div className="avatar">
                        <img src="images/users/avatars/avatar.jpg" alt="" />
                      </div>
                      <div className="data">
                        <div className="fullname">
                          <span>Александр Громов</span>
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
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
  return null
};

export default Order;
