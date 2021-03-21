import React, { useState } from "react";
import TwoColorsInput from "./twoColorsInput/twoColorsInput";
import classNames from "classnames";
import infoIcon from "./info-icon.png";

import "./App.scss";

function App(): JSX.Element {
  const [value, setValue] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  /** Try to play with the parameters :) **/
  const color = "aqua";
  const startChars = "/";
  const endChars = "/";
  const infoText = `Different color from first '${startChars}' to the first '${endChars}' after it.`;
  const disabled = false;

  const createMarkup = () => {
    return { __html: `Try <font color=${color}>TwoColorsInput</font> !` };
  };

  return (
    <div className="App">
      <h2 dangerouslySetInnerHTML={createMarkup()}></h2>
      <div className="input-div">
        <div className="label-wrapper">
          <div className="label-and-info">
            <label
              className={classNames("label", {
                disabled,
              })}
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
          value={value}
          placeholder="Add your text here.."
          startChars="/"
          endChars="/"
          color={color}
          disabled={disabled}
          onChange={(textValue) => setValue(textValue)}
        />
      </div>
    </div>
  );
}

export default App;
