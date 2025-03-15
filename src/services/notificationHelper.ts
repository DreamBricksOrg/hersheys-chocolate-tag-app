import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { NOTIFICATION_MESSAGES } from "../Constants";

const getRandomNotificationData = () => {
  const index = Math.floor(Math.random() * NOTIFICATION_MESSAGES.length);
  return NOTIFICATION_MESSAGES[index];
};

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Acesse as configurações e forneça permissão para notificações!");
    return;
  }

  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
}

export async function showDisconnectNotification() {
  const data = getRandomNotificationData();

  Notifications.scheduleNotificationAsync({
    content: {
      title: data.title,
      body: data.message,
    },
    trigger: null,
  });
}
