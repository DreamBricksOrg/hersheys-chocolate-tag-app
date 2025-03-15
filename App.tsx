import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import Routes from "./src/routes/Routes";
import { registerForPushNotificationsAsync } from "./src/services/notificationHelper";
import { AppProvider } from "./src/context/AppContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" translucent />
      <AppProvider>
        <Routes />
      </AppProvider>
    </SafeAreaProvider>
  );
}
