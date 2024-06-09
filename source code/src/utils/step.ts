import { ProcessStep } from "../types";

export class Step implements ProcessStep {
  StepType: 1;
  StepId: string;
  Function: string;
  Transitions: { result: "Succeeded" | "Failed"; NextStepId: string }[];

  constructor(newStepId: string, Function: string) {
    this.StepType = 1;
    this.StepId = newStepId;
    this.Function = Function;
    this.Transitions = [
      {
        result: "Succeeded",
        NextStepId: "Done",
      },
    ];
  }
}
