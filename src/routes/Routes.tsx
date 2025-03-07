import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../pages/Onboarding";
import InstructionsScreen from "../pages/InstructionsScreen";
import ConnectionErrorScreen from "../pages/ConnectionErrorScreen";
import ConnectedDeviceScreen from "../pages/ConnectedDeviceScreen";
import ChocolateMonitoring from "../pages/ChocolateMonitoring";
import PairingScreen from "../pages/PairingScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  Instructions: undefined;
  ConnectionSuccess: undefined;
  ConnectionError: undefined;
  ChocolateMonitoring: undefined;
  Pairing: undefined;
};

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen
          name="ConnectionSuccess"
          component={ConnectedDeviceScreen}
        />
        <Stack.Screen
          name="ConnectionError"
          component={ConnectionErrorScreen}
        />
        <Stack.Screen
          name="ChocolateMonitoring"
          component={ChocolateMonitoring}
        />
        <Stack.Screen name="Pairing" component={PairingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
