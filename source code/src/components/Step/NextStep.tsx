import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeModal } from "../../features/appSlice";
import { addStep, setInitStep } from "../../features/sequanceSlice";

/**
 * NextStep component renders a modal to create a new step or update in the sequence.
 * The modal allows the user to select a module and a function from the available capabilities.
 *
 * @returns {React.ReactElement} The rendered NextStep component.
 */

export function NextStep(): React.ReactElement {
  const { capabilities } = useAppSelector((state) => state.capabilities);

  const {
    modal: { show, parentId, result, root },
    // currentStep: {
    //     parentStepId
    // }
  } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedFunction, setSelectedFunction] = useState<any>(null);

  const renderModulesAsOptions = () => {
    if (capabilities) {
      return Object.keys(capabilities).map((moduleKey) => ({
        value: moduleKey,
        label: moduleKey,
        functions: capabilities[moduleKey].Functions,
      }));
    }
    return [];
  };

  const renderFunctionsAsOptions = () => {
    if (selectedModule) {
      return Object.keys(selectedModule.functions).map((funcKey) => {
        const func = selectedModule.functions[funcKey];
        return {
          value: funcKey,
          label: func.FunctionDescription.Name,
          description: func.FunctionDescription.Description,
        };
      });
    }
    return [];
  };
  const handleClose = () => {
    setSelectedModule(null);
    setSelectedFunction(null);
    dispatch(closeModal());
  };
  const handleCreateStep = () => {
    if (root) {
      dispatch(
        setInitStep({
          module: selectedModule.value,
          func: selectedFunction.value,
        })
      );
    } else if (parentId && result) {
      dispatch(
        addStep({
          parentStepId: parentId,
          module: selectedModule.value,
          func: selectedFunction.value,
          result: result,
        })
      );
    }

    dispatch(closeModal());
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectContainer>
            <label>Select Module</label>
            <Select
              options={renderModulesAsOptions()}
              onChange={setSelectedModule}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
            />
          </SelectContainer>
          <SelectContainer>
            <label>Select Function</label>
            {selectedModule && (
              <Select
                options={renderFunctionsAsOptions()}
                onChange={setSelectedFunction}
                formatOptionLabel={(option) => (
                  <div>
                    <strong>{option.label}</strong>
                    <p>{option.description}</p>
                  </div>
                )}
                getOptionValue={(option) => option.value}
              />
            )}
          </SelectContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateStep}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// Styled components
const SelectContainer = styled.div`
  margin-top: 10px;
`;
