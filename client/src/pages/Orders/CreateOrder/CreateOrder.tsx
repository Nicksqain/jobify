import { useContext, useState } from "react";
import "./createOrder.scss";
import Input from "../../../components/forms/Input";
import Select from "../../../components/ui/Select/Select";
import { RadioButton, RadioGroup } from "../../../components/ui/RadioGroup/RadioGroup";
import TextArea from "../../../components/ui/TextArea/TextArea";
import Range from "../../../components/ui/Range/Range";
import Button from "../../../components/forms/Button";

import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
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
  return (
    <div className="min-container">
      <div className="order-create-form">
        <div className="form">
          <h3>Create a order</h3>

          <div className="fill-info">
            <p className="legend text-center">Order info</p>
            <Input
              placeholder="Order name"
              type="text"
              setValue={setTitle}
            />

          </div>
          <div className="fill-info">
            <p className="legend text-center">Order category</p>
            <Select
              setValue={setCategory}
            >
              <option value="it">IT</option>
              <option data-setdefault value="art">ART</option>
              <option value="design">DESIGN</option>
            </Select>
            {/* <p>Selected value: {category}</p> */}
          </div>
          <div className="fill-info">
            <p className="legend text-center">Place of service</p>
            <RadioGroup name="check" className="form-check" setValue={setServicePlace}>
              <RadioButton value="myPlace">At my place</RadioButton>
              <RadioButton value="freelancerPlace">At the freelancer's place</RadioButton>
              <RadioButton value="dontMatter">Don't matter</RadioButton>
            </RadioGroup>
            {/* <p>Selected value: {servicePlace}</p> */}

          </div>
          <div className="fill-info">
            <p className="legend text-center">Refinement of details</p>
            <TextArea placeholder="Write description" maxLength={1000} rows={7} resizable={false} setValue={setDetailsDescription}></TextArea>
            {/* <p>Selected value: {detailsDescription}</p> */}
          </div>
          <div className="fill-info">
            <p className="legend text-center">Budget</p>
            <Range min={2000} max={250000} step={1000} setMinRangeValue={setMinBudget} setMaxRangeValue={setMaxBudget}></Range>
          </div>
          <Button
            handleSubmit={createOrderHandleSubmit}
            text="Create order"
          />
        </div>

      </div>
    </div>
  );
};

export default CreateOrder;
