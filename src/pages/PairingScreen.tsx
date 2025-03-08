import React from "react";
import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { COLORS } from "../Constants";
import { SafeAreaView } from "react-native-safe-area-context";
import SpecialDark from "../../assets/SpecialDark.png";

import { useScanAndConnect } from "../utils/useScanAndConnect";
import AnimatedProgressBar from "../components/AnimatedProgressBar";

const PairingScreen: React.FC = () => {
  useScanAndConnect();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={SpecialDark} style={styles.image} />

      <AnimatedProgressBar style={styles.progressBar} />

      <Text style={styles.title}>Pareando</Text>
    </SafeAreaView>
  );
};

export default PairingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brown,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: COLORS.lightYellow,
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  image: {
    width: 74,
    height: 182,
  },
  progressBar: {
    width: "100%",
    marginTop: 42,
    marginBottom: 16,
  },
});
