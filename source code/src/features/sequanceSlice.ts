import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessStep, Sequence, SequenceState } from "../types";
import { parseSteps } from "../utils/parseSteps";
import { deleteStepAndChildren } from "../utils/deleteStepAndChildren";

const initialState: SequenceState = {
  sequence: {
    Name: "",
    StartStepId: "",
    Steps: [],
  },
  ready: false,
  nodes: [],
  edges: [],
};

/**
 * Redux slice for managing the sequence state, including nodes, edges, and steps.
 */
const sequenceSlice = createSlice({
  name: "sequence",
  initialState,
  reducers: {
    /**
     * Sets the initial step in the sequence.
     * @param {SequenceState} state - The current state of the sequence.
     * @param {PayloadAction<{ module: string; func: string }>} action - The action payload containing the module and function.
     */
    setInitStep(
      state,
      action: PayloadAction<{
        module: string;
        func: string;
      }>
    ) {
      const newStepId = `root_${Date.now()}`;
      const newStep: ProcessStep = {
        StepType: 1,
        StepId: newStepId,
        Function: `${action.payload.module}/${action.payload.func}`,
        Transitions: [
          {
            result: "Succeeded",
            NextStepId: "Done", // Default transition to 'Done'
          },
        ],
      };
      state.sequence.StartStepId = newStepId;
      state.sequence.Steps.push(newStep);
      const { nodes, edges } = parseSteps(state.sequence.Steps, state.nodes);
      state.nodes = nodes;
      state.edges = edges;
    },

    /**
     * Sets the sequence with the given sequence data.
     * @param {SequenceState} state - The current state of the sequence.
     * @param {PayloadAction<Sequence>} action - The action payload containing the sequence data.
     */
    setSequence(state, action: PayloadAction<Sequence>) {
      state.sequence = action.payload;
      state.ready = action.payload.Steps.length > 1;
      const { nodes, edges } = parseSteps(action.payload.Steps, state.nodes);
      state.nodes = nodes;
      state.edges = edges;
    },

    /**
     * Adds a new step to the sequence.
     * @param {SequenceState} state - The current state of the sequence.
     * @param {PayloadAction<{ parentStepId: string; module: string; func: string; result: "Succeeded" | "Failed" }>} action - The action payload containing the details for the new step.
     */
    addStep(
      state,
      action: PayloadAction<{
        parentStepId: string;
        module: string;
        func: string;
        result: "Succeeded" | "Failed";
      }>
    ) {
      const newStepId = `step_${Date.now()}`;
      const newStep: ProcessStep = {
        StepType: 1,
        StepId: newStepId,
        Function: `${action.payload.module}/${action.payload.func}`,
        Transitions: [
          {
            result: "Succeeded",
            NextStepId: "Done", // Default transition to 'Done'
          },
        ],
      };
      state.sequence.Steps.push(newStep);
      state.ready = state.sequence.Steps.length > 1;

      const parentStep = state.sequence.Steps.find(
        (step) => step.StepId === action.payload.parentStepId
      );
      if (parentStep && "Transitions" in parentStep) {
        const existingTransitionIndex = parentStep.Transitions.findIndex(
          (t) => t.result === action.payload.result
        );
        if (existingTransitionIndex > -1) {
          let stepIdToDelete =
            parentStep.Transitions[existingTransitionIndex].NextStepId;
          if (stepIdToDelete !== "Done") {
            state.sequence.Steps.forEach((step) => {
              if ("Transitions" in step) {
                step.Transitions.forEach((transition) => {
                  if (transition.NextStepId === stepIdToDelete) {
                    transition.NextStepId = "Done";
                  }
                });
              }
            });

            state.sequence.Steps = deleteStepAndChildren(
              state.sequence.Steps,
              stepIdToDelete
            );
          }
          parentStep.Transitions[existingTransitionIndex].NextStepId =
            newStepId;
        } else {
          parentStep.Transitions.push({
            result: action.payload.result,
            NextStepId: newStepId,
          });
        }
      }

      const { nodes, edges } = parseSteps(state.sequence.Steps, state.nodes);
      state.nodes = nodes;
      state.edges = edges;
    },

    /**
     * Updates the position of a node.
     * @param {SequenceState} state - The current state of the sequence.
     * @param {PayloadAction<{ id: string; position: { x: number; y: number } }>} action - The action payload containing the node ID and new position.
     */
    updateNodePosition(
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) {
      const node = state.nodes.find((node) => node.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },

    /**
     * Deletes a step and its children from the sequence.
     * @param {SequenceState} state - The current state of the sequence.
     * @param {PayloadAction<string>} action - The action payload containing the ID of the step to be deleted.
     * @result delete current step with all sub steos, and also apply the update of nodes and edges
     */
    deleteStep(state, action: PayloadAction<string>) {
      const stepIdToDelete = action.payload;

      if (stepIdToDelete !== "Done") {
        state.sequence.Steps.forEach((step) => {
          if ("Transitions" in step) {
            step.Transitions.forEach((transition) => {
              if (transition.NextStepId === stepIdToDelete) {
                transition.NextStepId = "Done";
              }
            });
          }
        });

        const updatedSteps = deleteStepAndChildren(
          state.sequence.Steps,
          stepIdToDelete
        );
        state.sequence.Steps = updatedSteps;
      }

      const { nodes, edges } = parseSteps(state.sequence.Steps, state.nodes);
      state.nodes = nodes;
      state.edges = edges;
    },
  },
});

export const {
  setSequence,
  addStep,
  updateNodePosition,
  deleteStep,
  setInitStep,
} = sequenceSlice.actions;
export default sequenceSlice.reducer;
