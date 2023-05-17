import React, { useState } from "react";
import { Modal, Button } from "react-rainbow-components";
import { useNavigate } from "react-router-dom";

const textStyles = {
  textAlign: "center",
  fontSize: 15,
  padding: "0 16px",
};

export default function ConfirmationModal(props) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(props.openModal);

  const handleOnClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
        <Modal
          isOpen={isOpen}
          onRequestClose={handleOnClose}
          title="Confirmación reserva"
          footer={
            <div className="rainbow-flex rainbow-justify_center">
              <Button label="OK" variant="brand" onClick={handleOnClose} />
            </div>
          }
        >
          <h1 style={textStyles}>{props.text}</h1>
        </Modal>
    </div>
  );
}
