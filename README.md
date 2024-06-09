# Web Based Editor

<div style="display: flex; flex-direction: row;">
  <img src="https://github.com/hocineismail/web-based-editor/blob/main/examples/01.png?raw=true" alt="Example 1" width="400" />
   <img src="https://github.com/hocineismail/web-based-editor/blob/main/examples/02.png?raw=true" alt="Example 2" width="400" />
</div>
<div style="display: flex; flex-direction: row;">
  <img src="https://github.com/hocineismail/web-based-editor/blob/main/examples/03.png?raw=true" alt="Example 3" width="400" />
   <img src="https://github.com/hocineismail/web-based-editor/blob/main/examples/04.png?raw=true" alt="Example 4" width="400" />
</div>
### Introduction

In order to enable our customers to “program” our machines without programming knowledge,
we would like to create a web-based editor in which the customer
can create individual process steps, select which function is to be executed
in each step and put the steps together to form a sequence.

Which functions the machine can perform is defined in a separate json file: `MachineCapabilities`.
The individual functions are grouped into “modules” such as `GantryAxisX`, `VGU` or `Cameras`.
A function is identified as 'Module name/Function name', e.g. 'GantryAxisX/GetPosition'.
Creating or editing this file is not part of this task.

Depending on whether a step was successful or not, it should be possible to select a different
subsequent step. These are defined in the json file under `Transitions`. The `result` is either `Failed` or `Succeeded`
The sequence ends with a special process step `Done` being called. It should be recognizable by its `StepType` `5`.

## Getting Started

### Prerequisites

# ✔️ Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

# Features:

1. **Technology:**
   - [x] React
   - [x] TypeScript
   - [x] Redux

### covered

The editor should be able to do this:

- [x] Load the `MachineCapabilities` file
- [x] Load an existing sequence from a json file like `sequence_assessment.json`
- [x] Create a new, empty sequence
- [x] Save (download) a sequence as a json file
- [x] Display all process steps of a sequence
- [x] Add a new step
- [x] Delete step
- [x] Select which function is to be executed in a step
- [x] Edit the successor of a step
- [x] Select successor step for `Failed
- [x] Select successor step for `Succeeded

# Setup and Usage

1. Clone the repository: `git clone https://github.com/hocineismail/web-based-editor.git`

## 🔨 Running Code

To run the program, execute the following commands:

1. Run Code Source: Use the terminal to execute the following commands:

   - Navigate to the "source code" directory where the frontend code is located using `cd web-based-editor && cd source code`.
   - Install the dependencies for the React application using `npm install` or `yarn install`.
   - Start the application using `npm start` or `yarn start`.

2. Open Executable HTML:

   - Navigate to the `Executable HTML` folder and open `index.html` in a web browser.

3. View Generated Documentation:

   - Navigate to the `docs` folder and open `index.html` in a web browser.

## Pages

- **http://localhost:3000/**: Home page that contains the machine

## Directory Hierarchy <a id="strecture"></a>

```
|—— public
|    |—— index.html
|—— src
|    |—— assets
|    |—— components
|        |—— Cards
|            |—— NodeCard.tsx
|        |—— commun
|            |—— Box.tsx
|            |—— Divider.tsx
|            |—— Image.tsx
|            |—— Typography.tsx
|        |—— Demo
|            |—— LoadMachineCapalities.tsx
|            |—— sequence_assessment.json
|            |—— MachineCapabilities_Assessment.json
|        |—— fileSteps
|            |—— FileSteps.tsx
|        |—— FlowSteps
|            |—— FlowSteps.tsx
|        |—— Header
|            |—— Header.tsx
|        |—— InitProgram
|            |—— InitMachineCapabilities.tsx
|            |—— InitProgram.tsx
|            |—— InitSequence.tsx
|        |—— SaveFile
|            |—— SaveFile.tsx
|        |—— Step
|            |—— NextStep.tsx
|        |—— index.html
|    |—— styles
|    |—— features
|        |—— appSlice.ts
|        |—— capabilitiesSlice.ts
|        |—— sequenceSlice.ts
|    |—— pages
|        |—— Home.tsx
|    |—— types
|        |—— index.ts
|        |—— state.ts
|        |—— sequence.ts
|        |—— machimeCapabilities.ts
|    |—— utils
|        |—— deleteStepAndChildren.ts
|        |—— parseSteps.ts
|        |—— step.ts
|        |—— validation.ts
|    |—— App.tsx
|    |—— App.css
|    |—— index.tsx
|    |—— index.css
|    |—— store.ts
|    |—— style.css
|—— .gitignore
|—— README.md
|—— package.json
|—— tsconfig.json
|—— typedoc.json
```

## Author

- [@Ismail Hocine](https://github.com/hocineismail)
