// utils/parseSteps.ts
import { Node, Edge } from "reactflow";
import { CustomNodeData, ProcessStep, DoneStep, Transition } from "../types";

const isProcessStep = (step: ProcessStep | DoneStep): step is ProcessStep => {
  return step.StepType === 1;
};

export const parseSteps = (
  steps: (ProcessStep | DoneStep)[],
  existingNodes: Node<CustomNodeData>[] = []
): { nodes: Node<CustomNodeData>[]; edges: Edge[] } => {
  const edges: Edge[] = [];
  const nodeMap: { [key: string]: Node<CustomNodeData> } = {};
  const doneStepId = "Done";

  const existingNodeMap = existingNodes.reduce(
    (
      acc: { [key: string]: { x: number; y: number } },
      node: Node<CustomNodeData>
    ) => {
      acc[node.id] = node.position;
      return acc;
    },
    {}
  );

  steps.forEach((step) => {
    // Check if it is a regular step or the end of the process, DONE
    if (isProcessStep(step)) {
      const node: Node<CustomNodeData> = {
        id: step.StepId,
        type: "customNode",
        data: {
          label: step.Function || step.StepId,
          description: step.Function || step.StepId,
          transitions: step.Transitions || [],
          stepId: step.StepId,
        },
        position: existingNodeMap[step.StepId] || { x: 100, y: 100 }, // Initial position
      };
      nodeMap[step.StepId] = node;
    } else {
      const node: Node<CustomNodeData> = {
        id: step.StepId,
        type: "customNode",
        data: {
          label: step.StepId,
          description: "Done",
          transitions: [],
          stepId: step.StepId, // Add the stepId to the data
        },
        position: existingNodeMap[step.StepId] || { x: 100, y: 600 }, // Initial position
      };
      nodeMap[step.StepId] = node;
    }
  });

  steps.forEach((step) => {
    if (isProcessStep(step)) {
      if (step.Transitions) {
        step.Transitions.forEach((transition: Transition) => {
          edges.push({
            id: `e-${step.StepId}-${transition.NextStepId}`,
            source: step.StepId,
            sourceHandle: transition.result,
            target: transition.NextStepId,
            label: transition.result,
          });
        });
      }
    }
  });

  // Reposition Done step to the end
  const doneNode = nodeMap[doneStepId];
  if (doneNode) {
    doneNode.position = { x: 100, y: 100 + Object.keys(nodeMap).length * 100 };
    nodeMap[doneStepId] = doneNode;
  }

  // Sort nodes to place 'Done' at the end
  const sortedNodes = Object.values(nodeMap).sort((a, b) =>
    a.id === doneStepId ? 1 : b.id === doneStepId ? -1 : 0
  );

  // Position nodes only if they don't have existing positions
  const positionNodes = (
    parentNode: Node<CustomNodeData>,
    level: number,
    index: number,
    total: number,
    visited: Set<string>
  ) => {
    if (visited.has(parentNode.id)) return;
    visited.add(parentNode.id);

    const xOffset = 600;
    const yOffset = 400;

    if (!existingNodeMap[parentNode.id]) {
      parentNode.position = {
        x: index * xOffset - ((total - 1) / 2) * xOffset,
        y: level * yOffset,
      };
    }

    const children = parentNode.data.transitions
      .map((t) => nodeMap[t.NextStepId])
      ?.filter(Boolean);
    children.forEach((childNode, childIndex) => {
      positionNodes(childNode, level + 1, childIndex, children.length, visited);
    });
  };

  // Start positioning from the root node
  const rootNode = sortedNodes.find((node) => node.id === steps[0].StepId);
  if (rootNode) {
    positionNodes(rootNode, 0, 0, 1, new Set());
  }

  return { nodes: sortedNodes, edges };
};
