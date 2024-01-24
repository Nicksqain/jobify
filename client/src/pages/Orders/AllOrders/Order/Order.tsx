import { FC, useRef, useState } from "react";

import "./order.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Tab from "../../../../components/ui/Tabs/Tab";
import Tabs from "../../../../components/ui/Tabs/Tabs";
import { isAdmin, isModerator } from "../../../../helpers/role";
import { useUpdateOrderStatusMutation } from "../../../../mutations/orderMutations";
import toast from "react-hot-toast";
import { Text, Button, useDisclosure, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage } from "@chakra-ui/react";
import { useAppSelector } from "../../../../hooks/redux";
import TaskResponses from "./TaskResponses/TaskResponses";
import TaskDetails from "./TaskDetails/TaskDetails";
import { parseBudget } from "../../../../helpers/tasks";


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

  const updateOrderStatusMutation = useUpdateOrderStatusMutation();

  const [reason, setReason] = useState<string | null>(null);
  const [isReasonValid, setIsReasonValid] = useState<boolean | undefined>(false);

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setReason(inputValue);
    setIsReasonValid(inputValue !== '');
  };

  const handleTaskRejectByModer = async () => {
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

  const handleTaskRejectByUser = async () => {
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
            <div className="price-range">{parseBudget(budget[0], budget[1])} KZT</div>
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
            isUserOrder ?
              <Tab title="Responses">
                <TaskResponses />
              </Tab>
              :
              <></>
          }

        </Tabs>
        <div className="dflex justify-content-end">
          <>
            {isUserOrder ? <Button colorScheme='red' onClick={onOpen}>
              Отменить
            </Button> :
              <Button colorScheme='green' onClick={onOpen}>
                Взять в работу
              </Button>
            }


            <Modal
              initialFocusRef={initialFocusRef}
              finalFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={onClose}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{isUserOrder ? <>Отмена задачи</> : "Отклик на задачу"} </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  {
                    // Отмена задачи Модератором / Администратором
                    isAdmin(user) || isModerator(user) &&
                    <FormControl isRequired isInvalid={!isReasonValid}>
                      <FormLabel>Причина</FormLabel>
                      <Input ref={initialFocusRef} placeholder='Наличие сквернословия' onChange={handleReasonChange} />
                      {
                        !isReasonValid && <FormErrorMessage>Обязательно введите причину.</FormErrorMessage>
                      }

                    </FormControl>
                  }
                  {
                    // Отмена задачи юзером
                    isUserOrder ? <Text>Вы уверены, что хотите отклонить свою задачу?</Text> :
                      // Отклик на задачу
                      <>
                        <FormControl isRequired isInvalid={!isReasonValid}>
                          <FormLabel>Причина</FormLabel>
                          <Input ref={initialFocusRef} placeholder='Наличие сквернословия' onChange={handleReasonChange} />
                          {
                            !isReasonValid && <FormErrorMessage>Обязательно введите причину.</FormErrorMessage>
                          }

                        </FormControl>
                      </>
                  }
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose}>
                    Закрыть
                  </Button>
                  {isUserOrder || isAdmin(user) || isModerator(user) ?
                    <Button colorScheme='red' onClick={isAdmin(user) || isModerator(user) ? handleTaskRejectByModer : handleTaskRejectByUser} ml={3}>
                      Отменить задачу
                    </Button> :
                    <Button colorScheme='green' onClick={isAdmin(user) || isModerator(user) ? handleTaskRejectByModer : handleTaskRejectByUser} ml={3}>
                      Откликнуться
                    </Button>
                  }
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default Order;