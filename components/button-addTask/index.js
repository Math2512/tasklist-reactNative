import React from "react";
import { Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import { APP_COLORS } from "../../style/color";

const ButtonAddTask = ({ onPressCallback }) => {
  return (
    <ActionButton
      buttonColor={APP_COLORS.primaryAction}
      RenderIcon={<Icon color={APP_COLORS.text} name={"add"} />}
      onPress={() => onPressCallback()}
    />
  );
};

function onPress() {
  console.log("add");
}
export default ButtonAddTask;
