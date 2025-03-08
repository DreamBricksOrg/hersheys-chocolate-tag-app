import React from "react";
import * as Progress from "react-native-progress";
import { COLORS } from "../Constants";
import { ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
};

const AnimatedProgressBar: React.FC<Props> = ({ style }) => {
  return (
    <Progress.Bar
      indeterminate
      indeterminateAnimationDuration={2000}
      width={null}
      color={COLORS.orange}
      borderColor="transparent"
      useNativeDriver
      style={style}
    />
  );
};

export default AnimatedProgressBar;
