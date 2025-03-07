import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../Constants";

type Props = {
  title: string;
  description: string;
};

const StepInstructions: React.FC<Props> = ({ title, description }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default StepInstructions;

const styles = StyleSheet.create({
  title: {
    color: COLORS.lightYellow,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center",
    width: 232,
  },
});
