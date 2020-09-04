import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import { style } from "./style";

const MenuTask = ({
  visibility,
  onDisapearCallBack,
  onDeleteCallback,
  onChangeCallback
}) => {
  return (
    <View>
      <Modal
        isVisible={visibility}
        animationIn={"zoomInDown"}
        animationOut={"zoomOutUp"}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        onBackdropPress={() => onDisapearCallBack()}
      >
        <View style={style.modal}>
          <View style={style.textView}>
            <Text>Que souhaitez vous faire sur la tâche</Text>
          </View>
          <View style={style.buttonView}>
            <Button
              buttonStyle={style.buttonDelete}
              title="Supprimmer"
              onPress={() => onDeleteCallback()}
            />
            <Button
              buttonStyle={style.buttonChangeStatus}
              title="Changer Statut"
              onPress={() => onChangeCallback()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuTask;
