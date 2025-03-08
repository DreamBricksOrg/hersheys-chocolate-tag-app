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
  attemptReconnection: (
    deviceId: string,
    maxAttempts?: number
  ) => Promise<void>;
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
  const disableAutoConnect = useRef(false);

  const updateTag = (newTag: Device | null) => {
    if (!newTag && tag) {
      disconnectSubscription.current?.remove();
      try {
        BLEService.disconnectDeviceById(tag.id);
      } catch (error) {
        console.log("Falha ao desconectar dispositivo:", error);
      }
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
      setTag(null);
    });
  };

  const attemptReconnection = async (
    deviceId: string,
    maxAttempts = MAX_RECONNECT_ATTEMPTS
  ) => {
    console.log("disableAutoConnect status:", disableAutoConnect.current);

    if (disableAutoConnect.current) {
      console.log(
        `Reconexão automática desativada, tentativa de reconexão encerrada.`
      );
      return;
    }

    if (reconnectAttempts.current >= maxAttempts) {
      console.log(
        `Reconexão interrompida após ${reconnectAttempts} tentativas.`
      );

      reconnectAttempts.current = 0;
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
    } catch (error) {
      console.log("Erro ao tentar reconectar:", error);

      if (reconnectAttempts.current + 1 < maxAttempts) {
        console.log(`Agendando nova tentativa em ${RECONNECT_DELAY_MS}ms...`);
        reconnectAttempts.current += 1;
        setTimeout(
          () => attemptReconnection(deviceId, maxAttempts),
          RECONNECT_DELAY_MS
        );
      } else {
        reconnectAttempts.current = 0;
        console.log("Número máximo de tentativas de reconexão atingido.");
      }
    }
  };

  useEffect(() => {
    if (tag) {
      disableAutoConnect.current = false;
      startMonitoringDisconnection(tag);
    }

    return () => {
      if (disconnectSubscription.current) {
        disconnectSubscription.current.remove();
      }
    };
  }, [tag]);

  useEffect(() => {
    if (!knowTagId) {
      disableAutoConnect.current = true;
    }
  }, [knowTagId]);

  return (
    <AppContext.Provider
      value={{
        tag,
        isTagKnown: !!knowTagId,
        updateTag,
        attemptReconnection,
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
