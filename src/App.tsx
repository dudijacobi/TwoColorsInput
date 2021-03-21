import React, { useState } from "react";
import TwoColorsInput from "./twoColorsInput/twoColorsInput";
import classNames from "classnames";
import infoIcon from "./info-icon.png";

import "./App.scss";

function App(): JSX.Element {
  const [value, setValue] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const name = "test-input";
  const disabled = false;
  const startChars = "/";
  const endChars = "/";
  const infoText = `Different color from first '${startChars}' to the first '${endChars}' after it.`;

  return (
    <div className="App">
      <h1>Test</h1>
      <div className="input-div">
        <div className="label-wrapper">
          <div className="label-and-info">
            <label
              className={classNames("label", {
                disabled,
              })}
              htmlFor={name}
            >
              Label
            </label>
            <img
              className="info-icon"
              src={infoIcon}
              onMouseOver={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            />
            {showInfo && (
              <div className="info-wrapper">
                <i className="info">{infoText}</i>
              </div>
            )}
          </div>
        </div>
        <TwoColorsInput
          name={name}
          value={value}
          placeholder="Placeholder"
          startChars="/"
          endChars="/"
          color="aqua"
          disabled={disabled}
          onChange={(textValue) => setValue(textValue)}
        />
      </div>
    </div>
  );
}

export default App;
