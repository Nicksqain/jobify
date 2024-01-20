import { FC, RefObject, useEffect, useRef, useState } from "react";

import "./order.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Tab from "../../../../components/ui/Tabs/Tab";
import Tabs from "../../../../components/ui/Tabs/Tabs";
import Confirm from "../../../../components/ui/Confirm/Confirm";
import Prompt from "../../../../components/ui/Prompt/Prompt";
import { isAdmin, isModerator } from "../../../../helpers/role";
import { useUpdateOrderStatusMutation } from "../../../../mutations/orderMutations";
import toast from "react-hot-toast";
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";


interface OrderProps {
  id: number;
  title: string
  role: string
  budget: number[]
  description: string
  status: string
  author: string
  authorId?: string
  createdAt: string
  servicePlace: string
  isUserOrder?: boolean

}

const Order: FC<OrderProps> = ({ id, title, role, budget, description, author, createdAt, servicePlace, isUserOrder = true }) => {

  //  Cancel order part
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  // ------
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);
  const [confirmValue, setConfirmValue] = useState('');

  const updateOrderStatusMutation = useUpdateOrderStatusMutation();

  const handleShowPrompt = () => {
    setIsPromptOpen(true);
  };

  const handleOrderCancelingPromptConfirm = async () => {

    try {
      // Предположим, что у вас есть orderId и другие данные для обновления
      const orderId = id;
      const status = 'rejected';
      const reason = confirmValue;

      // Вызовите мутацию
      await updateOrderStatusMutation.mutateAsync({ orderId, status, reason });

      // Закройте модальное окно или что у вас там
      setIsPromptOpen(false);
    } catch (error) {
      toast.error('Ошибка при обновлении статуса заказа')
      console.error('Ошибка при обновлении статуса заказа', error);
    }
    setIsPromptOpen(false);
  };

  const handlePromptCancel = () => {
    // Обработка отмены
    console.log('Prompt cancelled');
    setIsPromptOpen(false);
  };
  // 
  const handleShowConfirm = () => {
    console.log("check")
    setIsConfirmOpen(prevIsConfirmOpen => !prevIsConfirmOpen);
  };

  const handleConfirm = () => {
    // Обработка подтверждения
    setIsConfirmOpen(false);
  };

  const handleCancel = () => {
    // Обработка отмены
    setIsConfirmOpen(false);
  };

  const servicePlaces: Record<string, string> = {
    myPlace: "У меня",
    freelancerPlace: "У исполнителя",
    dontMatter: "Неважно"
  }
  const getServicePlaceString = (place: string) => {
    return servicePlaces[place]
  }
  const parseBudget = () => {
    const minBudget = budget[0]
    const maxBudget = budget[1]
    const formatNumber = (number: number) => {
      return number.toLocaleString('ru-RU'); // Используем 'en-US' для формата с разделителями на тысячи
    };

    if (minBudget == maxBudget) {
      return formatNumber(maxBudget)
    } else {
      return `${formatNumber(minBudget)} - ${formatNumber(maxBudget)}`
    }
  }

  if (role === "freelancer") {
    return (
      <div className="order">
        <div className="order-header">
          <div className="top">
            <div className="left">
              <div className="order-title">{title}</div>
              <div className="views">
                <FontAwesomeIcon icon={faEye} /> <span>135</span>
              </div>
            </div>
            <div className="right">
              <div className="price-range">{parseBudget()} KZT</div>
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
              <div className="order-title">{title}</div>
              <div className="views">
                <FontAwesomeIcon icon={faEye} /> <span>135</span>
              </div>
            </div>
            <div className="right">
              <div className="price-range">{parseBudget()} KZT</div>
            </div>
          </div>
          <div className="bottom">
            <div className="creation-date">Создано {createdAt}</div>
          </div>
        </div>
        <div className="order-details">
          <Tabs>
            <Tab title="Order details">
              <div className="top">
                <div className="left">
                  <div className="order-service-place">
                    <p className="title">Место оказания услуги</p>
                    <span>{getServicePlaceString(servicePlace)}</span>
                  </div>
                </div>
                <div className="right">
                  <div className="orderer">
                    <p className="title">Заказчик</p>
                    <span className="person-name">{author}</span>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="order-description">
                  <p className="title">Описание услуги</p>
                  <div className="description">
                    {description}
                  </div>
                </div>

              </div>
            </Tab>

            {
              isUserOrder ? (<Tab title="Responses">
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
              </Tab>) : (<></>)
            }

          </Tabs>
          <div className="dflex justify-content-end">
            {/* {isConfirmOpen ? <></> : (<button className="my-btn my-btn-danger" onClick={handleShowConfirm}>Cancel order</button>)}
            <Confirm isOpen={isConfirmOpen} message="Are you sure?" onConfirm={handleConfirm} onCancel={handleCancel} /> */}
            {
              (isUserOrder || isAdmin() || isModerator()) && <>
                <Button colorScheme='red' onClick={onOpen}>
                  Отменить
                </Button>
                <Modal
                  initialFocusRef={initialFocusRef}
                  finalFocusRef={initialFocusRef}
                  isOpen={isOpen}
                  onClose={onClose}
                  isCentered
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Отмена задачи</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Причина</FormLabel>
                        <Input ref={initialFocusRef} placeholder='Наличие сквернословия' />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={onClose}>
                        Закрыть
                      </Button>
                      <Button colorScheme='red' onClick={onClose} ml={3}>
                        Отменить задачу
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            }
          </div>
        </div>
      </div>
    );
  }
  return null
};

export default Order;
