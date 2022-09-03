import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useAddress } from "../contexts/AddressProvider";
import Map from "./Map";

export default function SelectLocation({ modal, closeModal }) {
  const { getAddress } = useAddress();
  const onOpened = () => {

  };

  return (
    <Modal fullscreen isOpen={modal} onOpened={onOpened} toggle={closeModal} fade={false}>
      <ModalHeader className="p-2 m-0" toggle={closeModal}>
          <h5>
            Ange adress för väder :&nbsp;&nbsp;
            <span className="text-info">
              {getAddress}
            </span>
          </h5>
      </ModalHeader>
      <ModalBody className="pt-0">
        <Map />
      </ModalBody>
    </Modal>
  );
}