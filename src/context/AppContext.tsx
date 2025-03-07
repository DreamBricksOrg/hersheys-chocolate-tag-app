import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useMMKVString } from "react-native-mmkv";
import { STORAGE } from "../Constants";
import { Device, Subscription } from "react-native-ble-plx";
import { BLEService } from "../services/BLEService";
import * as Notifications from "expo-notifications";

interface IAppContext {
  tag: Device | null;
  isTagKnown: boolean;
  updateTag: (tag: Device | null) => void;
}

const RECONNECT_DELAY_MS = 2000;
const MAX_RECONNECT_ATTEMPTS = 5;

const AppContext = createContext<IAppContext | undefined>(undefined);

const showDisconnectedNotification = () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Tag desconectada",
      body: "A tag foi desconectada do dispositivo!",
    },
    trigger: null,
  });
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tag, setTag] = useState<Device | null>(null);
  const [knowTagId] = useMMKVString(STORAGE.tagId);
  const reconnectAttempts = useRef(0);
  const disconnectSubscription = useRef<Subscription | null>(null);

  const updateTag = (newTag: Device | null) => {
    if (!newTag && tag) {
      BLEService.disconnectDeviceById(tag.id);
      disconnectSubscription.current?.remove();
    }

    setTag(newTag);
  };

  const startMonitoringDisconnection = (device: Device) => {
    console.log("Iniciando monitoramento de desconexão...");

    if (disconnectSubscription.current) {
      disconnectSubscription.current.remove();
    }

    disconnectSubscription.current = device.onDisconnected(() => {
      showDisconnectedNotification();
      disconnectSubscription.current?.remove();
      attemptReconnection(device.id);
      setTag(null);
    });
  };

  const attemptReconnection = async (deviceId: string) => {
    if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.warn(
        `Reconexão interrompida após ${reconnectAttempts} tentativas.`
      );
      return;
    }

    try {
      console.log(
        `Tentando reconectar ao iTag... Tentativa ${
          reconnectAttempts.current + 1
        }`
      );
      const device = await BLEService.connectToDevice(deviceId);
      console.log("Reconectado com sucesso:", device.id);

      setTag(device);
      reconnectAttempts.current = 0;
      //   startMonitoringDisconnection(device);
    } catch (error) {
      console.error("Erro ao tentar reconectar:", error);

      // Verifica o número de tentativas atualizado antes de reconectar
      if (reconnectAttempts.current + 1 < MAX_RECONNECT_ATTEMPTS) {
        console.log(`Agendando nova tentativa em ${RECONNECT_DELAY_MS}ms...`);
        reconnectAttempts.current += 1;
        setTimeout(() => attemptReconnection(deviceId), RECONNECT_DELAY_MS);
      } else {
        console.warn("Número máximo de tentativas de reconexão atingido.");
      }
    }
  };

  useEffect(() => {
    if (tag) {
      startMonitoringDisconnection(tag);
    }

    return () => {
      if (disconnectSubscription.current) {
        disconnectSubscription.current.remove();
      }
    };
  }, [tag]);

  return (
    <AppContext.Provider
      value={{
        tag,
        isTagKnown: !!knowTagId,
        updateTag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IAppContext => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
};
