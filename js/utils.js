export function ensureBase64Padding(str) {
    // Base64 strings should have length that's multiple of 4
    // If not, padding characters (=) should be added
    const padding = str.length % 4;
    if (padding) {
        return str + '='.repeat(4 - padding);
    }
    return str;
}