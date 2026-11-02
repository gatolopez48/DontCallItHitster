// settings.js
const SETTINGS_KEY = 'customHitsterSettings';

// Standard-Einstellungen (werden überschrieben, falls was im LocalStorage liegt)
export let currentSettings = {
  startYear: 1950,
  endYear: 2024,
  genres: [] // Später für Genre-Filter
};

export function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (saved) {
    currentSettings = { ...currentSettings, ...JSON.parse(saved) };
  }
}

export function saveSettings(newSettings) {
  currentSettings = { ...currentSettings, ...newSettings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(currentSettings));
}
