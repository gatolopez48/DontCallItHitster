# 📄 Custom Hitster - Project Context & Architecture

## 🎯 Projektübersicht
Dies ist eine webbasierte, mobile-first "Hitster"-Klon-Anwendung. Spieler ziehen zufällige Songs, müssen das Erscheinungsjahr erraten und können den Song direkt über Spotify abspielen. 
Das Projekt nutzt **ausschließlich Vanilla JavaScript (ES6 Modules), HTML und CSS**. Es gibt **keine Build-Tools** (kein npm, Webpack, React, etc.).

## 📂 Dateistruktur & Zuständigkeiten
Das Projekt ist modular aufgebaut, um LLM-Tokens zu sparen und Separation of Concerns (SoC) zu gewährleisten:

* **`index.html`**: Das nackte DOM-Gerüst. Beinhaltet die UI-Container (`screens`) und lädt `main.js` als `<script type="module">`.
* **`styles.css`**: Komplettes Styling. Nutzt Flexbox für Zentrierung und Klassen wie `.hidden` für das Ein-/Ausblenden der Screens.
* **`songs.json`**: Die statische Song-Datenbank (Array aus Objekten: `artist`, `title`, `year`, `uri`).
* **`data.js`**: Kümmert sich um Datenbeschaffung (`fetch`), Filterung (Jahre, ungespielt) und das Speichern/Laden der bereits gespielten Songs im `localStorage`.
* **`settings.js`**: Verwaltet die Benutzereinstellungen (z.B. Zeiträume `startYear` / `endYear`), liest und schreibt in den `localStorage` und stellt die Settings für `data.js` bereit.
* **`ui.js`**: Reine DOM-Manipulation. Setzt Texte (`innerText`), wechselt Bildschirme (`classList.add/remove('hidden')`) und aktualisiert Anzeigen, enthält aber keine Spiel-Logik.
* **`main.js`**: Der Orchestrator (Einstiegspunkt). Importiert alle Module, verknüpft die Button-Event-Listener, steuert den Timer/Countdown und koordiniert den Spielablauf.

## 💾 State Management & Datenfluss
1. **Initialisierung (`main.js` -> `settings.js` -> `data.js`)**: 
   - Settings werden aus dem `localStorage` geladen.
   - `songs.json` wird gefetcht.
   - Bereits gespielte IDs werden aus dem `localStorage` geladen.
   - `availableSongs` wird generiert (gefiltert nach: nicht gespielt UND innerhalb des eingestellten Jahres-Bereichs).
2. **Spielzug (`main.js` -> `data.js`)**: 
   - Countdown läuft ab. 
   - Ein zufälliger Song wird aus `availableSongs` gezogen.
   - Die Song-ID wird den `playedSongIds` hinzugefügt und im `localStorage` gesichert.
3. **Spotify-Integration**: 
   - Songs werden über ihre Spotify-URI (`spotify:track:...`) per `window.location.href` aufgerufen, was die native Spotify-App am Smartphone öffnet.

## ⚠️ Entwicklungs-Richtlinien (Regeln für die KI)
Wenn du neuen Code für dieses Projekt generierst, halte dich strikt an folgende Regeln:
1. **Keine Build-Tools:** Verwende weiterhin nur native ES6-Module (`export` / `import`).
2. **Modularität beibehalten:** Vermische nicht DOM-Manipulation (`ui.js`) mit Datenlogik (`data.js`) oder Settings (`settings.js`).
3. **Fokus:** Antworte nur mit dem Code der Module, die auch wirklich geändert werden müssen. Generiere nicht die `index.html` oder `styles.css` neu, wenn es nur um eine Logik-Änderung in JavaScript geht.
4. **Mobile First:** Alle UI-Änderungen müssen für die Bedienung auf dem Smartphone optimiert sein.

## 🚀 Geplante Features (Roadmap)
- Erweiterung von `settings.js` und `data.js` um einen Genre-Filter.
- *(Hier kannst du später weitere Ideen eintragen)*
