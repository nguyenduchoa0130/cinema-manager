import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle, modalContent ,setModalContent};
};