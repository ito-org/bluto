# bluto - backend

Webserver für die Abfrage, welche Nutzer (UUIDs) positiv auf SARS-CoV-2 getestet wurden. Verbindet sich mit einem MongoDB-Datenbankserver.

## Setup

1. Abhängigkeiten installieren: `npm install`
2. API-Backend starten: `node api.js`

## Demo

Der aktuelle Server ist erreichbar auf http://api.bluto.eu:8080/cases?lat=42.1&long=42.1

Noch sind die Datenbankeinträge hardcoded.
