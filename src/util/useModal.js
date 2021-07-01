import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [isShowing, setIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  const toggle = () => {
    setIsOpen(!isShowing);
  };

  return { isShowing, toggle, modalContent ,setModalContent};
};