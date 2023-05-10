import React, { FC } from "react";
// Components
import { ThreeDots } from "react-loader-spinner";
// Hooks

const LoadingToRedirect: FC = () => {
  // Context

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ThreeDots color="#5f5cee" wrapperStyle={{ marginTop: "0px" }} />
    </div>
  );
};

export default LoadingToRedirect;
