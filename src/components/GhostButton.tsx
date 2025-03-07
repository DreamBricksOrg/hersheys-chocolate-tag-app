import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../Constants";

type Props = {
  title: string;
  onPress: () => void;
};

const GhostButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.button}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default GhostButton;

const styles = StyleSheet.create({
  button: {
    width: 156,
    borderRadius: 8,
    paddingVertical: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: COLORS.lightYellow,
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "700",
  },
});
