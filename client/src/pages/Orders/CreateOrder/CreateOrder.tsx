import { useContext, useState } from "react";
// import "./createOrder.scss";
// import Input from "../../../components/forms/Input";
// import Select from "../../../components/ui/Select/Select";
// import { RadioButton, RadioGroup } from "../../../components/ui/RadioGroup/RadioGroup";
// import TextArea from "../../../components/ui/TextArea/TextArea";
// import Range from "../../../components/ui/Range/Range";

import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import { Button, Card, CardBody, CardHeader, Center, Container, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Stack, Textarea } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
const CreateOrder = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [servicePlace, setServicePlace] = useState<string | null>(null);
  const [detailsDescription, setDetailsDescription] = useState<string | null>(null);
  const [minBudget, setMinBudget] = useState<number>(2000);
  const [maxBudget, setMaxBudget] = useState<number>(250000);

  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const auth = authContext?.auth;
  const createOrderHandleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (title === null || title === undefined || title === '') {
        toast.error("Order name is required!", { duration: 2000 })
        setLoading(false);
        return;
      }
      if (category === null || category === undefined || category === '') {
        toast.error("Category is required!", { duration: 2000 })
        setLoading(false);
        return;
      }
      console.log({
        title: title,
        category: category,
        servicePlace: servicePlace,
        detailsDescription: detailsDescription,
        minBudget: minBudget,
        maxBudget: maxBudget,
        userId: auth?.user.id,
      })
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/orders`, {
          orderName: title,
          category: category,
          placeOfService: servicePlace,
          description: detailsDescription,
          budgetMin: minBudget,
          budgetMax: maxBudget,
        });
        if (data) {
          toast.success("Ваш заказ успешно создан!")
        }
      } catch (error: any) {
        toast.error(error.response.data)
      }
    } catch (error) {

      console.log(error);
    }
  };
  const [sliderValues, setSliderValues] = useState([2000, 250000]);

  const handleSliderChange = (form: any, values: number[]) => {


    setSliderValues(values);
    form.setFieldValue('budget', values);
  };

  const handleInputChange = (index: number, value: number, form: any) => {
    const newValues = [...sliderValues];
    newValues[index] = value;
    setSliderValues(newValues);
    form.setFieldValue('budget', newValues);
  };

  function validateTitle(value: string) {
    let error
    if (!value) {
      error = 'Название задачи обязательно!'
    } else if (value.toLowerCase() !== 'naruto') {
    }
    return error
  }
  function validateCategory(value: string) {
    let error
    if (!value) {
      error = 'Выберите категорию!'
    }
    // else if (value.toLowerCase() !== 'naruto') {

    // }
    return error
  }
  function validatePlace(value: string) {
    let error
    if (!value) {
      error = 'Выберите место оказания услуги!'
    }
    // else if (value.toLowerCase() !== 'naruto') {

    // }
    return error
  }

  const handleTaskCreateSubmit = async (values: any, actions: any) => {
    try {
      console.log(values)
      const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/orders`, {
        orderName: values.title,
        category: values.category,
        placeOfService: values.place,
        description: values.description,
        budgetMin: values.budget[0],
        budgetMax: values.budget[1],
      });
      if (data) {
        actions.setSubmitting(false)
        toast.success("Ваш заказ успешно создан!")
      }
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }
  return (
    <Container maxW="container.sm" mt={16}>

      <Card p={5}>

        <CardHeader textAlign="center">
          <Heading size="md">Создание заказа</Heading>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{ title: '', category: '', place: 'dontMatter', budget: [2000, 250000] }}
            onSubmit={(values, actions) => handleTaskCreateSubmit(values, actions)}
          >
            {(props) => (
              <Form>
                <Field name='title' validate={validateTitle}>
                  {({ field, form }: any) => (
                    <FormControl mb={2} isInvalid={form.errors.title && form.touched.title}>
                      <FormLabel>Название</FormLabel>
                      <Input {...field} placeholder='Создание сайта ...' />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='category' validate={validateCategory}>
                  {({ field, form }: any) => (
                    <FormControl mb={2} isInvalid={form.errors.category && form.touched.category}>
                      <FormLabel>Категория</FormLabel>
                      <Select variant='filled' {...field} placeholder='Выберите категорию'>
                        <option value="it">IT</option>
                        <option data-setdefault value="art">ART</option>
                        <option value="design">DESIGN</option>
                      </Select>
                      <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='place' validate={validatePlace}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.place && form.touched.place}>
                      <FormLabel>Место указания услуги</FormLabel>
                      <RadioGroup value={field.value} onChange={value => form.setFieldValue('place', value)} name="placeOfService">
                        <Stack spacing={4} direction='row' wrap="wrap">
                          <Radio value='myPlace'>
                            У меня
                          </Radio>
                          <Radio value='freelancerPlace'>У заказчика</Radio>
                          <Radio value='dontMatter'>Неважно</Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.place}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='description'>
                  {({ field, form }: any) => (
                    <FormControl mb={2} isInvalid={form.errors.description && form.touched.description}>
                      <FormLabel>Уточнение деталей заказа</FormLabel>
                      <Textarea placeholder='Нужно выполнить вёрстку по макету ...' />
                      <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='budget'>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.budget && form.touched.budget}>
                      <FormLabel>Укажите бюджет на исполнение</FormLabel>

                      <RangeSlider
                        aria-label={['min', 'max']}
                        min={2000}
                        max={250000}

                        value={field.value}
                        onChange={(val) => form.setFieldValue('budget', val)}
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                      </RangeSlider>
                      <HStack justifyContent="space-between">
                        <NumberInput
                          size="md"
                          value={field.value ? field.value[0] : 2000}
                          min={2000}
                          max={field.value ? field.value[1] : 250000}
                          onChange={(val) => form.setFieldValue('budget', [val, field.value ? field.value[1] : 250000])}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <NumberInput
                          size="md"
                          value={field.value ? field.value[1] : 250000}
                          min={field.value ? field.value[0] : 2000}
                          max={250000}
                          onChange={(val) => form.setFieldValue('budget', [field.value ? field.value[0] : 2000, val])}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                      <FormErrorMessage>{form.errors.budget}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  colorScheme='green'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Создать заказ
                </Button>
              </Form>
            )}
          </Formik>

        </CardBody>

      </Card>


    </Container>
    // <div className="min-container">
    //   <div className="order-create-form">
    //     <div className="form">
    //       <h3>Create a order</h3>

    //       <div className="fill-info">
    //         <p className="legend text-center">Order info</p>
    //         <Input
    //           placeholder="Order name"
    //           type="text"
    //           setValue={setTitle}
    //         />

    //       </div>
    //       <div className="fill-info">
    //         <p className="legend text-center">Order category</p>
    //         <Select
    //           setValue={setCategory}
    //         >
    //           <option value="it">IT</option>
    //           <option data-setdefault value="art">ART</option>
    //           <option value="design">DESIGN</option>
    //         </Select>
    //         {/* <p>Selected value: {category}</p> */}
    //       </div>
    //       <div className="fill-info">
    //         <p className="legend text-center">Place of service</p>
    //         <RadioGroup name="check" className="form-check" setValue={setServicePlace}>
    //           <RadioButton value="myPlace">At my place</RadioButton>
    //           <RadioButton value="freelancerPlace">At the freelancer's place</RadioButton>
    //           <RadioButton value="dontMatter">Don't matter</RadioButton>
    //         </RadioGroup>
    //         {/* <p>Selected value: {servicePlace}</p> */}

    //       </div>
    //       <div className="fill-info">
    //         <p className="legend text-center">Refinement of details</p>
    //         <TextArea placeholder="Write description" maxLength={1000} rows={7} resizable={false} setValue={setDetailsDescription}></TextArea>
    //         {/* <p>Selected value: {detailsDescription}</p> */}
    //       </div>
    //       <div className="fill-info">
    //         <p className="legend text-center">Budget</p>
    //         <Range min={2000} max={250000} step={1000} setMinRangeValue={setMinBudget} setMaxRangeValue={setMaxBudget}></Range>
    //       </div>
    //       <Button
    //         handleSubmit={createOrderHandleSubmit}
    //         text="Create order"
    //       />
    //     </div>

    //   </div>
    // </div>
  );
};

export default CreateOrder;
