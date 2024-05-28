import { useState } from "react";
import "./App.scss";
import TalentPath from "./components/TalentPath";
import { MAX_POINTS } from "./constants";

const App = () => {
  const [pointsSpent, setPointsSpent] = useState(0);
  const [path1, setPath1] = useState([false, false, false, false]);
  const [path2, setPath2] = useState([false, false, false, false]);

  const handlePointChange = (path, setPath, index, increment) => {
    if (increment && pointsSpent < MAX_POINTS) {
      if (!path[index] && (index === 0 || path[index - 1])) {
        path[index] = true;
        setPointsSpent(pointsSpent + 1);
      }
    } else if (!increment && pointsSpent > 0) {
      if (path[index] && (index === path.length - 1 || !path[index + 1])) {
        path[index] = false;
        setPointsSpent(pointsSpent - 1);
      }
    }
    setPath([...path]);
  };

  return (
    <div className="app">
      <div className="main-container">
        <div className="title">
          TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
        </div>
        <div className="talent-calculator-container">
          <div className="talent-calculator">
            <div className="talent-path-container">
              <div className="talent-path-label">TALENT PATH 1</div>
              <TalentPath
                pathIndex={0}
                path={path1}
                onPointChange={(index, increment) =>
                  handlePointChange(path1, setPath1, index, increment)
                }
              />
            </div>
            <div className="talent-path-container">
              <div className="talent-path-label">TALENT PATH 2</div>
              <TalentPath
                pathIndex={1}
                path={path2}
                onPointChange={(index, increment) =>
                  handlePointChange(path2, setPath2, index, increment)
                }
              />
            </div>
          </div>
          <div className="points-spent">
            {pointsSpent} / {MAX_POINTS}
            <br />
            <span>Points Spent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
