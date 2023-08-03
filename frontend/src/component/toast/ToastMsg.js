export const SUCCESS_TOAST = (desc) => {
  return {
    title: desc,
    position: "top",
    status: "success",
    duration: 4000,
    isClosable: true,
  };
};

export const ERROR_TOAST = (desc) => {
  return {
    title: desc,
    position: "top",
    status: "error",
    duration: 6000,
    isClosable: true,
  };
};
