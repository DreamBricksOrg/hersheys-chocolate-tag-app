import React, { useEffect } from "react";
import { StyleSheet, useAnimatedValue, Animated } from "react-native";
import Shields from "../../assets/Shields.png";
import Logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/Routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../Constants";

type IOnboardingNavigationProps = StackNavigationProp<RootStackParamList>;

const duration = 500;

const Onboarding: React.FC = () => {
  const navigation = useNavigation<IOnboardingNavigationProps>();

  const shieldFadeAnim = useAnimatedValue(0);
  const logoFadeAnim = useAnimatedValue(0);
  const textFadeAnim = useAnimatedValue(0);

  const shieldFadeIn = () => {
    Animated.timing(shieldFadeAnim, {
      toValue: 1,
      duration: duration,
      delay: duration,
      useNativeDriver: true,
    }).start();
  };

  const logoFadeIn = () => {
    Animated.timing(logoFadeAnim, {
      toValue: 1,
      duration: duration,
      delay: duration * 2,
      useNativeDriver: true,
    }).start();
  };

  const textFadeIn = () => {
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: duration,
      delay: duration * 3,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace("ChocolateMonitoring");
      }, duration * 2);
    });
  };

  useEffect(() => {
    shieldFadeIn();
    logoFadeIn();
    textFadeIn();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image source={Shields} style={{ opacity: shieldFadeAnim }} />

      <Animated.Image
        source={Logo}
        style={[styles.logo, { opacity: logoFadeAnim }]}
      />

      <Animated.Text style={[styles.text, { opacity: textFadeAnim }]}>
        ONDE OS LADRÕESZINHOS DE CHOCOLATE NÃO TEM VEZ
      </Animated.Text>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brown,
    alignItems: "center",
    padding: 24,
  },
  logo: { marginTop: 150 },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.lightYellow,
    width: 310,
  },
});
