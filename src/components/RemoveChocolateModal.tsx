import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import { COLORS, STORAGE } from "../Constants";
import TertiaryButton from "./TertiaryButton";
import { useMMKVString } from "react-native-mmkv";
import { useApp } from "../context/AppContext";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

const RemoveChocolateModal: React.FC<Props> = ({ visible, onDismiss }) => {
  const [_, setKnownTag] = useMMKVString(STORAGE.tagId);
  const { updateTag } = useApp();

  const handleConfirmRemoveChocolate = () => {
    setKnownTag("");
    updateTag(null);
    onDismiss();
  };

  const handleCancelRemoveChocolate = () => {
    onDismiss();
  };

  return (
    <Modal visible={visible} transparent>
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
  );
};

export default RemoveChocolateModal;
