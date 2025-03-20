import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import GhostButton from "../components/GhostButton";
import PrimaryButton from "../components/PrimaryButton";
import StepIndicator from "../components/StepIndicator";
import StepInstructions from "../components/StepInstructions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../Constants";
import { BLEService } from "../services/BLEService";
import { State } from "react-native-ble-plx";
import { useAppNavigation } from "../utils/useAppNavigation";

const showErrorToast = (text: string) => {
  Toast.show({
    type: "error",
    text1: text,
    position: "bottom",
  });
};

const InstructionsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const checkBluetoothStatus = async (): Promise<boolean> => {
    const hasPermission = await BLEService.requestBluetoothPermission();

    if (!hasPermission) {
      showErrorToast("Forneça permissão para utilizar bluetooth");
      return false;
    }

    let isActive = false;

    try {
      const status = await BLEService.getState();

      isActive = status === State.PoweredOn;

      if (!isActive) {
        showErrorToast("Por favor, ative o bluetooth antes de continuar");
        return false;
      }
    } catch (error) {
      showErrorToast("Verifique se o bluetooth está ativo");
      return false;
    }

    return isActive && hasPermission;
  };

  const handleContinuePress = async () => {
    const isBluetoothReady = await checkBluetoothStatus();

    if (!isBluetoothReady) return;

    navigation.navigate("Pairing");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.brown,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>COMO PROTEGER SUA BARRA HERSHEY’S</Text>

        <StepIndicator step={1} />

        <StepInstructions
          title="Ligue o bluetooth do seu telefone"
          description="Dá uma olhadinha se o seu bluetooth tá ligado mesmo."
        />

        <StepIndicator step={2} />

        <StepInstructions
          title="Faça o pareamento"
          description="Não esqueça que é a sua amada barra que está em jogo!"
        />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          <GhostButton title="Voltar" onPress={handleGoBack} />

          <PrimaryButton title="Continuar" onPress={handleContinuePress} />
        </View>

        <Toast />
      </View>
    </ScrollView>
  );
};

export default InstructionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brown,
    alignItems: "center",
    gap: 24,
    padding: 16,
  },
  title: {
    color: COLORS.lightYellow,
    fontWeight: "700",
    fontSize: 28,
    textAlign: "center",
    marginTop: 54,
  },
});
