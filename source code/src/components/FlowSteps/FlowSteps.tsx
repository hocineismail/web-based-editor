import { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Edge,
  Connection,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../store";
import { updateNodePosition } from "../../features/sequanceSlice";
import { Button } from "react-bootstrap";
import { showModal } from "../../features/appSlice";
import { NodeCard } from "../Cards/NodeCard";

// Define custom node types
const nodeTypes = {
  customNode: NodeCard,
};

/**
 * the sequence will be displayed as diagram
 * FlowSteps component renders the flow diagram with nodes and edges.
 * It allows connecting nodes, updating node positions, and creating new steps.
 *  @returns {React.ReactElement | null}
 *  React element: if there are more then 2 nodes
 *  null: if there are no nodes.
 */

export function FlowSteps(): React.ReactElement | null {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useAppSelector((state) => state.sequence);

  // Memoized function to handle new connections
  const onConnect = useCallback(
    (params: Edge | Connection) => addEdge(params, edges),
    [edges]
  );

  // Memoized function to handle node position changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      updatedNodes.forEach((node) => {
        const change = changes.find((change: any) => change.id === node.id);
        if (change && change.type === "position") {
          dispatch(
            updateNodePosition({ id: node.id, position: node.position })
          );
        }
      });
    },
    [nodes, dispatch]
  );
  // Render a null if the is no data,

  if (nodes.length === 0) return null;

  // Render a button to create the first function if there's only one node (Done)
  if (nodes.length === 1)
    return (
      <StyledStartSection>
        Your Program
        <br />
        <Button
          onClick={() =>
            dispatch(
              showModal({
                root: true,
              })
            )
          }
        >
          Create First Function
        </Button>
      </StyledStartSection>
    );
  return (
    <ReactFlowProvider>
      <Viewer>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          style={{ background: `#181A1B` }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </Viewer>
    </ReactFlowProvider>
  );
}

const Viewer = styled.div`
  width: 100%;
  height: 90vh;
`;
const StyledStartSection = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`;
