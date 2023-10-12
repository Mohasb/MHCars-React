import { Modal, Button } from "react-rainbow-components";
//import { DeleteReservation } from "../../services/apiRequest/DeleteReservation";
import CustomService from "../../Services/apiRequest/CustomService";

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
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "red",
          textTransform: "uppercase",
        }}
        onRequestClose={handleOnClose}
        title={`¿Eliminar ${element} ${idToEliminate}?`}
        footer={
          <div className="rainbow-flex rainbow-justify_spread">
            <Button
              label="Volver"
              variant="neutral"
              onClick={() => {
                //handleResponseModal("Volver", idToEliminate);
                handleOnClose();
              }}
            />
            <Button
              label="OK"
              variant="brand"
              style={{ backgroundColor: "red", border: "1px solid red" }}
              onClick={() => {
                handleResponseModal("OK", idToEliminate);
                CustomService.DeleteReservation(idToEliminate).then((resp) => {
                  handleResponseModal(resp.isOk, idToEliminate);
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
