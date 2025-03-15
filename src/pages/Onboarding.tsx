import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, FONTS } from "../Constants";
import { useAppNavigation } from "../utils/useAppNavigation";
import Animated, { FadeIn, runOnJS } from "react-native-reanimated";
import Shields from "../../assets/Shields.png";
import HersheysSvg from "../../assets/Hersheys.svg";
import BarraAntifurtoSvg from "../../assets/BarraAntifurto.svg";
import AdtSvg from "../../assets/Adt.svg";

const DURATION = 500;

const Onboarding: React.FC = () => {
  const navigation = useAppNavigation();

  const handleAnimationFinished = () => {
    setTimeout(() => {
      navigation.navigate("ChocolateMonitoring");
    }, DURATION * 2);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Shields}
        entering={FadeIn.duration(DURATION)}
        style={styles.shield}
      />

      <View style={styles.imageContainer}>
        <Animated.View entering={FadeIn.delay(DURATION * 2).duration(DURATION)}>
          <HersheysSvg style={styles.absoluteImg} />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(DURATION * 3).duration(DURATION)}>
          <BarraAntifurtoSvg style={styles.absoluteImg} />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(DURATION * 4).duration(DURATION)}>
          <AdtSvg style={styles.absoluteImg} />
        </Animated.View>
      </View>

      <Animated.Text
        entering={FadeIn.delay(DURATION * 6)
          .duration(DURATION)
          .withCallback((finished) => {
            if (finished) {
              runOnJS(handleAnimationFinished)();
            }
          })}
        style={styles.text}
      >
        {`O bem mais precioso dos\n#BarraLovers nunca\nesteve tão protegido`}
      </Animated.Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brown,
    alignItems: "center",
    padding: 24,
    paddingTop: 64,
  },
  shield: { marginBottom: 150 },
  imageContainer: { height: 150, width: "100%" },
  absoluteImg: { position: "absolute", alignSelf: "center" },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.lightYellow,
    fontFamily: FONTS.sharpGrotesk,
    marginTop: 16,
  },
});
