import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Success from "../../assets/Success.png";
import { COLORS } from "../Constants";
import { useAppNavigation } from "../utils/useAppNavigation";

const ConnectedDeviceScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const handleViewChocolate = () => {
    navigation.replace("ChocolateMonitoring");
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={Success} style={{ marginBottom: 24 }} />

        <Text style={styles.title}>Sua barra finalmente está protegida!</Text>

        <Text style={styles.description}>
          Sua tag está conectada e pronta para proteger seu chocolate.
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleViewChocolate}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ver minha barra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectedDeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orange,
    padding: 16,
    alignItems: "center",
  },
  body: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontWeight: "700",
    fontSize: 32,
    color: COLORS.white,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.brown,
    textAlign: "center",
    marginTop: 24,
    width: 236,
  },
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
