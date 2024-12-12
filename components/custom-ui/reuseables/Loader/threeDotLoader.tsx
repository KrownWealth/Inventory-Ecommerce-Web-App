"use client"

import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoader = () => {
  return (
    <ThreeDots
      visible={true}
      height="100"
      width="100"
      color="#000000"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default ThreeDotsLoader;
