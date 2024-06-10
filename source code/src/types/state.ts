import { FAILED } from "@/constants/constants";
import { MachineCapabilities, Transition } from "./";
import { Sequence } from "./sequence";
import { Node, Edge } from "reactflow";

export interface JsonData {
  [key: string]: any;
}

export interface CapabilitiesState {
  capabilities: MachineCapabilities;
}

export interface CustomNodeData {
  label: string;
  description: string;
  transitions: Transition[];
  stepId: string;
}

export interface AppState {
  modal: {
    show: boolean;
    root: boolean | null;
    parentId: string | null;
    Function: string | null;
    result: "Failed" | "Succeeded" | null;
  };
}

export interface ShowModal {
  parentId?: string | null;
  result?: "Failed" | "Succeeded" | null;
  Function?: string | null;
  root?: boolean | null;
}

export interface SequenceState {
  sequence: Sequence;
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
  ready: boolean;
}
