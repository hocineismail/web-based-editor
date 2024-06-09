import React from "react";
import { Col, Row } from "react-bootstrap";
import { setSequence } from "../../features/sequanceSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { H1 } from "../commun/Typography";
import UploadImage from "../../assets/images/undraw_file_sync_re_0pcx.svg";
import { Image } from "../commun/Image";
import { isEmpty } from "../../utils/valiation";

import { InitSequence } from "./InitSequence";
import { InitMachineCapabilities } from "./InitMachineCapabilities";
import styled from "styled-components";
import { Sequence } from "../../types";

/**
 * InitProgram component manages the initialization of the program by handling machine capabilities and sequences.
 * It displays an introductory message and options to either upload machine capabilities or initialize a sequence.
 *
 * @returns { React.ReactElement  | null} React element or null if the sequence steps are already initialized.
 */
export const InitProgram: React.FC = (): React.ReactElement | null => {
  // Select our capabilities and sequence from global state
  const { capabilities } = useAppSelector((state) => state.capabilities);
  const { sequence } = useAppSelector((state) => state.sequence);
  const dispatch = useAppDispatch();

  const handleSetSequenceFromFile = (sequence: Sequence) => {
    dispatch(setSequence(JSON.parse(JSON.stringify(sequence))));
  };

  if (sequence.Steps.length > 0) return null;
  return (
    <StyledContent>
      {isEmpty(capabilities) ? (
        <>
          <H1 style={{ textAlign: "center" }}>Welcome to Web based editor</H1>
          <Row>
            <StyledGrid md={6}>
              <Image src={UploadImage} width={300} />
            </StyledGrid>
            <StyledGrid md={6}>
              <InitMachineCapabilities />
            </StyledGrid>
          </Row>
        </>
      ) : (
        <InitSequence getContent={handleSetSequenceFromFile} />
      )}
    </StyledContent>
  );
};

const StyledContent = styled.div`
  margin-top: 100px;
`;
const StyledGrid = styled(Col)`
  padding: 50px;
`;
