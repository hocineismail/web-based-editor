import { Container } from "react-bootstrap";

import { FlowSteps, Header, InitProgram, StepEditor } from "../components";
import React from "react";
import { clearSequence } from "../features/sequenceSlice";
import { useAppDispatch } from "../store";
import { clearCapabilities } from "../features/capabilitiesSlice";

/**
 * Home page.
 * It renders the Header, InitProgram, FlowSteps, and StepEditor components .
 */

export function Home(): React.ReactElement {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    return () => {
      // Clean up data when the component unmounts
      dispatch(clearSequence());
      dispatch(clearCapabilities());
    };
  }, [dispatch]);
  return (
    <>
      <Header />
      <Container>
        <InitProgram />
        <FlowSteps />
        <StepEditor />
      </Container>
    </>
  );
}
