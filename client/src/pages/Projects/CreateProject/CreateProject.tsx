import { Button, Card, CardBody, CardHeader, Checkbox, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useOrders from '../../../hooks/orders';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { createProject } from '../../../api/projectApi';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface CreateProjectProps {

}
interface CheckedItem {
      id: number;
      taskId: number;
      taskName: string;
      isChecked: boolean;
}
const CreateProject: FC<CreateProjectProps> = ({ }) => {
      const dispatch = useAppDispatch()
      const navigate = useNavigate()
      const queryClient = useQueryClient()

      const { user } = useAppSelector((state) => state.userSlice);
      const { allUserOrders } = useOrders(dispatch, user?.id);

      const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);

      useEffect(() => {
            if (allUserOrders.data && allUserOrders.data.length > 0 && checkedItems.length === 0) {
                  const ordersForProject = allUserOrders.data.filter((value) => value.status !== "rejected" && value.projectId === null);

                  if (ordersForProject.length > 0) {
                        const ordersForChecking: CheckedItem[] = ordersForProject.map((el, i) => ({
                              id: i + 1,
                              taskId: el.id,
                              taskName: el.orderName,
                              isChecked: false,
                        }));
                        setCheckedItems(ordersForChecking);
                  }
            }
      }, [allUserOrders, checkedItems]);


      // useEffect(() => {
      //       console.debug(checkedItems)
      // }, [checkedItems])
      const handleCheckboxChange = (id: number) => {
            setCheckedItems((prevCheckedItems) =>
                  prevCheckedItems.map((item) =>
                        item.id === id ? { ...item, isChecked: !item.isChecked } : item
                  )
            );
      };
      function validateName(value: string) {
            let error
            if (!value) {
                  error = 'Название проекта обязательно!'
            } else if (value.toLowerCase() !== 'naruto') {
                  // error = "Jeez! You're not a fan 😱"
            }
            return error
      }
      function validateShortDescriptione(value: string) {
            let error
            if (!value) {
                  error = 'Краткое описание обязательно!'
            } else if (value.toLowerCase() !== 'naruto') {
                  // error = "Jeez! You're not a fan 😱"
            }
            return error
      }
      const handleTaskCreateSubmit = async (values: any, actions: any) => {
            try {
                  const orderIds = checkedItems.filter(el => el.isChecked).map(el => el.taskId)
                  const response = await createProject({ name: values.name, shortDescription: values.shortDescription, orderIds })
                  if (response) {
                        toast.success("Проект успешно создан!")
                        navigate(`/user/${user?.id}#projects`)
                        queryClient.invalidateQueries({ queryKey: ['userOrders'], exact: false })
                  } else toast.error("Не удалось создать проект!")
            } catch (error: any) {
                  toast.error(error.response.data)
            }
      }
      return (
            <>
                  <Container maxW="container.md" mt={16}>

                        <Card p={5}>

                              <CardHeader textAlign="center">
                                    <Heading size="md">Создание проекта</Heading>
                              </CardHeader>
                              <CardBody>
                                    <Formik
                                          initialValues={{ name: '', shortDescription: '', place: 'dontMatter', budget: [2000, 250000] }}
                                          onSubmit={(values, actions) => handleTaskCreateSubmit(values, actions)}
                                    >
                                          {(props) => (
                                                <Form>
                                                      <Field name='name' validate={validateName}>
                                                            {({ field, form }: any) => (
                                                                  <FormControl mb={2} isInvalid={form.errors.name && form.touched.name}>
                                                                        <FormLabel>Название</FormLabel>
                                                                        <Input {...field} placeholder='Постройка дома ...' />
                                                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                                  </FormControl>
                                                            )}
                                                      </Field>
                                                      <Field name='shortDescription' validate={validateShortDescriptione}>
                                                            {({ field, form }: any) => (
                                                                  <FormControl mb={2} isInvalid={form.errors.shortDescription && form.touched.shortDescription}>
                                                                        <FormLabel>Краткое описание</FormLabel>
                                                                        <Input {...field} placeholder='Построить дом в городе ...' />
                                                                        <FormErrorMessage>{form.errors.shortDescription}</FormErrorMessage>
                                                                  </FormControl>
                                                            )}
                                                      </Field>
                                                      <FormControl mb={2}
                                                      // isInvalid={}
                                                      >
                                                            <FormLabel>Задачи проекта</FormLabel>
                                                            {checkedItems.length > 0 && (
                                                                  <>
                                                                        <Checkbox
                                                                              isChecked={checkedItems.every((item) => item.isChecked)}
                                                                              isIndeterminate={
                                                                                    checkedItems.some((item) => item.isChecked) &&
                                                                                    !checkedItems.every((item) => item.isChecked)
                                                                              }
                                                                              onChange={(e) => {
                                                                                    const newCheckedState = checkedItems.map((item) => ({
                                                                                          ...item,
                                                                                          isChecked: e.target.checked,
                                                                                    }));
                                                                                    setCheckedItems(newCheckedState);
                                                                              }}
                                                                        >
                                                                              Задачи
                                                                        </Checkbox>
                                                                        <Stack pl={6} mt={1} spacing={1}>
                                                                              {checkedItems.map((item) => (
                                                                                    <Checkbox
                                                                                          key={item.id}
                                                                                          isChecked={item.isChecked}
                                                                                          onChange={() => handleCheckboxChange(item.id)}
                                                                                    >
                                                                                          {item.taskName}
                                                                                    </Checkbox>
                                                                              ))}
                                                                        </Stack>
                                                                  </>
                                                            )}
                                                            <FormErrorMessage>Ошибка</FormErrorMessage>
                                                      </FormControl>
                                                      <Button
                                                            mt={4}
                                                            colorScheme='green'
                                                            isLoading={props.isSubmitting}
                                                            type='submit'
                                                      >
                                                            Создать проект
                                                      </Button>
                                                </Form>
                                          )}
                                    </Formik>

                              </CardBody>

                        </Card>


                  </Container>
            </>
      );
}

export default CreateProject;