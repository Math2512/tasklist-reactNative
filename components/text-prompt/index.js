import React from "react";
import Prompt from "rn-prompt";

const TextPrompt = ({
  visibility,
  onCancelCallback,
  onSubmitCallback,
  defaultValue,
  placeHolder,
  title
}) => {
  return (
    <Prompt
      title={title}
      placeholder={placeHolder}
      defaultValue={defaultValue}
      visible={visibility}
      onCancel={() => onCancelCallback()}
      onSubmit={value => onSubmitCallback(value)}
    />
  );
};

export default TextPrompt;
