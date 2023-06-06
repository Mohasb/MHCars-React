import { Modal, Button } from "react-rainbow-components";
import { DeleteReservation } from "../../services/apiRequest/DeleteReservation";

export default function DeleteModal({
  isOpenModal,
  setIsOpenModal,
  element,
  text,
  idToEliminate,
  handleResponseModal,
}) {
  const handleOnClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={handleOnClose}
        title={`¿Eliminar ${element} ${idToEliminate}?`}
        footer={
          <div className="rainbow-flex rainbow-justify_spread">
            <Button
              label="Volver"
              variant="neutral"
              onClick={() => {
                handleResponseModal("Volver", idToEliminate);
                handleOnClose();
              }}
            />
            <Button
              label="OK"
              variant="brand"
              onClick={() => {
                handleResponseModal("OK", idToEliminate);
                DeleteReservation(idToEliminate).then((resp) => {
                  handleResponseModal(resp);
                });
                handleOnClose();
              }}
            />
          </div>
        }
      >
        {text}
      </Modal>
    </div>
  );
}
