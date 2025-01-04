export function validateConfig(parsedConfig) {
    const errors = [];
    
    // Check required fields
    if (!parsedConfig.interface.Address) {
        errors.push("Missing Address in Interface section");
    }
    if (!parsedConfig.interface.PrivateKey) {
        errors.push("Missing PrivateKey in Interface section");
    }
    if (!parsedConfig.peer.PublicKey) {
        errors.push("Missing PublicKey in Peer section");
    }
    if (!parsedConfig.peer.Endpoint) {
        errors.push("Missing Endpoint in Peer section");
    }

    // Validate endpoint format
    if (parsedConfig.peer.Endpoint) {
        const [host, port] = parsedConfig.peer.Endpoint.split(':');
        if (!host || !port || isNaN(parseInt(port))) {
            errors.push("Invalid Endpoint format (should be host:port)");
        }
    }

    return errors;
}