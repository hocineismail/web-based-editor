import React from "react";
import { Button } from "react-bootstrap";
import { H3, H4 } from "../commun/Typography";
import styled from "styled-components";

/**
 * Props interface for the DemoButton component.
 */
interface Props {
  onClick: () => void;
  title?: string;
  buttonText: string;
}

/**
 * @component DemoButton renders a section with a title, subtitle, and a button.
 * @param {Props} props - The props for the component.
 */
export function DemoButton({
  onClick,
  title,
  buttonText,
}: Props): React.ReactElement {
  return (
    <StylledSection>
      <H4>Or</H4>
      <H3>{title}</H3>
      <Button onClick={onClick}>{buttonText}</Button>
    </StylledSection>
  );
}

/**
 * Styled section for the DemoButton component.
 */
const StylledSection = styled.div`
  margin-top: 20px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;
