import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import ErrorImg from "../../assets/Error.png";
import { COLORS } from "../Constants";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/Routes";

type IConnectionErrorScreenNavigationProps =
  StackNavigationProp<RootStackParamList>;

const ConnectionErrorScreen: React.FC = () => {
  const navigation = useNavigation<IConnectionErrorScreenNavigationProps>();

  const handleTryAgain = () => {
    navigation.replace("Pairing");
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={ErrorImg} style={{ marginBottom: 24 }} />

        <Text style={styles.title}>ERRO DE PAREAMENTO</Text>

        <Text style={styles.description}>
          Sua tag não pode ser encontrada. Tente conectar novamente.
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleTryAgain}
      >
        <Text style={styles.buttonText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightYellow,
    padding: 16,
    alignItems: "center",
  },
  body: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontWeight: "700",
    fontSize: 28,
    color: COLORS.brown,
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
