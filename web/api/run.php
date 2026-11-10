<?php

$projectPath =
'C:\Projects\siapp-automation';

$command =
'cd /d "' .
$projectPath .
'" && npx playwright test tests/run-v2.spec.js --project=chromium --headed';

exec(
  'start "" /MIN cmd /c "' .
  $command .
  '"'
);

echo 'OK';