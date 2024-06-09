export interface Transition {
  result: "Succeeded" | "Failed";
  NextStepId: string;
}

export interface Step {
  StepType: 1 | 5;
  StepId: string;
}

export interface ProcessStep extends Step {
  StepType: 1;
  Function: string;
  Transitions: Transition[];
}

export interface DoneStep extends Step {
  StepType: 5;
}

export interface Sequence {
  Name: string;
  StartStepId: string;
  Steps: (ProcessStep | DoneStep)[];
}
