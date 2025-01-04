export function parseWireGuardConfig(config) {
    const lines = config.split('\n').map(line => line.trim()).filter(line => line);
    let currentSection = '';
    const parsedConfig = {
        interface: {},
        peer: {}
    };

    lines.forEach(line => {
        if (line.startsWith('[') && line.endsWith(']')) {
            currentSection = line.slice(1, -1).toLowerCase();
            return;
        }

        if (currentSection) {
            const [key, value] = line.split('=').map(part => part.trim());
            if (currentSection === 'interface') {
                parsedConfig.interface[key] = value;
            } else if (currentSection === 'peer') {
                parsedConfig.peer[key] = value;
            }
        }
    });

    return parsedConfig;
}