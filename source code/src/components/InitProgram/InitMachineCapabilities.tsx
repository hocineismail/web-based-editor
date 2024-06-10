import { useCallback } from "react";
import { initializeCapabilities } from "../../features/capabilitiesSlice";
import { useAppDispatch } from "../../store";
import { DemoButton } from "../Demo/LoadMachineCapalities";
import { H3 } from "../commun/Typography";
import { FileReaderComponent } from "../fileReader/FileReader";
import MachineCapabilitiesJSON from "../Demo/MachineCapabilities_Assessment.json";
import { MachineCapabilities } from "../../types";
import { validateMachineCapabilities } from "../../utils/valiation";

/**
 * Component to initialize machine capabilities.
 * It provides options to upload capabilities from a file or load default capabilities.
 */
export function InitMachineCapabilities() {
  const dispatch = useAppDispatch();

  const handleInitCapabilites = useCallback(
    (capabilities: MachineCapabilities) => {
      // Validate data
      // To avoid uploading any incorrect file,
      // it should match the type of MachineCapabilities
      if (!validateMachineCapabilities(capabilities)) {
        alert("Invalid data structure");
        return;
      }

      dispatch(initializeCapabilities(capabilities));
    },
    [dispatch]
  );

  /**
   * Handles loading of default capabilities.
   */
  const handleLoadCapalities = useCallback(() => {
    dispatch(initializeCapabilities(MachineCapabilitiesJSON));
  }, [dispatch]);

  return (
    <div>
      <H3>Let's Start</H3>
      <FileReaderComponent
        getContent={handleInitCapabilites}
        label="Upload Machine capabilities"
      />
      <DemoButton
        title="Use Default Capabilities"
        buttonText="Load Demo"
        onClick={handleLoadCapalities}
      />
    </div>
  );
}
