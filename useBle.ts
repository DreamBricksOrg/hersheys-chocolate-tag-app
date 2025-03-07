import { useEffect, useRef, useState } from "react";
import { BleError, Device, DeviceId, Subscription } from "react-native-ble-plx";
import { BLEService } from "./src/services/BLEService";
import * as Notifications from "expo-notifications";
import { useApp } from "./src/context/AppContext";
import { useMMKVString } from "react-native-mmkv";
import { STORAGE } from "./src/Constants";

const showDisconnectedNotification = () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Tag desconectada",
      body: "A tag foi desconectada do dispositivo!",
    },
    trigger: null,
  });
};

type IScanAndConnectProps = {
  onDeviceFound?: () => void;
  onDeviceConnected?: () => void;
  onError?: () => void;
};

const TIMEOUT = 120_000;

export const useBle = () => {
  const { tag, updateTag } = useApp();
  const deviceDisconnectedSubscription = useRef<Subscription | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [_, setKnownTag] = useMMKVString(STORAGE.tagId);

  const clearScanTimeout = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
  };

  const setupScanTimeout = (onTimeout: () => void) => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    scanTimeoutRef.current = setTimeout(() => {
      onTimeout();
    }, TIMEOUT);
  };

  const disconnectedListener = (
    error: BleError | null,
    device: Device | null
  ) => {
    if (error) {
      console.error(JSON.stringify(error, null, 4));
    }

    if (device) {
      showDisconnectedNotification();
      updateTag(null);
      if (deviceDisconnectedSubscription.current) {
        deviceDisconnectedSubscription.current.remove();
      }
      deviceDisconnectedSubscription.current = null;
      device.connect({
        timeout: TIMEOUT,
      });
      // handleConnectToDevice(device.id);
    }
  };

  const setupOnDeviceDisconnected = (deviceId: string) => {
    deviceDisconnectedSubscription.current = BLEService.onDeviceDisconnected(
      deviceId,
      disconnectedListener
    );
  };

  const handleConnectToDevice = async (
    deviceId: DeviceId,
    onDeviceConnected?: () => void
  ) => {
    const connectedDevice = await BLEService.connectToDevice(deviceId, TIMEOUT);
    updateTag(connectedDevice);
    setKnownTag(connectedDevice.id);
    // setupOnDeviceDisconnected(connectedDevice.id);

    if (onDeviceConnected) {
      onDeviceConnected();
    }
  };

  function scanAndConnect({
    onDeviceFound,
    onDeviceConnected,
    onError,
  }: IScanAndConnectProps) {
    try {
      if (onError) {
        setupScanTimeout(onError);
      }

      BLEService.scanDevices((device) => {
        if (device.localName === "iTAG") {
          clearScanTimeout();
          BLEService.stopDeviceScan();

          if (onDeviceFound) {
            onDeviceFound();
          }

          handleConnectToDevice(device.id, onDeviceConnected).catch(() => {
            console.log("Caiu no catch");
            if (onError) {
              onError();
            }
          });
        }
      });
    } catch {
      if (onError) {
        onError();
      }
    }
  }

  const handleDisconnectDevice = async () => {
    if (!tag) return;

    BLEService.disconnectDeviceById(tag.id);
    updateTag(null);
  };

  useEffect(() => {
    BLEService.initializeBLE();
  }, []);

  return {
    tag,
    scanAndConnect,
    handleDisconnectDevice,
    handleConnectToDevice,
  };
};
