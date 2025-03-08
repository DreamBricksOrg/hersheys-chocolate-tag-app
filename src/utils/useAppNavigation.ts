import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp, RootStackParamList } from "../routes/Routes";

export function useAppNavigation<T extends keyof RootStackParamList>() {
  return useNavigation<RootStackNavigationProp<T>>();
}
