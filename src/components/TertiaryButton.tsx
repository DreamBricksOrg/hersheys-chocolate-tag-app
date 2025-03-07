import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { COLORS } from "../Constants";

type Props = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: ViewStyle;
};

const TertiaryButton: React.FC<Props> = ({
  title,
  outline = false,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: outline ? "transparent" : COLORS.orange },
        style,
      ]}
    >
      <Text
        style={[styles.text, { color: outline ? COLORS.orange : COLORS.white }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TertiaryButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.orange,
    borderRadius: 8,
  },
  text: {
    fontWeight: "700",
  },
});
