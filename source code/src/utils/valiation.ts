import { MachineCapabilities, ProcessStep, Sequence } from "@/types";

/**
 * Checks if an object is empty (has no own properties).
 *
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Validates if the given data conforms to the MachineCapabilities type.
 *
 * @param data - The data to validate.
 * @returns True if the data is of type MachineCapabilities, false otherwise.
 */
export function validateMachineCapabilities(
  data: any
): data is MachineCapabilities {
  if (typeof data !== "object" || data === null) return false;

  for (const moduleName in data) {
    const module = data[moduleName];
    if (
      !module ||
      typeof module !== "object" ||
      typeof module.Functions !== "object"
    )
      return false;

    for (const functionName in module.Functions) {
      const func = module.Functions[functionName];
      if (
        !func ||
        typeof func !== "object" ||
        typeof func.FunctionDescription !== "object"
      )
        return false;

      const description = func.FunctionDescription;
      if (
        typeof description.Name !== "string" ||
        typeof description.Description !== "string"
      )
        return false;
    }
  }
  return true;
}

/**
 * Validates if the given data conforms to the Sequence type.
 *
 * @param data - The data to validate.
 * @returns True if the data is of type Sequence, false otherwise.
 */
export function validateSequence(data: any): data is Sequence {
  if (typeof data !== "object" || data === null) return false;

  if (typeof data.Name !== "string") return false;
  if (typeof data.StartStepId !== "string") return false;
  if (!Array.isArray(data.Steps)) return false;

  for (const step of data.Steps) {
    if (
      typeof step !== "object" ||
      typeof step.StepType !== "number" ||
      (step.StepType !== 1 && step.StepType !== 5) ||
      typeof step.StepId !== "string"
    )
      return false;

    if (step.StepType === 1) {
      const processStep = step as ProcessStep;
      if (
        typeof processStep.Function !== "string" ||
        !Array.isArray(processStep.Transitions)
      )
        return false;

      for (const transition of processStep.Transitions) {
        if (
          typeof transition !== "object" ||
          (transition.result !== "Succeeded" &&
            transition.result !== "Failed") ||
          typeof transition.NextStepId !== "string"
        )
          return false;
      }
    }
  }
  return true;
}
