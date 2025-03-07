import {
  BleError,
  BleErrorCode,
  BleManager,
  Device,
  State as BluetoothState,
  LogLevel,
  type DeviceId,
  type UUID,
} from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";
import Toast from "react-native-toast-message";

class BLEServiceInstance {
  manager: BleManager;

  constructor() {
    this.manager = new BleManager();
  }

  isITagKnown = async (): Promise<boolean> => {
    try {
      const knownDevices: Device[] = await this.manager.devices([]);

      const iTagDevice = knownDevices.find(
        (device) =>
          device.name?.toLowerCase().includes("itag") ||
          device.localName?.toLowerCase().includes("itag")
      );

      return iTagDevice !== undefined;
    } catch (error) {
      console.error("Erro ao buscar dispositivos conhecidos:", error);
      return false;
    }
  };

  initializeBLE = () =>
    new Promise<void>((resolve) => {
      const subscription = this.manager.onStateChange((state) => {
        switch (state) {
          case BluetoothState.Unsupported:
            this.showErrorToast("");
            break;
          case BluetoothState.PoweredOff:
            this.onBluetoothPowerOff();

            this.manager.enable().catch((error: BleError) => {
              console.log(error);
              if (error.errorCode === BleErrorCode.BluetoothUnauthorized) {
                this.requestBluetoothPermission();
              }
            });
            break;
          case BluetoothState.Unauthorized:
            this.requestBluetoothPermission();
            break;
          case BluetoothState.PoweredOn:
            resolve();
            subscription.remove();
            break;
          default:
            console.error("Unsupported state: ", state);
          // resolve()
          // subscription.remove()
        }
      }, true);
    });

  disconnectDeviceById = async (id: DeviceId) => {
    try {
      await this.manager.cancelDeviceConnection(id);
      this.showSuccessToast("Device disconnected");
    } catch (error) {
      if (error?.code !== BleErrorCode.DeviceDisconnected) {
        this.onError(error);
      }
    }
  };

  onBluetoothPowerOff = () => {
    this.showErrorToast("O bluetooth está desativado");
  };

  scanDevices = async (
    onDeviceFound: (device: Device) => void,
    UUIDs: UUID[] | null = null,
    legacyScan?: boolean
  ) => {
    this.manager
      .startDeviceScan(UUIDs, { legacyScan }, (error, device) => {
        if (error) {
          this.onError(error);
          console.error(error.message);
          this.manager.stopDeviceScan();
          return;
        }
        if (device) {
          onDeviceFound(device);
        }
      })
      .catch(console.error);
  };

  stopDeviceScan = () => {
    this.manager.stopDeviceScan();
  };

  connectToDevice = (deviceId: DeviceId, timeout?: number) => {
    this.manager.stopDeviceScan();
    return this.manager.connectToDevice(deviceId, { timeout });
  };

  isDeviceConnected = (deviceId: DeviceId) => {
    return this.manager.isDeviceConnected(deviceId);
  };

  // getConnectedDevices = async (expectedServices: UUID[]) => {
  //   try {
  //     return await this.manager.connectedDevices(expectedServices);
  //   } catch (error_1) {
  //     this.onError(error_1);
  //   }
  // };

  onDeviceDisconnected = (
    deviceId: Device["id"],
    listener: (error: BleError | null, device: Device | null) => void
  ) => {
    return this.manager.onDeviceDisconnected(deviceId, listener);
  };

  enable = () =>
    this.manager.enable().catch((error) => {
      this.onError(error);
    });

  disable = () =>
    this.manager.disable().catch((error) => {
      this.onError(error);
    });

  getState = () =>
    this.manager.state().catch((error) => {
      this.onError(error);
    });

  onError = (error: BleError) => {
    switch (error.errorCode) {
      case BleErrorCode.BluetoothUnauthorized:
        this.requestBluetoothPermission();
        break;
      case BleErrorCode.LocationServicesDisabled:
        this.showErrorToast("Location services are disabled");
        break;
      default:
        this.showErrorToast(JSON.stringify(error, null, 4));
    }
  };

  requestBluetoothPermission = async () => {
    if (Platform.OS === "ios") {
      return true;
    }

    if (Platform.OS === "android") {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (
        apiLevel < 31 &&
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }

    this.showErrorToast("Permissão para utilizar bluetooth negada");

    return false;
  };

  showErrorToast = (error: string) => {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: error,
    });
    console.error(error);
  };

  showSuccessToast = (info: string) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: info,
    });
  };
}

export const BLEService = new BLEServiceInstance();
