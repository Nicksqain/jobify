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
import { Button, useDisclosure, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage } from "@chakra-ui/react";
import { useAppSelector } from "../../../../hooks/redux";
import TaskResponses from "./TaskResponses/TaskResponses";
import TaskDetails from "./TaskDetails/TaskDetails";


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

  const { user } = useAppSelector(state => state.userSlice)
  //  Cancel order part
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  // ------
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);
  const [confirmValue, setConfirmValue] = useState('');

  const updateOrderStatusMutation = useUpdateOrderStatusMutation();


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

  const [reason, setReason] = useState<string | null>(null);
  const [isReasonValid, setIsReasonValid] = useState<boolean | undefined>(false);

  const handleReasonChange = (event) => {
    const inputValue = event.target.value;
    setReason(inputValue);

    setIsReasonValid(inputValue !== '');
  };

  const handleCloseByModer = async () => {
    if (isReasonValid) {
      try {
        const orderId = id;
        const status = 'rejected';
        const commentType = "Moder";
        const response = await updateOrderStatusMutation.mutateAsync({ orderId, status, reason, commentType });
        if (response) {
          onClose();
          setReason('')
          setIsReasonValid(false)
        }
      } catch (error) {
        toast.error('Ошибка при обновлении статуса задачи')
      }

    }
  };

  const handleCloseByUser = async () => {
    try {
      const orderId = id;
      const status = 'rejected';
      const response = await updateOrderStatusMutation.mutateAsync({ orderId, status });
      if (response) {
        onClose();
      }
    } catch (error) {
      toast.error('Ошибка при обновлении статуса задачи')
    }
  };

  // if (role === "freelancer") {
  //   return (
  //     <div className="order">
  //       <div className="order-header">
  //         <div className="top">
  //           <div className="left">
  //             <div className="order-title">{title}</div>
  //             <div className="views">
  //               <FontAwesomeIcon icon={faEye} /> <span>135</span>
  //             </div>
  //           </div>
  //           <div className="right">
  //             <div className="price-range">{parseBudget()} KZT</div>
  //           </div>
  //         </div>
  //         <div className="bottom">
  //           <div className="creation-date">Создано 03 октября 2022</div>
  //         </div>
  //       </div>
  //       <div className="order-details">
  //         <Tabs>
  //           <Tab title="Order details">
  //             <div className="top">
  //               <div className="left">
  //                 <div className="order-service-place">
  //                   <p className="title">Место оказания услуги</p>
  //                   <span>{getServicePlaceString(servicePlace)}</span>
  //                 </div>
  //               </div>
  //               <div className="right">
  //                 <div className="orderer">
  //                   <p className="title">Заказчик</p>
  //                   <span className="person-name">{author}</span>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="bottom">
  //               <div className="order-description">
  //                 <p className="title">Описание услуги</p>
  //                 <div className="description">
  //                   {description}
  //                 </div>
  //               </div>

  //             </div>
  //           </Tab>

  //           {
  //             isUserOrder ? (<Tab title="Responses">
  //               <div className="responses">
  //                 <div className="response">
  //                   <div className="header">
  //                     <div className="person">
  //                       <div className="avatar">
  //                         <img src="images/users/avatars/avatar.jpg" alt="" />
  //                       </div>
  //                       <div className="data">
  //                         <div className="fullname">
  //                           <span>Алексей Кариков</span>
  //                           <FontAwesomeIcon icon={faCircleCheck} />
  //                         </div>
  //                         <div className="date">17.12.2022</div>
  //                       </div>
  //                     </div>
  //                     <button className="my-btn discuss-btn">
  //                       Обсудить условия
  //                     </button>
  //                   </div>
  //                   <div className="footer">
  //                     <div className="price">Стоимость: 35 000 KZT</div>
  //                     <div className="description-text">
  //                       Добрый день, заинтересовало ваше предложение. Готова
  //                       сделать для вас крутой лендинг. Имею большой опыт в
  //                       разработке сайтов. Мои работы вы можете посмотреть по
  //                       ссылке (портфолио): https://youdo.com/u3849629
  //                     </div>
  //                   </div>
  //                 </div>
  //                 {/* <div className="response">2</div> */}
  //               </div>
  //             </Tab>) : (<></>)
  //           }

  //         </Tabs>
  //         <div className="dflex justify-content-end">
  //           {/* {isConfirmOpen ? <></> : (<button className="my-btn my-btn-danger" onClick={handleShowConfirm}>Cancel order</button>)}
  //           <Confirm isOpen={isConfirmOpen} message="Are you sure?" onConfirm={handleConfirm} onCancel={handleCancel} /> */}
  //           {
  //             (!isUserOrder) && <>
  //               <Button colorScheme='green' onClick={onOpen}>
  //                 Взять в работу
  //               </Button>
  //               <Modal
  //                 initialFocusRef={initialFocusRef}
  //                 finalFocusRef={initialFocusRef}
  //                 isOpen={isOpen}
  //                 onClose={onClose}
  //                 isCentered
  //               >
  //                 <ModalOverlay />
  //                 <ModalContent>
  //                   <ModalHeader>Отмена задачи</ModalHeader>
  //                   <ModalCloseButton />
  //                   <ModalBody pb={6}>
  //                     {
  //                       isAdmin(user) || isModerator(user) ?
  //                         <FormControl isRequired isInvalid={setIsReasonValid}>
  //                           <FormLabel>Причина</FormLabel>
  //                           <Input ref={initialFocusRef} placeholder='Наличие сквернословия' onChange={handleReasonChange} />
  //                           {
  //                             !isReasonValid && <FormErrorMessage>Обязательно введите причину.</FormErrorMessage>
  //                           }

  //                         </FormControl>
  //                         :
  //                         <>Вы уверены, что хотите отклонить свою задачу?</>
  //                     }
  //                   </ModalBody>

  //                   <ModalFooter>
  //                     <Button onClick={onClose}>
  //                       Закрыть
  //                     </Button>
  //                     <Button colorScheme='red' onClick={isAdmin(user) || isModerator(user) ? handleCloseByModer : handleCloseByUser} ml={3}>
  //                       Отменить задачу
  //                     </Button>
  //                   </ModalFooter>
  //                 </ModalContent>
  //               </Modal>
  //             </>
  //           }
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
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
              <TaskDetails servicePlace={servicePlace} author={author} description={description} />
            </Tab>

            {
              isUserOrder ? (<Tab title="Responses">
                <TaskResponses />
              </Tab>) : (<></>)
            }

          </Tabs>
          <div className="dflex justify-content-end">
            {/* {isConfirmOpen ? <></> : (<button className="my-btn my-btn-danger" onClick={handleShowConfirm}>Cancel order</button>)}
            <Confirm isOpen={isConfirmOpen} message="Are you sure?" onConfirm={handleConfirm} onCancel={handleCancel} /> */}
            {
              (isUserOrder || isAdmin(user) || isModerator(user)) && <>
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
                      {
                        isAdmin(user) || isModerator(user) ?
                          <FormControl isRequired isInvalid={setIsReasonValid}>
                            <FormLabel>Причина</FormLabel>
                            <Input ref={initialFocusRef} placeholder='Наличие сквернословия' onChange={handleReasonChange} />
                            {
                              !isReasonValid && <FormErrorMessage>Обязательно введите причину.</FormErrorMessage>
                            }

                          </FormControl>
                          :
                          <>Вы уверены, что хотите отклонить свою задачу?</>
                      }
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={onClose}>
                        Закрыть
                      </Button>
                      <Button colorScheme='red' onClick={isAdmin(user) || isModerator(user) ? handleCloseByModer : handleCloseByUser} ml={3}>
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
