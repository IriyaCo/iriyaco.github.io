import { parseWireGuardConfig } from './js/parser.js';
import { validateConfig } from './js/validator.js';
import { createJsonConfig } from './js/converter.js';
import { copyToClipboard } from './js/ui.js';
import { initThemeSystem, toggleTheme } from './js/theme.js';

// Initialize theme system
initThemeSystem();

// Export functions to global scope
window.convertConfig = convertConfig;
window.copyToClipboard = copyToClipboard;
window.toggleTheme = toggleTheme;

function convertConfig() {
    const inputConfig = document.getElementById('inputConfig').value;
    const outputJson = document.getElementById('outputJson');
    
    try {
        const parsedConfig = parseWireGuardConfig(inputConfig);
        const validationErrors = validateConfig(parsedConfig);
        
        if (validationErrors.length > 0) {
            outputJson.value = "Configuration errors:\n" + validationErrors.join("\n");
            return;
        }

        const jsonConfig = createJsonConfig(parsedConfig);
        outputJson.value = JSON.stringify(jsonConfig, null, 2);
    } catch (error) {
        outputJson.value = "Error converting configuration: " + error.message;
    }
}