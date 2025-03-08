import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../Constants";
import { useApp } from "../context/AppContext";
import EmptyMonitoring from "../components/EmptyMonitoring";
import ChocolateMonitored from "../components/ChocolateMonitored";
import RemoveChocolateModal from "../components/RemoveChocolateModal";

const ChocolateMonitoring: React.FC = () => {
  const { isTagKnown } = useApp();

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const showRemoveChocolateModal = () => {
    setShowRemoveModal(true);
  };

  const handleDismissRemoveModal = () => {
    setShowRemoveModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Central de chocovigilância</Text>

      <Text style={styles.description}>
        Confira o nível de segurança da sua barra cadastrada 24 horas por dia.
      </Text>

      {isTagKnown ? (
        <ChocolateMonitored onDeletePress={showRemoveChocolateModal} />
      ) : (
        <EmptyMonitoring />
      )}

      <RemoveChocolateModal
        visible={showRemoveModal}
        onDismiss={handleDismissRemoveModal}
      />
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
});
