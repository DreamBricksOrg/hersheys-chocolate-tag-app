import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useAnimatedValue, Animated } from "react-native";
import Shields from "../../assets/Shields.png";
import Onboard1 from "../../assets/Onboard1.png";
import Onboard2 from "../../assets/Onboard2.png";
import Onboard3 from "../../assets/Onboard3.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../Constants";
import { useAppNavigation } from "../utils/useAppNavigation";

const DURATION = 500;

const images = [Onboard1, Onboard2, Onboard3];

const Onboarding: React.FC = () => {
  const navigation = useAppNavigation();

  const shieldFadeAnim = useAnimatedValue(0);
  const logoFadeAnim = useAnimatedValue(0);
  const textFadeAnim = useAnimatedValue(0);

  const [imageIndex, setImageIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const shieldFadeIn = () => {
    Animated.timing(shieldFadeAnim, {
      toValue: 1,
      duration: DURATION,
      delay: DURATION,
      useNativeDriver: true,
    }).start();
  };

  // const logoFadeIn = () => {
  //   Animated.timing(logoFadeAnim, {
  //     toValue: 1,
  //     duration: DURATION,
  //     delay: DURATION * 2,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const textFadeIn = () => {
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: DURATION,
      delay: DURATION * 6,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace("ChocolateMonitoring");
      }, DURATION * 2);
    });
  };

  useEffect(() => {
    shieldFadeIn();
    // logoFadeIn();
    textFadeIn();
  }, []);

  useEffect(() => {
    let index = 0;

    intervalRef.current = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }).start(() => {
        index += 1;
        setImageIndex(index);
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (imageIndex === images.length - 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [imageIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image source={Shields} style={{ opacity: shieldFadeAnim }} />

      <Animated.Image
        source={images[imageIndex]}
        style={[styles.logo, { opacity: fadeAnim }]}
      />

      <Animated.Text style={[styles.text, { opacity: textFadeAnim }]}>
        {`O bem mais precioso dos\n#BarraLovers nunca\nesteve tão protegido`}
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
  logo: { marginTop: 150, width: 305, height: 150 },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.lightYellow,
    fontFamily: FONTS.sharpGrotesk,
    marginTop: 16,
  },
});
