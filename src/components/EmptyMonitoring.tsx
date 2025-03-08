import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Chocolate from "../../assets/Chocolate.png";
import SecondaryButton from "./SecondaryButton";
import { useAppNavigation } from "../utils/useAppNavigation";

const EmptyMonitoring: React.FC = () => {
  const navigation = useAppNavigation();

  const handleAddChocolate = () => {
    navigation.navigate("Instructions");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Chocolate} />
      </View>

      <SecondaryButton
        title="adicionar barra de chocolate"
        onPress={handleAddChocolate}
        style={styles.button}
      />
    </View>
  );
};

export default EmptyMonitoring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: "auto",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
