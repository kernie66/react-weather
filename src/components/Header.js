import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import FullScreenCheck from './FullScreenCheck';

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerStyle, setHeaderStyle] = useState("pt-2");

  const onFullScreenChange = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    setHeaderStyle(isFullScreen ? "pt-4 pb-2" : "pt-2 pb-2");
  }, [isFullScreen]);

  return (
    <Row className={headerStyle}>
      <Col xs="1">
        <FullScreenCheck isFullScreen={isFullScreen} onFullScreenChange={onFullScreenChange} />
      </Col>
      <Col xs="10" className="text-center outline-lg">
        Weather Station
      </Col>
    </Row>
  );
};