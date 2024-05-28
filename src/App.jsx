import { useState, useEffect } from "react";
import TalentPath from "./components/TalentPath";
import "./App.scss";

const App = () => {
  const [paths, setPaths] = useState([]);
  const [maxPoints, setMaxPoints] = useState(0);
  const [totalPointsSpent, setTotalPointsSpent] = useState(0);

  useEffect(() => {
    // Simulating an HTTP call to fetch data from the JSON file
    import("./data/index.json").then((data) => {
      // Create initial array based on availableSkills and pointsSpent values
      const updatedPaths = data.paths.map((path) => {
        const initialPoints = Array.from(
          { length: path.availableSkills },
          (_, index) => index < path.pointsSpent
        );
        return { ...path, points: initialPoints };
      });
      setPaths(updatedPaths);
      setMaxPoints(data.maxPoints);
      setTotalPointsSpent(
        updatedPaths.reduce((total, path) => total + path.pointsSpent, 0)
      );
    });
  }, []);

  const handlePointChange = (pathIndex, pointIndex, increment) => {
    if (increment && totalPointsSpent >= maxPoints) {
      return;
    }
    setPaths((prevPaths) => {
      const updatedPaths = [...prevPaths];
      const currentPath = updatedPaths[pathIndex];
      const newTotalPointsSpent = totalPointsSpent + (increment ? 1 : -1);
      if (
        (pointIndex === 0 || currentPath.points[pointIndex - 1]) &&
        !currentPath.points[pointIndex + 1] &&
        currentPath.points[pointIndex] !== increment
      ) {
        currentPath.points[pointIndex] = increment;
        currentPath.pointsSpent += increment ? 1 : -1;
        setTotalPointsSpent(newTotalPointsSpent);
      }
      updatedPaths[pathIndex] = currentPath;
      return updatedPaths;
    });
  };

  return (
    <div className="app">
      <div className="main-container">
        <div className="title">
          TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
        </div>
        <div className="talent-calculator-container">
          <div className="talent-calculator">
            {paths.map((path, index) => (
              <div key={index} className="talent-path-container">
                <div className="talent-path-label">{path.title}</div>
                <TalentPath
                  pathIndex={index}
                  path={path.points}
                  onPointChange={(pointIndex, increment) =>
                    handlePointChange(index, pointIndex, increment)
                  }
                  maxPointsReached={totalPointsSpent >= maxPoints}
                />
              </div>
            ))}
          </div>
          <div
            className={`points-spent ${
              totalPointsSpent === maxPoints ? "max-points" : ""
            }`}
          >
            {totalPointsSpent} / {maxPoints}
            <br />
            <span>Points Spent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
