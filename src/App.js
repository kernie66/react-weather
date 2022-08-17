import { useEffect } from "react";
import { Container } from "reactstrap";
import WebFont from "webfontloader";
import Body from "./components/Body";
import ClearDay from "./img/clear_day.jpg";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";

export default function App() {
  const backgroundImage = ClearDay;
  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'center',
    backgroundRepeat: 'no-repeat',
    //    width: '100vw',
    height: '100vh'
  };

  // Load fonts used in the app
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Azeret Mono']
      }
    });
  }, []);

  return (
    <Container fluid style={background}>
      <Header />
      <ErrorBoundary>
        <Body />
      </ErrorBoundary>
    </Container>
  );
};