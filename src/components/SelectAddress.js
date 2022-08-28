import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Map from "./Map";

export default function SelectAddress({ modal, closeModal }) {

  const onOpened = () => {

  };

  return (
    <Modal fullscreen isOpen={modal} onOpened={onOpened} toggle={closeModal} fade={false}>
      <ModalHeader toggle={closeModal}>
        Ange adress för väder
      </ModalHeader>
      <ModalBody className="pt-0">
        <Map />        
      </ModalBody>
    </Modal>
  );
}