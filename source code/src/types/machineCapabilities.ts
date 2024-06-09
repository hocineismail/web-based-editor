export interface FunctionDescription {
  Name: string;
  Description: string;
}

export interface Module {
  Functions: {
    [FunctionName: string]: { FunctionDescription: FunctionDescription };
  };
}

export interface MachineCapabilities {
  [ModuleName: string]: Module;
}
