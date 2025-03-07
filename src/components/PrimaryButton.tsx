import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../Constants";

type Props = {
  title: string;
  loading?: boolean;
  onPress: () => void;
};

const PrimaryButton: React.FC<Props> = ({
  title,
  loading = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.button}
    >
      {!loading && <Text style={styles.title}>{title}</Text>}

      {loading && <ActivityIndicator color={COLORS.brown} />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: 156,
    backgroundColor: COLORS.lightYellow,
    borderRadius: 8,
    paddingVertical: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: COLORS.brown,
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "700",
  },
});
