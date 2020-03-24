# bluto - frontend

Smartphone-Apps for automatic scanning and broadcasting of UUIDs in close proximity. All participating devices register the mutual contact and store it locally. As soon as a user of the app tests positive for SARS-CoV-2 all users who have been in contact with them will be notified.

The functionality has been implemented using Bluetooth Low Energy (BLE) technology. To reuse UI code and designs, a wrapper application based on React Native has been created. We show that technically a solution can be made for iOS as well. An iOS solution might base itself on [troystribling/BlueCap](https://github.com/troystribling/BlueCap) (MIT licensed) or [GitGarage/BLEMingleOS](https://github.com/GitGarage/BLEMingleiOS) (unlicensed).

## Native Android App

We have developed a native Android app which can be found in the `native-android` directory. This app demonstrates that a transfer of data between two close-by devices is possible using the Google Nearby Connections API. However it does not allow us to retrieve the RSSI value or other parameters that are necessary for measuring the distance between two phones.

In the process one of our team members has started and dropped the development of a native app using Wi-Fi Direct technology. While we still believe a use of Wi-Fi Direct would be useful we have had to focus our resources towards building a working prototype.

We have therefore switched to Bluetooth Low Energy for now.

## Attribution

Large parts of the Android app have been taken from team Bandemic ([Bandemic/Bandemic-Android](https://github.com/Bandemic/Bandemic-Android)).
