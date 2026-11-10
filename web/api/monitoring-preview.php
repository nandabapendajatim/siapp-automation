<?php

header('Content-Type:text/plain; charset=utf-8');

$projectPath =
'C:\Projects\siapp-automation';

$command =
'cd /d "' .
$projectPath .
'" && node web-preview.js';

$output = [];

exec(
    $command,
    $output
);

echo implode("\n", $output);