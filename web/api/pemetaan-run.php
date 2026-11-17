
<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Gunakan metode POST.'
    ]);
    exit;
}

$projectPath = 'C:\Projects\siapp-automation';
$statusFile = $projectPath . '\pemetaan-status.json';

if (file_exists($statusFile)) {
    $status = json_decode(
        file_get_contents($statusFile),
        true
    );

    if (($status['status'] ?? '') === 'running') {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Proses Pemetaan masih berjalan.'
        ]);
        exit;
    }
}

$status = [
    'status' => 'running',
    'pesan' => 'Menyiapkan proses Pemetaan...',
    'updated_at' => gmdate('c')
];

file_put_contents(
    $statusFile,
    json_encode($status),
    LOCK_EX
);

$command =
    'cd /d "' . $projectPath .
    '" && node pemetaan-runner.js';

exec('start "" /MIN cmd /c "' . $command . '"');

echo json_encode([
    'success' => true,
    'message' => 'Proses Pemetaan dimulai.'
]);
