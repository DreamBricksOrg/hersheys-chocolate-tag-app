import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../Constants";

type Props = {
  onPress: () => void;
};

const DeleteBarButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.button}
    >
      <View style={styles.dash} />
    </TouchableOpacity>
  );
};

export default DeleteBarButton;

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.orange,
    position: "absolute",
    top: -8,
    right: -16,
  },
  dash: {
    backgroundColor: COLORS.white,
    height: 3,
    width: 24,
  },
});
