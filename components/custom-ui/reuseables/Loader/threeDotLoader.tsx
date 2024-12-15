"use client"

import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoader = ({ color }: { color: string }) => {
  return (
    <ThreeDots
      visible={true}
      height="100"
      width="100"
      color={color}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default ThreeDotsLoader;
