import { ICON_POSITIONS } from "../constants";

export const getIconPosition = (pathIndex, index) => {
  return `${ICON_POSITIONS[pathIndex][index]}`;
};
