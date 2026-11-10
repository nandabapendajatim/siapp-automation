<?php

header('Content-Type:text/plain');

$projectPath =
'C:\Projects\siapp-automation';

$command =
'cd /d "' .
$projectPath .
'" && npx playwright test tests/monitoring.spec.js --project=chromium --headed';

exec(

    'start "" /MIN cmd /c "' .
    $command .
    '"'

);

echo 'Monitoring berhasil dijalankan.';