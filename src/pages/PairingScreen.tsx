import React, { useEffect } from "react";
import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { COLORS } from "../Constants";
import { SafeAreaView } from "react-native-safe-area-context";
import SpecialDark from "../../assets/SpecialDark.png";
import * as Progress from "react-native-progress";
import { useBle } from "../../useBle";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/Routes";
import { useNavigation } from "@react-navigation/native";

type IPairingScreenNavigationProps = StackNavigationProp<RootStackParamList>;

const DIMENSIONS = Dimensions.get("screen");

const PairingScreen: React.FC = () => {
  const navigation = useNavigation<IPairingScreenNavigationProps>();
  const ble = useBle();

  const handleDeviceConnected = () => {
    navigation.replace("ConnectionSuccess");
  };

  const handleConnectionError = () => {
    navigation.replace("ConnectionError");
  };

  const startScan = () => {
    try {
      ble.scanAndConnect({
        onDeviceConnected: handleDeviceConnected,
        onError: handleConnectionError,
      });
    } catch (error) {
      handleConnectionError();
    }
  };

  useEffect(() => {
    startScan();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={SpecialDark} style={styles.image} />

      <Progress.Bar
        indeterminate
        indeterminateAnimationDuration={2000}
        width={DIMENSIONS.width}
        color={COLORS.orange}
        borderColor="transparent"
        useNativeDriver
        style={styles.progressBar}
      />

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
