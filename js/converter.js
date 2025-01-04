import { ensureBase64Padding } from './utils.js';

export function createJsonConfig(parsedConfig) {
    const [serverIp, serverPort] = parsedConfig.peer.Endpoint.split(':');

    const jsonConfig = {
        "interface_name": "wg0",
        "local_address": [
            parsedConfig.interface.Address
        ],
        "mtu": 1280,
        "peer_public_key": ensureBase64Padding(parsedConfig.peer.PublicKey),
        "pre_shared_key": parsedConfig.peer.PresharedKey ? ensureBase64Padding(parsedConfig.peer.PresharedKey) : "",
        "private_key": ensureBase64Padding(parsedConfig.interface.PrivateKey),
        "server": serverIp,
        "server_port": parseInt(serverPort),
        "system_interface": false,
        "tag": "proxy",
        "type": "wireguard"
    };

    return jsonConfig;
}