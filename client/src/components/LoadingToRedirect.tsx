import { Stack, Skeleton, Button, Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React, { FC } from "react";
// Components
import { ThreeDots } from "react-loader-spinner";
// Hooks

const LoadingToRedirect: FC = () => {
  // Context

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* <ThreeDots color="#73f190" wrapperStyle={{ marginTop: "0px" }} /> */}
      <Stack spacing={1} mt={50} >
        <Skeleton height='75px' mb={50} isLoaded={false}>
        </Skeleton>
        <SkeletonCircle size='20' mb={30} />

        <SkeletonText noOfLines={4} mb={10} spacing='4' skeletonHeight='6' />
        <SkeletonText noOfLines={4} spacing='4' skeletonHeight='6' />
      </Stack>
      {/* <ThreeDots color="#5f5cee" wrapperStyle={{ marginTop: "0px" }} /> */}
    </div>
  );
};

export default LoadingToRedirect;
