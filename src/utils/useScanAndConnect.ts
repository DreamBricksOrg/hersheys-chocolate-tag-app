import { useEffect } from "react";
import { BLEService } from "../services/BLEService";
import { Device } from "react-native-ble-plx";
import { withTimeout } from "./withTimeout";
import { useApp } from "../context/AppContext";
import { useMMKVString } from "react-native-mmkv";
import { STORAGE } from "../Constants";
import { useAppNavigation } from "./useAppNavigation";

const TAG_NAME = "iTAG";
const TIMEOUT = 60_000;

export const useScanAndConnect = () => {
  const navigation = useAppNavigation();

  const { updateTag } = useApp();
  const [_, setKnownTag] = useMMKVString(STORAGE.tagId);

  const searchForTag = async (): Promise<Device> => {
    const scanPromise = new Promise<Device>((resolve, reject) => {
      BLEService.scanDevices((device) => {
        if (device.localName?.toLowerCase() === TAG_NAME.toLowerCase()) {
          BLEService.stopDeviceScan();
          resolve(device);
        }
      });
    });

    return withTimeout<Device>(scanPromise, TIMEOUT);
  };

  const connectTag = async (tag: Device) => {
    const connectedTag = await BLEService.connectToDevice(tag.id, TIMEOUT);
    updateTag(connectedTag);
    setKnownTag(connectedTag.id);
  };

  const scanAndConnect = async () => {
    try {
      const tag = await searchForTag();

      await connectTag(tag);

      navigation.replace("ConnectionSuccess");
    } catch {
      navigation.replace("ConnectionError");
    }
  };

  useEffect(() => {
    scanAndConnect();
  }, []);
};
