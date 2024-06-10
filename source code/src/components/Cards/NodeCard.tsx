import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { Handle, Position } from "reactflow";
import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../store";
import { showModal } from "../../features/appSlice";
import { deleteStep } from "../../features/sequenceSlice";
import { CustomNodeData } from "../../types";
import { FiEdit } from "react-icons/fi";

import { DONE, FAILED, SUCCEEDED } from "../../constants/constants";

interface CustomNodeProps {
  data: CustomNodeData;
}

/**
 *
 * @component NodeCard component represents a custom node in a flow diagram.
 *  It includes the node label, description, and action buttons.
 * @param {CustomNodeProps} props - The props object containing the data for the node.
 * @returns {React.ReactElement} - A JSX element representing the NodeCard.
 */

export function NodeCard({ data }: CustomNodeProps): React.ReactElement {
  const dispatch = useAppDispatch();

  /**
   * Handles opening the modal based on the result.
   *
   * @param {("Failed" | "Succeeded" )} result - The result status ("Failed" or "Succeeded").
   */
  // we can add result as Failed | Succeeded | Update | Done
  //
  const handleOpenModal = (result: "Failed" | "Succeeded" | null): void => {
    dispatch(showModal({ parentId: data.stepId, result: result }));
  };
  const handleOpenModalUpdate = (): void => {
    dispatch(showModal({ parentId: data.stepId, Function: data.label }));
  };

  return (
    <StyledCard
      backgroundColor={data.label === DONE ? "#F3922B" : "white"}
      textColor={data.label === DONE ? "white" : "black"}
    >
      <Handle type="target" position={Position.Top} />
      <Card.Body>
        {data.label !== DONE && (
          <>
            <CloseIcon
              onClick={() => dispatch(deleteStep(data.stepId))}
              size={36}
            />
            <EditIcon onClick={handleOpenModalUpdate} size={36} />
          </>
        )}
        <div>
          <CardTitle>{data.label}</CardTitle>
        </div>
        {data.label !== "Done" && (
          <ButtonGroup>
            <Button variant="danger" onClick={() => handleOpenModal(FAILED)}>
              Failed case
            </Button>
            <Button
              variant="success"
              onClick={() => handleOpenModal(SUCCEEDED)}
            >
              Succeeded case
            </Button>
          </ButtonGroup>
        )}
      </Card.Body>
      {data.transitions.map((transition, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Bottom}
          id={transition.result}
          style={{ left: `${index * 50}%` }}
        />
      ))}
    </StyledCard>
  );
}

// Styled components
const StyledCard = styled(Card)<{ backgroundColor: string; textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 400px;
  scale: 0.7;
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
`;

const CloseIcon = styled(MdClose)`
  position: absolute;
  color: white;
  background: #dc3545;
  top: 10px;
  right: 10px;
  border-radius: 12px;
  cursor: pointer;
`;
const EditIcon = styled(FiEdit)`
  position: absolute;
  color: black;
  top: 10px;
  right: 50px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: gray;
  }
`;
const CardTitle = styled.h3`
  margin: 50px 0px;
`;

// const CardDescription = styled.p`
//   margin: 0;
// `;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;
