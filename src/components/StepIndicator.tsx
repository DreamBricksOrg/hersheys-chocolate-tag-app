import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../Constants";

type Props = {
  step: number;
};

const StepIndicator: React.FC<Props> = ({ step }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${step}º`}</Text>
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    height: 46,
    width: 46,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
