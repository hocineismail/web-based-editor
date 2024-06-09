import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { H2, Paragraph } from "../commun/Typography";
import { FileReaderComponent } from "../fileReader/FileReader";
import { Sequence } from "../../types";
import { DemoButton } from "../Demo/LoadMachineCapalities";
import sequence_assessment from "../Demo/sequence_assessment.json";

interface Props<T> {
  getContent: (data: T) => void;
  label?: string;
}

/**
 * InitSequence component for creating or loading a sequence.
 *
 * This component provides two main functionalities:
 * 1. Creating a new sequence with a specified name.
 * 2. Loading an existing sequence from a file or using a default example sequence.
 *
 * @template T - The type of the data being handled, which can be a `Sequence`.
 *
 * @param {Props<T>} props - The props for the component.
 * @param {function} props.getContent - Function to handle the parsed sequence data.
 * @param {string} [props.label] - Optional label for the file input component.
 *
 * @returns {React.ReactElement} The rendered InitSequence component.
 */
export function InitSequence<T>({ getContent }: Props<T>): React.ReactElement {
  const [name, setName] = React.useState<string>("");
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleInitProgam = () => {
    const StartStepId = `root_${Date.now()}`;
    const newStep: Sequence = {
      Name: name,
      StartStepId: StartStepId,
      Steps: [
        {
          StepType: 5,
          StepId: "Done",
        },
      ],
    };
    getContent(newStep as T);
  };

  const handleLoadSequence = () => {
    getContent(sequence_assessment as T);
  };

  return (
    <Row>
      <Col md="12" style={{ marginBottom: "40px" }}>
        <H2>CREATE NEW SEQUENCE</H2>
        <Paragraph>You create an empty process</Paragraph>
        <Form.Label htmlFor="inputPassword5">Program Name</Form.Label>
        <Form.Control
          type="text"
          className="rc-input"
          name="name"
          value={name}
          onChange={handleChangeName}
        />{" "}
        <br />
        <Button onClick={() => handleInitProgam()}>
          {" "}
          Create Empty Sequence
        </Button>
      </Col>
      <hr />
      <Col md="12">
        <H2>OPEN OLD SEQUENCE</H2>
        <Paragraph>Open existing code by uploading JSON file</Paragraph>
        <FileReaderComponent getContent={getContent} label="Sequence File" />
        <DemoButton
          title="Use Example Sequence"
          buttonText="Load Sequence"
          onClick={handleLoadSequence}
        />
      </Col>
    </Row>
  );
}
