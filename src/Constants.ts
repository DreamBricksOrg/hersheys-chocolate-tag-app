import { Platform } from "react-native";

export const COLORS = {
  brown: "#452F2A",
  lightYellow: "#F6E2AB",
  orange: "#EA5A0B",
  white: "#FFFFFF",
  gray: "#CCCCCC",
};

export const STORAGE = {
  tagId: "@teste:tagId",
};

export const FONTS = {
  sharpGrotesk:
    Platform.OS === "android" ? "SharpGrotesk" : "SharpGroteskTRIALLight-25",
};
