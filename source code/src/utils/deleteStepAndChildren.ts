import { DoneStep, ProcessStep } from "../types";

/**
 * Recursively deletes a step and its children from the sequence.
 * @param steps - The list of all steps in the sequence.
 * @param stepIdToDelete - The ID of the step to delete.
 * @returns The updated list of steps.
 */
export function deleteStepAndChildren(
  steps: (ProcessStep | DoneStep)[],
  stepIdToDelete: string
): (ProcessStep | DoneStep)[] {
  const stepsToDelete: string[] = [stepIdToDelete];
  const stepsStack: string[] = [stepIdToDelete];

  while (stepsStack.length > 0) {
    const currentStepId = stepsStack.pop();
    const currentStep = steps.find((step) => step.StepId === currentStepId);

    if (currentStep && "Transitions" in currentStep) {
      currentStep.Transitions.forEach((transition) => {
        if (transition.NextStepId !== "Done") {
          stepsToDelete.push(transition.NextStepId);
          stepsStack.push(transition.NextStepId);
        }
      });
    }
  }

  return steps.filter((step) => !stepsToDelete.includes(step.StepId));
}
