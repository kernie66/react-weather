import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Map from "./Map";

export default function SelectLocation({ modal, closeModal }) {

  const onOpened = () => {

  };

  return (
    <Modal fullscreen isOpen={modal} onOpened={onOpened} toggle={closeModal} fade={false}>
      <ModalHeader toggle={closeModal}>
        <h5>Ange adress för väder</h5>
      </ModalHeader>
      <ModalBody className="pt-0">
        <Map />        
      </ModalBody>
    </Modal>
  );
}