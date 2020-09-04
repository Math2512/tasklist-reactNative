import { StyleSheet } from "react-native";
import { APP_COLORS } from "../../style/color";

export const style = StyleSheet.create({
  buttonChangeStatus: {
    backgroundColor: APP_COLORS.primaryAction,
    marginLeft: 2
  },
  buttonDelete: { backgroundColor: "red", marginRight: 2 },
  modal: {
    backgroundColor: "white",
    height: 180,
    justifyContent: "space-around"
  },
  buttonView: { flexDirection: "row", justifyContent: "center" },
  textView: { justifyContent: "center", alignItems: "center" }
});
