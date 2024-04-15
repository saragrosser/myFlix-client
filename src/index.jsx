import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.scss"; // Import custom styles
import Container from "react-bootstrap/Container";

import { createRoot } from "react-dom/client";
import { MainView } from "./Components/main-view/main-view";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
