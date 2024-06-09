import { TbMap2 } from 'react-icons/tb';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import SelectLocation from './SelectLocation';
import { useAddress } from '../contexts/AddressProvider';
import FullScreenButton from './FullScreenButton.jsx';

export default function Header() {
  const [modal, setModal] = useState(false);
  const { getAddress } = useAddress();

  const selectAddress = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <SelectLocation modal={modal} closeModal={closeModal} />
      <Row>
        <Col xs="1">
          <FullScreenButton />
        </Col>
        <Col xs="10" className="text-center outline-lg">
          Väderstation :&nbsp;{getAddress.toString()}
        </Col>
        <Col
          xs="1"
          className="text-primary outline-lg"
          onClick={selectAddress}
        >
          <TbMap2 />
        </Col>
      </Row>
    </>
  );
}
