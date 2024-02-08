import { ChangeEvent, FC, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Tab from "../../../../components/ui/Tabs/Tab";
import Tabs from "../../../../components/ui/Tabs/Tabs";
import { isAdmin, isFreelancer, isModerator } from "../../../../helpers/role";
import { useUpdateOrderStatusMutation } from "../../../../mutations/orderMutations";
import toast from "react-hot-toast";
import { Text, Button, useDisclosure, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Heading, Textarea, Switch, Card } from "@chakra-ui/react";
import { useAppSelector } from "../../../../hooks/redux";
import { parseBudget } from "../../../../helpers/tasks";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { createTaskResponse } from "../../../../api/orderApi";
import TaskDetails from "../Order/TaskDetails/TaskDetails";
import TaskResponses from "../Order/TaskResponses/TaskResponses";
import { useQueryClient } from "@tanstack/react-query";


interface PrivateOrderProps {
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

const PrivateOrder: FC<PrivateOrderProps> = ({ id, title, role, budget, description, author, createdAt, servicePlace, isUserOrder = true }) => {

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)

      const { user } = useAppSelector(state => state.userSlice)
      //  Cancel order part
      const { isOpen, onOpen, onClose } = useDisclosure()
      const cancelRef = useRef<HTMLButtonElement>(null);
      const initialFocusRef = useRef<HTMLInputElement>(null);

      const updateOrderStatusMutation = useUpdateOrderStatusMutation();
      const queryClient = useQueryClient()

      const [reason, setReason] = useState<string | null>(null);
      const [executionCost, setExecutionCost] = useState<string>(budget[0].toString());
      const [executionDate, setExecutionDate] = useState<Date>(new Date());
      const [responseMessage, setResponseMessage] = useState<string>("");
      const [isReasonValid, setIsReasonValid] = useState<boolean | undefined>(false);

      const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = event.target.value;
            setReason(inputValue);
            setIsReasonValid(inputValue !== '');
      };

      const handleResponseChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
            setResponseMessage(event.target.value);
      };

      const handleTaskRejectByModer = async () => {
            if (isReasonValid) {
                  try {
                        const orderId = id;
                        const status = 'rejected';
                        const commentType = "Moder";
                        const response = await updateOrderStatusMutation.mutateAsync({ orderId, status, reason, commentType, moderatorCheckedBy: user?.id });
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
                        console.debug("CHECK2")
                        queryClient.invalidateQueries({ queryKey: ['profileUserOrders'], exact: false })
                        // queryClient.invalidateQueries({
                        //       predicate: (query) =>
                        //             query.queryKey[0] === 'profileUserOrders',
                        // })
                        onClose();
                  }
            } catch (error) {
                  toast.error('Ошибка при обновлении статуса задачи')
            }
      };

      const handleTaskResponse = async () => {
            try {
                  const orderId = id;
                  const response = await createTaskResponse(orderId, { executionCost: Number(executionCost), executionDate, message: responseMessage });
                  if (response) {
                        toast.success("Отклик успешно размещен!")
                        setResponseMessage("")
                        onClose();
                  }
            } catch (error) {
                  toast.error('Ошибка при создании отклика!')
            }
      };

      return (
            <Card p={7} mb={5}>


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
                              <Tab title="Детали заказа">
                                    <TaskDetails servicePlace={servicePlace} author={author} description={description} />
                              </Tab>

                              {
                                    isUserOrder ?
                                          <Tab title="Отклики">
                                                <TaskResponses />
                                          </Tab>
                                          :
                                          <></>
                              }

                        </Tabs>
                        <div className="dflex justify-content-end">
                              <>
                                    {isUserOrder || isAdmin(user) || isModerator(user) ?
                                          <Button colorScheme='red' onClick={onOpen}>
                                                Отменить
                                          </Button>
                                          : isFreelancer(user) &&
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
                                                <ModalHeader>{isUserOrder || isAdmin(user) || isModerator(user) ? "Отмена задачи " : "Отклик на задачу"} </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody pb={3}>
                                                      {
                                                            // Отмена задачи Модератором / Администратором
                                                            (!isUserOrder && (isAdmin(user) || isModerator(user))) &&
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
                                                                  isFreelancer(user) && <>
                                                                        <Text fontSize="xl" mb={4}>{title}</Text>
                                                                        <FormControl mb={3}>
                                                                              <FormLabel>Стоимость {servicePlace}</FormLabel>
                                                                              <NumberInput step={1000} defaultValue={budget[0]} min={budget[0]} max={budget[1]} onChange={setExecutionCost}>
                                                                                    <NumberInputField />
                                                                                    <NumberInputStepper>
                                                                                          <NumberIncrementStepper />
                                                                                          <NumberDecrementStepper />
                                                                                    </NumberInputStepper>
                                                                              </NumberInput>
                                                                        </FormControl>

                                                                        <FormControl mb={3}>
                                                                              <FormLabel>Планируемая дата завершения</FormLabel>
                                                                              <SingleDatepicker
                                                                                    configs={
                                                                                          {
                                                                                                dateFormat: "dd.MM.yyyy", dayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], monthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
                                                                                          }
                                                                                    }
                                                                                    minDate={new Date(yesterday)}
                                                                                    name="date-input"
                                                                                    date={executionDate}
                                                                                    onDateChange={setExecutionDate}
                                                                              />
                                                                        </FormControl>

                                                                        <FormControl>
                                                                              <FormLabel>Сообщение заказчику</FormLabel>
                                                                              <Textarea
                                                                                    onChange={handleResponseChange}
                                                                                    placeholder='Расскажите немного о своем опыте и как вы планируете выполнить эту задачу.'
                                                                                    size='sm'
                                                                                    resize="none"
                                                                              />
                                                                        </FormControl>
                                                                  </>
                                                      }
                                                </ModalBody>

                                                <ModalFooter>
                                                      <Button onClick={onClose}>
                                                            Закрыть
                                                      </Button>
                                                      {isUserOrder || isAdmin(user) || isModerator(user) ?
                                                            <Button colorScheme='red' onClick={(isAdmin(user) && !isUserOrder) || (isModerator(user) && !isUserOrder) ? handleTaskRejectByModer : handleTaskRejectByUser} ml={3}>
                                                                  Отменить задачу
                                                            </Button> :
                                                            <Button colorScheme='green' onClick={isAdmin(user) || isModerator(user) ? handleTaskRejectByModer : handleTaskResponse} ml={3}>
                                                                  Откликнуться
                                                            </Button>
                                                      }
                                                </ModalFooter>
                                          </ModalContent>
                                    </Modal>
                              </>
                        </div>
                  </div>
            </Card>
      );
};

export default PrivateOrder;