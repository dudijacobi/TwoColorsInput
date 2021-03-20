import React, { createRef, MouseEvent, RefObject, useState } from "react";
import classNames from "classnames";
import { CopyIcon } from "./copyIcon";
import { getPosition, setCaretPosition } from "./utils";

import "./twoColorsInput.scss";

export interface TwoColorsInputProps {
  name: string;
  color: string;
  startChars: string;
  endChars: string;
  label?: string;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  info?: string;
  enableCopy?: boolean;
  errorMessage?: string;
  onChange: (textValue: string) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const TwoColorsInput = (props: TwoColorsInputProps): JSX.Element => {
  const input: RefObject<HTMLSpanElement> = createRef();
  const [colorStartIndex, setColorStartIndex] = useState(-1);
  const [colorEndIndex, setColorEndIndex] = useState(-1);
  const [showCopyPopUp, setShowCopyPopUp] = useState(false);

  const copyInputValue = (): void => {
    if (!input.current) return;
    navigator.clipboard.writeText(input.current.innerText);
    setCaretPosition(input.current, input.current.innerText.length);

    setShowCopyPopUp(true);
    setTimeout(() => {
      setShowCopyPopUp(false);
    }, 2000);
  };

  const updateColoredValue = (withPosition?: boolean) => {
    if (!input.current) {
      return;
    }

    let pos = 0;
    if (withPosition) {
      pos = getPosition(input.current);
    }

    const target = input.current;
    const textValue = target.innerText;
    let coloredValue = "";

    if (colorStartIndex > 0 && colorStartIndex < target.innerHTML.length) {
      coloredValue = `${textValue.substring(0, colorStartIndex)}<font color="${
        props.color
      }">${textValue.substring(
        colorStartIndex,
        colorEndIndex > 0 ? colorEndIndex : undefined
      )}</font>`;
    }

    if (coloredValue && colorEndIndex > 0) {
      coloredValue += textValue.substring(colorEndIndex);
    }

    if (coloredValue) {
      target.innerHTML = coloredValue;
      if (input.current && pos) {
        setCaretPosition(input.current, pos);
      }
    }
  };

  const onInput = () => {
    if (!props.onChange || !input.current) {
      return;
    }
    props.onChange(input.current.innerText);

    if (input.current.innerText.length <= 0) {
      setColorStartIndex(-1);
      setColorEndIndex(-1);
      return;
    }

    const { startChars, endChars } = props;
    const startIndex = input.current.innerText.indexOf(startChars);
    const endIndex = input.current.innerText
      .substring(startIndex + startChars.length)
      .indexOf(endChars);

    if (startIndex >= 0) {
      setColorStartIndex(startIndex + startChars.length);
    }
    setColorEndIndex(
      endIndex >= 0 ? startIndex + startChars.length + endIndex : 0
    );

    updateColoredValue(true);
  };

  return (
    <div className={classNames("two-colors-input", props.wrapperClassName)}>
      {props.label && (
        <div className="label-wrapper">
          <div className="label-and-info">
            <label
              className={classNames("label", {
                disabled: props.disabled,
              })}
              htmlFor={props.name}
            >
              {props.label}
            </label>
            {/* {props.info && <Info text={props.info} />} */}
          </div>
        </div>
      )}
      <div className="two-colors-input-value-wrapper">
        <span
          ref={input}
          placeholder={props.placeholder}
          className={classNames("two-colors-input-value", props.inputClassName)}
          onInput={onInput}
          contentEditable
        />
        {props.enableCopy && (
          <div className="copy-wrapper" onClick={copyInputValue}>
            <CopyIcon />
            <span className={classNames("copy-popup", { show: showCopyPopUp })}>
              Copied!
            </span>
          </div>
        )}
      </div>
      {props.errorMessage && (
        <span className="err-msg">{props.errorMessage}</span>
      )}
    </div>
  );
};

export default TwoColorsInput;
