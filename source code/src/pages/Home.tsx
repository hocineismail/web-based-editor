import { Container } from "react-bootstrap";

import { FlowSteps, Header, InitProgram, NextStep } from "../components";

/**
 * Home page.
 * It renders the Header, InitProgram, FlowSteps, and NextStep components .
 */

export function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <Container>
        <InitProgram />
        <FlowSteps />
        <NextStep />
      </Container>
    </>
  );
}
