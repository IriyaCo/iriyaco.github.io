<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WireGuard Config Generator</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>
    <style>
        body {
            padding: 20px;
        }
        .container {
            max-width: 600px;
        }
        .form-group label {
            margin-bottom: 5px;
        }
        .form-group input, .form-group textarea {
            margin-bottom: 10px;
        }
        #json_output {
            font-size: 0.8rem;
            height: 150px;
            resize: vertical;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WireGuard Config Generator</h1>

        <?php
        $template = '{
            "interface_name": "wg0",
            "local_address": [],
            "mtu": 1280,
            "peer_public_key": "",
            "pre_shared_key": "", 
            "private_key": "",
            "server": "",
            "server_port": 51820,
            "system_interface": false,
            "tag": "proxy",
            "type": "wireguard"
        }';

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $config = $_POST['wg_config'];

            preg_match('/Address = (.+)/', $config, $addressMatches);
            preg_match('/PrivateKey = (.+)/', $config, $privateKeyMatches);
            preg_match('/PublicKey = (.+)/', $config, $publicKeyMatches);
            preg_match('/Endpoint = (.+):(\d+)/', $config, $endpointMatches);
            preg_match('/PreSharedKey = (.+)/', $config, $presharedKeyMatches);

            $localAddresses = explode(', ', trim($addressMatches[1]));

            // Fix for the backslash issue (ALL fields now):
            $filledTemplate = json_decode($template, true); // Decode the template first

            $fieldsToDecode = [
                'local_address' => $localAddresses,
                'private_key' => trim($privateKeyMatches[1]),
                'peer_public_key' => trim($publicKeyMatches[1]),
                'server' => trim($endpointMatches[1]),             
            ];
            if (isset($presharedKeyMatches[1])) {
                $fieldsToDecode['pre_shared_key'] = trim($presharedKeyMatches[1]);
            }

            foreach ($fieldsToDecode as $key => $value) {
              if(is_array($value)) {
                  foreach($value as &$item) {
                      $item = json_decode('"' . $item . '"');
                  }
                  $filledTemplate[$key] = $value;

              } else {
                 $filledTemplate[$key] = json_decode('"' . $value . '"');
              }
            }


            $filledTemplate['server_port'] = (int)trim($endpointMatches[2]); // No need to decode integers


            $jsonOutput = json_encode($filledTemplate, JSON_PRETTY_PRINT);
        }
        ?>

        <form method="post">
            <div class="form-group">
                <label for="wg_config">Paste WireGuard config:</label>
                <textarea class="form-control" id="wg_config" name="wg_config" rows="10" required><?php if (isset($config)) echo htmlspecialchars($config); ?></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Generate</button>
        </form>


        <?php if (isset($jsonOutput)): ?>
            <h2>Generated Config:</h2>
            <div class="form-group">
                <textarea class="form-control" id="json_output" rows="10" readonly><?php echo $jsonOutput; ?></textarea>
            </div>
            <button class="btn btn-secondary" data-clipboard-target="#json_output">Copy to Clipboard</button>
        <?php endif; ?>

    </div>

    <script>
        new ClipboardJS('.btn');
    </script>
</body>
</html>
