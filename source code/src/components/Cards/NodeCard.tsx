import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { Handle, Position } from "reactflow";
import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../store";
import { showModal } from "../../features/appSlice";
import { deleteStep } from "../../features/sequanceSlice";
import { CustomNodeData } from "../../types";

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
   * @param {("Failed" | "Succeeded")} result - The result status ("Failed" or "Succeeded").
   */
  const handleOpenModal = (result: "Failed" | "Succeeded"): void => {
    dispatch(showModal({ parentId: data.stepId, result: result }));
  };

  return (
    <StyledCard
      backgroundColor={data.label === "Done" ? "#F3922B" : "white"}
      textColor={data.label === "Done" ? "white" : "black"}
    >
      <Handle type="target" position={Position.Top} />
      <Card.Body>
        {data.label !== "Done" && (
          <CloseIcon
            onClick={() => dispatch(deleteStep(data.stepId))}
            size={24}
          />
        )}
        <div>
          <CardTitle>{data.label}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </div>
        {data.label !== "Done" && (
          <ButtonGroup>
            <Button variant="danger" onClick={() => handleOpenModal("Failed")}>
              Failed
            </Button>
            <Button
              variant="success"
              onClick={() => handleOpenModal("Succeeded")}
            >
              Succeeded
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
  scale: 0.5;
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
`;

const CloseIcon = styled(MdClose)`
  position: absolute;
  color: white;
  background: #dc3545;
  top: -10px;
  right: -10px;
  border-radius: 12px;
  cursor: pointer;
`;

const CardTitle = styled.h4`
  margin: 0;
`;

const CardDescription = styled.p`
  margin: 0;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;
