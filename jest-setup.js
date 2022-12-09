import {jest} from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {NativeModules} from 'react-native';
import 'react-native-gesture-handler/jestSetup';

NativeModules.ImagePickerManager = {
  showImagePicker: jest.fn(),
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
};

NativeModules.RNPermissions = {};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-device-info', () => {
  return {
    getVersion: () => 4,
  };
});

jest.mock('@react-native-community/geolocation', () => {});

jest.mock('react-native-localize', () => {});

jest.mock('react-native-indicators', () => {});

jest.mock('react-native-keychain', () => {});

jest.mock('reanimated-bottom-sheet');

jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    sub: jest.fn(),
    multiply: jest.fn(),
    sqrt: jest.fn(),
    max: jest.fn(),
    diff: jest.fn(),
    onChange: jest.fn(),
    View: View,
    Extrapolate: {CLAMP: jest.fn()},
    Clock: jest.fn(),
    greaterThan: jest.fn(),
    lessThan: jest.fn(),
    startClock: jest.fn(),
    stopClock: jest.fn(),
    clockRunning: jest.fn(),
    not: jest.fn(),
    or: jest.fn(),
    and: jest.fn(),
    spring: jest.fn(),
    decay: jest.fn(),
    defined: jest.fn(),
    call: jest.fn(),
    block: jest.fn(),
    abs: jest.fn(),
    greaterOrEq: jest.fn(),
    lessOrEq: jest.fn(),
    debug: jest.fn(),
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
  };
});

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});

jest.mock('react-native-image-crop-picker', () => {
  return {
    openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
    openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return {
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  };
});

jest.mock('@react-native-firebase/dynamic-links', () => {
  return () => {
    return {
      getInitialLink: jest.fn(() => Promise.resolve()),
      onLink: jest.fn(),
    };
  };
});

jest.mock('react-native-settings', () => {});

jest.mock('react-native-notifications', () => {
  return {
    Notifications: {
      getInitialNotification: jest.fn(() => Promise.resolve()),
      registerRemoteNotifications: jest.fn(),
      events: () => {
        return {
          registerRemoteNotificationsRegistered: jest.fn(),
          registerRemoteNotificationsRegistrationFailed: jest.fn(),
          registerNotificationReceivedForeground: jest.fn(),
          registerNotificationReceivedBackground: jest.fn(),
          registerNotificationOpened: jest.fn(),
        };
      },
    },
  };
});

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

jest.mock('react-native-vector-icons/Entypo', () => 'Icon');

jest.mock('react-native-vector-icons/Octicons', () => 'Icon');

jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon');

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

jest.mock('react-native-vector-icons/EvilIcons', () => 'Icon');
