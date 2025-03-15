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

export const NOTIFICATION_MESSAGES = [
  {
    title: "🚨BARRA FORA DE ALCANCE 🚨",
    message:
      "Movimento suspeito detectado! Pelo visto, você não é o único Barra Lover por aqui.",
  },
  {
    title: "⛑️SEU HERSHEY'S ESTÁ EM PERIGO! ⛑️",
    message:
      "Alguém ama sua barra tanto quanto você. Corra pra recuperá-la (e dê um pedacinho pelo resgate).",
  },
  {
    title: "❗️😰ALERTA: BARRA EM APUROS❗️😰",
    message:
      "Corra! Seu Hershey's corre perigo de ser DEVORADO LENTAMENTE POR OUTRO BARRA LOVER 🍫",
  },
  {
    title: "🆘SALVE SEU HERSHEY'S! 🆘",
    message:
      "Sua barra está prestes a ser deliciada por algum outro Barra Lover. Corra para impedir esse choco-crime!",
  },
  {
    title: "👀CADÊ A BARRA QUE TAVA AQUI? 👀",
    message:
      "Seu bem mais precioso está em perigo! Salve sua barra Hershey’s antes que seja tarde demais 😭",
  },
  {
    title: "🫨MOVIMENTO SUSPEITO DETECTADO 🫨",
    message:
      "Parece que sua barra Hershey's está se movendo… em direção à outra boca. Você precisa agir AGORA!",
  },
  {
    title: "👀BARRA HERSHEY'S SOB AMEAÇA 👀",
    message:
      "Alguém pode estar fugindo com a sua barra com segundas intenções 😰Cuidado!",
  },
  {
    title: "😱SEGURA ESSA BARRA! 😱",
    message:
      "Sua barra Hershey's pode estar nas mãos de outro Barra Lover! Corra para protegê-la! Ou dividi-la 🤝",
  },
];
