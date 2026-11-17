
<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$statusFile =
    'C:\Projects\siapp-automation\pemetaan-status.json';

if (!file_exists($statusFile)) {
    echo json_encode([
        'status' => 'idle',
        'pesan' => 'Belum ada proses berjalan.'
    ]);
    exit;
}

$status = json_decode(
    file_get_contents($statusFile),
    true
);

echo json_encode(
    is_array($status)
        ? $status
        : [
            'status' => 'failed',
            'pesan' => 'File status tidak valid.'
        ]
);
