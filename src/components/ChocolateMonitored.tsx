import React, { useCallback, useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import DeleteBarButton from "./DeleteBarButton";
import ChocolateStatus from "./ChocolateStatus";
import SpecialDark from "../../assets/SpecialDark.png";
import { useApp } from "../context/AppContext";
import { useMMKVString } from "react-native-mmkv";
import { STORAGE } from "../Constants";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  onDeletePress: () => void;
};

const MAX_RECONNECT_ATTEMPTS = 50;

const ChocolateMonitored: React.FC<Props> = ({ onDeletePress }) => {
  const { tag, attemptReconnection } = useApp();
  const [knowTagId] = useMMKVString(STORAGE.tagId);

  useFocusEffect(
    useCallback(() => {
      if (tag || !knowTagId) return;

      attemptReconnection(knowTagId, MAX_RECONNECT_ATTEMPTS);
    }, [tag])
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={SpecialDark} style={styles.chocolateImage}>
        <DeleteBarButton onPress={onDeletePress} />
      </ImageBackground>
      <ChocolateStatus style={{ marginVertical: 32 }} />
    </View>
  );
};

export default ChocolateMonitored;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chocolateImage: {
    flex: 1,
    aspectRatio: 0.4,
    alignSelf: "center",
    marginTop: 32,
  },
});
