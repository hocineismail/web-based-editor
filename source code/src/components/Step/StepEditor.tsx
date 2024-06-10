import React, { useState, useMemo, useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeModal } from "../../features/appSlice";
import {
  addStep,
  setInitStep,
  updateCurrentStep,
  endStep,
} from "../../features/sequenceSlice";
import { H3 } from "../commun/Typography";

/**
 * StepEditor component renders a modal to create a new step or update in the sequence.
 * The modal allows the user to select a module and a function from the available capabilities.
 *
 * @returns {React.ReactElement} The rendered StepEditor component.
 */
export function StepEditor(): React.ReactElement {
  const { capabilities } = useAppSelector((state) => state.capabilities);
  const {
    modal: { show, parentId, result, root, Function },
  } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [isEndProcess, setIsEndProcess] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedFunction, setSelectedFunction] = useState<any>(null);

  const renderModulesAsOptions = useMemo(() => {
    if (capabilities) {
      return Object.keys(capabilities).map((moduleKey) => ({
        value: moduleKey,
        label: moduleKey,
      }));
    }
    return [];
  }, [capabilities]);

  const renderFunctionsAsOptions = useMemo(() => {
    if (selectedModule) {
      return Object.keys(capabilities[selectedModule.label].Functions).map(
        (funcKey) => {
          const func = capabilities[selectedModule.label].Functions[funcKey];
          return {
            value: funcKey,
            label: func.FunctionDescription.Name,
            description: func.FunctionDescription.Description,
          };
        }
      );
    }
    return [];
  }, [selectedModule, capabilities]);

  const handleClose = useCallback(() => {
    setSelectedModule(null);
    setSelectedFunction(null);
    setIsEndProcess(false);
    dispatch(closeModal());
  }, [dispatch]);

  const handleSaveChanges = useCallback(() => {
    if (root) {
      dispatch(
        setInitStep({
          module: selectedModule.value,
          func: selectedFunction.value,
        })
      );
    } else if (parentId && result) {
      if (isEndProcess) {
        dispatch(
          endStep({
            parentStepId: parentId,
            result: result,
          })
        );
      } else {
        dispatch(
          addStep({
            parentStepId: parentId,
            module: selectedModule.value,
            func: selectedFunction.value,
            result: result,
          })
        );
      }
    } else if (parentId && !result) {
      dispatch(
        updateCurrentStep({
          stepId: parentId,
          module: selectedModule.value,
          func: selectedFunction.value,
        })
      );
    }
    handleClose();
  }, [
    dispatch,
    root,
    parentId,
    result,
    selectedModule?.value,
    selectedFunction?.value,
    isEndProcess,
    handleClose,
  ]);

  React.useEffect(() => {
    if (isEndProcess) {
      setSelectedModule(null);
      setSelectedFunction(null);
    }
  }, [isEndProcess]);

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsEndProcess(event.target.checked);
    },
    []
  );

  const handleSectionClick = useCallback(() => {
    setIsEndProcess((prev) => !prev);
  }, []);

  const handleCheckboxClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  React.useEffect(() => {
    if (Function && capabilities) {
      const funcSplited = Function.split("/");

      setSelectedModule({
        label: funcSplited[0],
        value: funcSplited[0],
      });

      let target = funcSplited[0];
      const func = capabilities[target].Functions[funcSplited[1]];
      setSelectedFunction({
        value: funcSplited[1],
        label: func.FunctionDescription.Name,
        description: func.FunctionDescription.Description,
      });
    }
  }, [Function, capabilities]);

  const handleChangeModule = useCallback((data: any) => {
    setSelectedModule(data);
    setSelectedFunction(null);
  }, []);

  const renderTitle = useMemo(() => {
    if (root || (parentId && result)) {
      return <Modal.Title>Create New Step</Modal.Title>;
    } else if (parentId && !result) {
      return <Modal.Title>Update Step</Modal.Title>;
    }
    return <Modal.Title>Default Step</Modal.Title>;
  }, [root, parentId, result]);

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
          <Modal.Title>{renderTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!root && result && (
            <>
              <H3>Select "Done" as the Next Step</H3>
              <CheckboxSection onClick={handleSectionClick}>
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id={`default-checkbox`}
                  checked={isEndProcess}
                  onChange={handleCheckboxChange}
                  onClick={handleCheckboxClick}
                  label={
                    <span
                      onClick={(e) => e.stopPropagation()}
                      style={{ cursor: "pointer" }}
                    >
                      Mark as End of Process
                    </span>
                  }
                />
              </CheckboxSection>
              <hr />
            </>
          )}

          {!isEndProcess && (
            <>
              <H3>Select a Function for the Next Step</H3>
              <SelectContainer>
                <label>Select Module</label>
                <Select
                  options={renderModulesAsOptions}
                  onChange={handleChangeModule}
                  value={{
                    label: selectedModule?.label || "",
                    value: selectedModule?.value || "",
                  }}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              </SelectContainer>
              <SelectContainer>
                {selectedModule && (
                  <>
                    <label>Select Function</label>
                    <Select
                      options={renderFunctionsAsOptions}
                      onChange={setSelectedFunction}
                      formatOptionLabel={(option) => (
                        <div>
                          <strong>{option.label}</strong>
                          <p>{option?.description}</p>
                        </div>
                      )}
                      value={{
                        label: selectedFunction?.label || "",
                        value: selectedFunction?.value || "",
                        description: selectedFunction?.description || "",
                      }}
                      getOptionValue={(option) => option.value}
                    />
                  </>
                )}
              </SelectContainer>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={!selectedFunction && !isEndProcess}
          >
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

const CheckboxSection = styled.div`
  background-color: rgb(209, 209, 209);
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
`;
