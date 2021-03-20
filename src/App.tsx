import React, { useState } from "react";
import TwoColorsInput from "./twoColorsInput/twoColorsInput";
import "./App.scss";

function App(): JSX.Element {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <h1>Test</h1>
      <TwoColorsInput
        name="test-input"
        label="Label"
        placeholder="Placeholder"
        startChars="/@"
        endChars="/"
        color="aqua"
        // enableCopy
        onChange={(textValue) => setValue(textValue)}
      />
    </div>
  );
}

export default App;
