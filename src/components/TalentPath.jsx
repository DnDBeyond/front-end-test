/* eslint-disable react/prop-types */
import "./TalentPath.scss";

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

const getIconPosition = (pathIndex, index) => {
  return `${ICON_POSITIONS[pathIndex][index]}`;
};

const TalentPath = ({ pathIndex, path, onPointChange }) => {
  return (
    <div className="talent-path">
      {path.map((point, index) => (
        <div
          key={index}
          className={`talent ${point ? "active" : ""}`}
          onClick={() => onPointChange(index, true)}
          onContextMenu={(e) => {
            e.preventDefault();
            onPointChange(index, false);
          }}
          style={{
            backgroundPositionX: getIconPosition(pathIndex, index),
          }}
        />
      ))}
    </div>
  );
};

export default TalentPath;
