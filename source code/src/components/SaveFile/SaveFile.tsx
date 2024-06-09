import React from "react";
import { useAppSelector } from "../../store";
import { Button } from "react-bootstrap";
import { FiSave } from "react-icons/fi";

/**
 * SaveFile component for saving the current sequence as a JSON file.
 */

export function SaveFile(): React.ReactElement | null {
  //select sequence, nodes from the our store

  const { sequence, nodes } = useAppSelector((state) => state.sequence);

  // function to download the sequence as a JSON file
  const handleSaveFile = () => {
    const json = JSON.stringify(sequence, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "sequence.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  // return null if we don't have enougth nodes
  if (nodes.length < 2) return null;
  return (
    <Button onClick={handleSaveFile}>
      <FiSave /> Save
    </Button>
  );
}
