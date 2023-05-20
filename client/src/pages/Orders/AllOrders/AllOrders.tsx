import React, { useContext, useState, useEffect } from "react";


import Order from "./Order/Order";
import { AuthContext } from "../../../context/authContext";

const AllOrders = () => {
  // CONTEXT
  const authContext = useContext(AuthContext);
  const auth = authContext?.auth;

  return (
    <div className="all-orders">
      <Order role={auth?.user?.status} />
      <Order role={auth?.user?.status} />
    </div>
  );
};

export default AllOrders;
