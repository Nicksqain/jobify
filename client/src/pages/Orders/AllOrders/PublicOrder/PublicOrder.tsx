import { ChangeEvent, FC, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Tab from "../../../../components/ui/Tabs/Tab";
import Tabs from "../../../../components/ui/Tabs/Tabs";
import { isAdmin, isFreelancer, isModerator } from "../../../../helpers/role";
import { useUpdateOrderStatusMutation } from "../../../../mutations/orderMutations";
import toast from "react-hot-toast";
import { Text, Button, useDisclosure, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Heading, Textarea, Switch, Card, Box } from "@chakra-ui/react";
import { useAppSelector } from "../../../../hooks/redux";
import { parseBudget } from "../../../../helpers/tasks";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { createTaskResponse } from "../../../../api/orderApi";
import TaskDetails from "../Order/TaskDetails/TaskDetails";
import TaskResponses from "../Order/TaskResponses/TaskResponses";


interface PublicOrderProps {
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

const PublicOrder: FC<PublicOrderProps> = ({ id, title, role, budget, description, author, createdAt, servicePlace, isUserOrder = true }) => {

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)

      const { user } = useAppSelector(state => state.userSlice)
      //  Cancel order part
      return (
            <Card p={7} mb={5}>


                  <Box className="order-header" mb={0}>
                        <div className="top">
                              <div className="left">
                                    <div className="order-title">{title}</div>
                                    <div className="views">
                                          <FontAwesomeIcon icon={faEye} /> <span>135</span>
                                    </div>
                              </div>
                              <div className="right">

                              </div>
                        </div>
                        <Box>
                              <div className="creation-date">Создано {createdAt}</div>
                        </Box>
                        <Box mt={2}>
                              <Heading size="sx">Заказчик</Heading>
                              <Text>{author}</Text>
                        </Box>
                  </Box>

            </Card>
      );
};

export default PublicOrder;