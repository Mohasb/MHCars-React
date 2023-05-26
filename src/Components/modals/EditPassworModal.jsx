import React, { useState } from "react";
import { Modal } from "react-rainbow-components";

export default function EditPwd({ isOpenModalPwd, setIsOpenModalPwd }) {
  const handleOnClose = () => {
    setIsOpenModalPwd(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModalPwd}
        onRequestClose={handleOnClose}
        title="Modificar Contraseña"
      ></Modal>
    </div>
  );
}
