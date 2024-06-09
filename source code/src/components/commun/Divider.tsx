import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

export const Divider = styled.div<SpaceProps & LayoutProps & ColorProps>`
  height: 1px;

  ${color}
  ${space}
  ${layout}
`;
