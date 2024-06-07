import { TbMap2 } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import FullScreenCheck from './FullScreenCheck';
import SelectLocation from './SelectLocation';
import { useAddress } from '../contexts/AddressProvider';

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerStyle, setHeaderStyle] = useState('pt-2');
  const [modal, setModal] = useState(false);
  const { getAddress } = useAddress();
  const onFullScreenChange = () => {
    setIsFullScreen(!isFullScreen);
  };

  const selectAddress = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    setHeaderStyle(isFullScreen ? 'pt-4 pb-2' : 'pt-2 pb-2');
  }, [isFullScreen]);

  return (
    <>
      <SelectLocation modal={modal} closeModal={closeModal} />
      <Row className={headerStyle}>
        <Col xs="1">
          <FullScreenCheck
            isFullScreen={isFullScreen}
            onFullScreenChange={onFullScreenChange}
          />
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
