import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import { COLORS } from "../Constants";
import { useApp } from "../context/AppContext";

type Props = {
  style?: ViewStyle;
};

const DISCONNECTED_MESSAGES = [
  "Volte para sua barra o mais rápido possível!",
  "Sua barra pode estar em perigo!",
] as const;

const ChocolateStatus: React.FC<Props> = ({ style }) => {
  const { tag } = useApp();

  const getDescription = (): string => {
    if (tag) {
      return "Aprecie sua barra Hershey's sem preocupações!";
    }

    const index = Math.floor(
      Math.random() * (DISCONNECTED_MESSAGES.length - 1)
    );
    return DISCONNECTED_MESSAGES[index];
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Status</Text>

      <View
        style={[
          styles.statusContainer,
          { backgroundColor: tag ? COLORS.brown : COLORS.orange },
        ]}
      >
        <Text style={styles.statusText}>
          {tag ? "BARRA PROTEGIDA" : "BARRA DESPROTEGIDA"}
        </Text>
      </View>

      <Text style={styles.statusDescription}>{getDescription()}</Text>
    </View>
  );
};

export default ChocolateStatus;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    color: COLORS.brown,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  statusContainer: {
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  statusText: {
    color: COLORS.lightYellow,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  statusDescription: {
    color: COLORS.brown,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    width: 190,
  },
});
