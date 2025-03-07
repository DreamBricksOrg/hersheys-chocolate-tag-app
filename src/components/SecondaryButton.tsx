import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { COLORS } from "../Constants";

type Props = {
  title: string;
  loading?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

const SecondaryButton: React.FC<Props> = ({
  title,
  loading,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, style]}
    >
      {!loading && <Text style={styles.buttonText}>{title}</Text>}

      {loading && <ActivityIndicator color={COLORS.white} />}
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: COLORS.brown,
    borderRadius: 8,
    paddingVertical: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
