import React from "react";
import "./createOrder.scss";
const CreateOrder = () => {
  return (
    <div className="min-container">
      <div className="order-create-form">
        <div className="form">
          <h3>Create a order</h3>
          <div className="fill-info">
            <p className="text-center">Order info</p>
            <input
              className="form-control"
              placeholder="Order name"
              type="text"
            />
            <input
              className="form-control"
              placeholder="Order category"
              type="text"
            />
            <select
              className="form-select"
              placeholder="Order category"
              type="text"
            >
              <option value="IT">1</option>
              <option value="IT">2</option>
            </select>
          </div>
          <div className="fill-info">
            <p className="text-center">Place of service</p>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                From the me
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                From the freelancer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
              />
              <label class="form-check-label" for="flexRadioDefault3">
                No matter
              </label>
            </div>
          </div>
          <div className="fill-info">
            <p className="text-center">Refinement of details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
