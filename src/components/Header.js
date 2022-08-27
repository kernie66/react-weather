import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import FullScreenCheck from './FullScreenCheck';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import SelectAddress from './SelectAddress';

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerStyle, setHeaderStyle] = useState("pt-2");
  const [modal, setModal] = useState(false);

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
    setHeaderStyle(isFullScreen ? "pt-4 pb-2" : "pt-2 pb-2");
  }, [isFullScreen]);

  return (
    <>
      <SelectAddress modal={modal} closeModal={closeModal} />
      <Row className={headerStyle}>
        <Col xs="1">
          <FullScreenCheck isFullScreen={isFullScreen} onFullScreenChange={onFullScreenChange} />
        </Col>
        <Col xs="10" className="text-center outline-lg">
          Väderstation 
        </Col>
        <Col xs="1" className='text-primary outline-lg' onClick={selectAddress}>
          <FontAwesomeIcon icon={solid('map-location-dot')} />
        </Col>
      </Row>
    </>
  );
};