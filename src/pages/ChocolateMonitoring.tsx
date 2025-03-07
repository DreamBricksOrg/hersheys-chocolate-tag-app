import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, STORAGE } from "../Constants";
import SecondaryButton from "../components/SecondaryButton";
import Chocolate from "../../assets/Chocolate.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/Routes";
import ChocolateStatus from "../components/ChocolateStatus";
import SpecialDark from "../../assets/SpecialDark.png";
import DeleteBarButton from "../components/DeleteBarButton";
import { useApp } from "../context/AppContext";
import { useMMKVString } from "react-native-mmkv";
import TertiaryButton from "../components/TertiaryButton";

type IChocolateMonitoringNavigationProps =
  StackNavigationProp<RootStackParamList>;

const ChocolateMonitoring: React.FC = () => {
  const navigation = useNavigation<IChocolateMonitoringNavigationProps>();
  const [_, setKnownTag] = useMMKVString(STORAGE.tagId);
  const { isTagKnown, updateTag } = useApp();

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleAddChocolate = () => {
    navigation.navigate("Instructions");
  };

  const handleConfirmRemoveChocolate = () => {
    setKnownTag("");
    updateTag(null);
    setShowRemoveModal(false);
  };

  const handleCancelRemoveChocolate = () => {
    setShowRemoveModal(false);
  };

  const showRemoveChocolateModal = () => {
    setShowRemoveModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Central de chocovigilância</Text>

      <Text style={styles.description}>
        Confira o nível de segurança da sua barra cadastrada 24 horas por dia.
      </Text>

      {!isTagKnown && (
        <>
          <View style={styles.imageContainer}>
            <Image source={Chocolate} />
          </View>

          <SecondaryButton
            title="adicionar barra de chocolate"
            onPress={handleAddChocolate}
            style={styles.button}
          />
        </>
      )}

      {isTagKnown && (
        <>
          <ImageBackground source={SpecialDark} style={styles.chocolateImage}>
            <DeleteBarButton onPress={showRemoveChocolateModal} />
          </ImageBackground>
          <ChocolateStatus style={{ marginVertical: 32 }} />
        </>
      )}

      <Modal visible={showRemoveModal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000024",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: COLORS.brown,
              padding: 24,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: COLORS.gray,
                borderRadius: 8,
                alignSelf: "center",
                marginBottom: 16,
              }}
            />

            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: COLORS.white,
                marginBottom: 16,
              }}
            >
              Você deseja remover essa barra?
            </Text>

            <Text style={{ fontSize: 14, color: COLORS.white }}>
              Se você já devorou sua barra, remova ela e adicione outra barra
              Hershey's.
            </Text>

            <TertiaryButton
              title="SIM"
              onPress={handleConfirmRemoveChocolate}
              style={{ marginBottom: 8, marginTop: 24 }}
            />

            <TertiaryButton
              outline
              title="NÃO"
              onPress={handleCancelRemoveChocolate}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChocolateMonitoring;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightYellow, padding: 24 },
  title: {
    textTransform: "uppercase",
    color: COLORS.brown,
    fontWeight: "700",
    fontSize: 32,
    textAlign: "center",
  },
  description: {
    color: COLORS.brown,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    marginTop: "auto",
  },
  chocolateImage: {
    flex: 1,
    aspectRatio: 0.4,
    alignSelf: "center",
    marginTop: 32,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
