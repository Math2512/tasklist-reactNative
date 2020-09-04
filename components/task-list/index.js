import React from "react";
import { View } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import { TASK } from "../../model";
import { APP_COLORS } from "../../style/color";

const TaskList = ({ taskList, onPressCallback, onLongPressCallback }) => {
  return (
    <View>
      {taskList.map((item, i) => (
        <ListItem
          key={i}
          chevron={true}
          containerStyle={{ borderColor: "gainsboro", borderBottomWidth: 0.5 }}
          title={item.content}
          onPress={() => onPressCallback(item)}
          onLongPress={() => onLongPressCallback(item)}
          badge={{
            value: item.statut,
            badgeStyle: {
              backgroundColor: `${
                item.statut === TASK.doneStatus
                  ? APP_COLORS.lightPrimaryColor
                  : APP_COLORS.finish
              }`
            },
            padding: 10
          }}
        />
      ))}
    </View>
  );
};

export default TaskList;
