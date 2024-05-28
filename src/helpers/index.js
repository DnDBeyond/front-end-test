const ICON_SIZE = 50;

const ICON_POSITIONS = [
  ["0px", `-${ICON_SIZE}px`, `-${ICON_SIZE * 2}px`, `-${ICON_SIZE * 3}px`],
  [
    `-${ICON_SIZE * 4}px`,
    `-${ICON_SIZE * 5}px`,
    `-${ICON_SIZE * 6}px`,
    `-${ICON_SIZE * 7}px`,
  ],
];

export const getIconPosition = (pathIndex, index) => {
  return `${ICON_POSITIONS[pathIndex][index]}`;
};
