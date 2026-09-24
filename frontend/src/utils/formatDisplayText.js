// Converts stored enum-style values into human-readable labels.
// Examples: 'juara_ii' -> 'Juara II', 'harapan_i' -> 'Harapan I',
//           'kecamatan' -> 'Kecamatan', 'prestasi_update' -> 'Prestasi Update'.
// Words consisting only of i/v/x are treated as Roman numerals and upper-cased.
export function formatDisplayText(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/_/g, ' ')
    .replace(/\b\w+\b/g, (word) => {
      if (/^[ivx]+$/.test(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
}

export default formatDisplayText;
