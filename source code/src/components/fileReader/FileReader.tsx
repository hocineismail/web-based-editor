import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props<T> {
  getContent: (data: T) => void;
  label?: string;
}
/**
 * FileReaderComponent is a reusable component for reading and parsing JSON files.
 * The generic type `T` can be `MachineCapabilities` or `Sequence`.
 *
 * @param getContent - Function to handle the parsed JSON content.
 * @param label - Optional label for the file input.
 * @returns JSX.Element
 */
export function FileReaderComponent<T>({
  getContent,
  label = "Default Name",
}: Props<T>): React.ReactElement {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const data = json as T;
          getContent(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <>
      <Form.Label htmlFor="file">{label}</Form.Label>
      <Form.Control type="file" accept=".json" onChange={handleFileChange} />
    </>
  );
}
