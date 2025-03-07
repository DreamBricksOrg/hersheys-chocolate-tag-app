import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import GhostButton from "../components/GhostButton";
import PrimaryButton from "../components/PrimaryButton";
import StepIndicator from "../components/StepIndicator";
import StepInstructions from "../components/StepInstructions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/Routes";
import { COLORS } from "../Constants";
import { BLEService } from "../services/BLEService";

type IInstructionsScreenNavigationProps =
  StackNavigationProp<RootStackParamList>;

const InstructionsScreen: React.FC = () => {
  const navigation = useNavigation<IInstructionsScreenNavigationProps>();
  const insets = useSafeAreaInsets();

  const handleContinuePress = async () => {
    const hasPermission = await BLEService.requestBluetoothPermission();

    if (hasPermission) {
      navigation.navigate("Pairing");
    }
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
          title="Identifique a tag de sua barra"
          description='É esse aparelho "HERSHIELD” mesmo, viu?'
        />

        <StepIndicator step={3} />

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
    gap: 16,
    padding: 16,
  },
  title: {
    color: COLORS.lightYellow,
    fontWeight: "700",
    fontSize: 28,
    textAlign: "center",
    marginTop: 74,
  },
});
