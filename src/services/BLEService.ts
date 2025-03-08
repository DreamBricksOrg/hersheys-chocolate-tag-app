import { BleManager, Device, type DeviceId } from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";

class BLEServiceInstance {
  manager: BleManager;

  constructor() {
    this.manager = new BleManager();
  }

  scanDevices = async (onDeviceFound: (device: Device) => void) => {
    return this.manager.startDeviceScan(
      [],
      { legacyScan: true },
      (error, device) => {
        if (error) {
          this.manager.stopDeviceScan();
          throw new Error("A  busca por dispositivos falhou");
        }

        if (device) {
          onDeviceFound(device);
        }
      }
    );
  };

  stopDeviceScan = () => {
    return this.manager.stopDeviceScan();
  };

  connectToDevice = (deviceId: DeviceId, timeout?: number) => {
    this.manager.stopDeviceScan();
    return this.manager.connectToDevice(deviceId, { timeout });
  };

  disconnectDeviceById = async (id: DeviceId) => {
    return this.manager.cancelDeviceConnection(id);
  };

  getState = () => {
    return this.manager.state();
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

    return false;
  };

  // initializeBLE = () =>
  //   new Promise<void>((resolve) => {
  //     const subscription = this.manager.onStateChange((state) => {
  //       switch (state) {
  //         case BluetoothState.Unsupported:
  //           this.showErrorToast("");
  //           break;
  //         case BluetoothState.PoweredOff:
  //           this.onBluetoothPowerOff();

  //           this.manager.enable().catch((error: BleError) => {
  //             console.log(error);
  //             if (error.errorCode === BleErrorCode.BluetoothUnauthorized) {
  //               this.requestBluetoothPermission();
  //             }
  //           });
  //           break;
  //         case BluetoothState.Unauthorized:
  //           this.requestBluetoothPermission();
  //           break;
  //         case BluetoothState.PoweredOn:
  //           resolve();
  //           subscription.remove();
  //           break;
  //         default:
  //           console.error("Unsupported state: ", state);
  //         // resolve()
  //         // subscription.remove()
  //       }
  //     }, true);
  //   });

  // isDeviceConnected = (deviceId: DeviceId) => {
  //   return this.manager.isDeviceConnected(deviceId);
  // };

  // getConnectedDevices = async (expectedServices: UUID[]) => {
  //   try {
  //     return await this.manager.connectedDevices(expectedServices);
  //   } catch (error_1) {
  //     this.onError(error_1);
  //   }
  // };

  // onDeviceDisconnected = (
  //   deviceId: Device["id"],
  //   listener: (error: BleError | null, device: Device | null) => void
  // ) => {
  //   return this.manager.onDeviceDisconnected(deviceId, listener);
  // };
}

export const BLEService = new BLEServiceInstance();
