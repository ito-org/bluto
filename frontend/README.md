# bluto - frontend

Smartphone-Apps zum automatischen Scannen und Senden von UUIDs in der nahen Umgebung. Alle teilnehmenden Geräte registrieren den gemeinsamen Kontakt und speichern diesen lokal ab.
Falls ein Nutzer der App positiv auf SARS-CoV-2 getestet wird, werden alle Nutzer darüber informatiert, die mit der Person in Kontakt waren.

Die Funktionalität wurde mittels der "Bluetooth Low Energy"-Technologie (BLE) implementiert. Zur Wiederverwendung von UI-Code und Designelementen wurde eine Wrapper-Anwendung auf Basis von React Native erstellt. Wir zeigen damit, dass eine iOS-Lösung auch ohne viel Aufwand geschaffen werden kann. Sie könnte auf [troystribling/BlueCap](https://github.com/troystribling/BlueCap) (MIT-Lizenz) oder [GitGarage/BLEMingleOS](https://github.com/GitGarage/BLEMingleiOS) (unlizensiert) aufsetzen.

## Native Android-App

Wir haben eine native Android-App entwickelt, die im `native-android`-Ordner zu finden ist. Diese App demonstriert, dass ein Datentransfer zwischen zwei sich in der Nähe befindlichen Geräten mittels der Google Nearby Connections API möglich ist. Leider erlaubt die API es uns nicht, den RSSI-Wert oder andere Parameter zu ermitteln, die für die Distanzmessung nötig wären.

Im Laufe des Hackathons hat eines unser Teammitglieder die Entwicklung einer nativen App unter Benutzung von Wi-Fi Direct begonnen und wieder beendet. Obwohl wir weiterhin glauben, dass die Nutzung von Wi-Fi Direct sinnvoll wäre, mussten wir uns auf die Fertigstellung eines funktionierenden Prototyps konzentireren.

Wir haben deshalb vorerst auf Bluetooth Low Energy umgeschaltet.

# Attribution

Große Teile der Android-App wurden vom Team Bandemic übernommen.
