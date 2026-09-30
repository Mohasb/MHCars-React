import { Modal, Button } from "react-rainbow-components";

// Modo demo: aviso al pulsar «Admin» con el usuario demo
export default function DemoAdminNotice({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      title="Zona de administración"
      footer={
        <div className="rainbow-flex rainbow-justify_center">
          <Button label="Entendido" variant="brand" onClick={onClose} />
        </div>
      }
    >
      <p className="text-center">
        Estás usando un <strong>usuario demo</strong>. Esta zona es solo para
        administradores: desde ella se gestionan sucursales, coches, clientes y
        reservas.
      </p>
    </Modal>
  );
}
