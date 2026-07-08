export const GRHA_OPTIONS = [
  'Airsanya', 'Daksina', 'Genya', 'Madhya', 'Nairiti', 'Pascima', 'Purwa', 'Uttara', 'Wayabhya'
];

export function getRowField(row, ...keys) {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return '';
}

export function normalizeGrha(value) {
  if (!value) return '';
  const trimmed = String(value).trim();
  const match = GRHA_OPTIONS.find(
    grha => grha.toLowerCase() === trimmed.toLowerCase()
  );
  return match || trimmed;
}
