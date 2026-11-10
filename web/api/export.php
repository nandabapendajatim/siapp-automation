<?php

header(
'Content-Type: application/json'
);

$batch =
$_GET[
'batch'
]
?? '';

$project =
'C:\Projects\siapp-automation';

$download =
$project .
'\download';

$command =

'cd /d "' .

$project .

'" && node export-excel.js '

.

$batch;

exec(
$command
);

sleep(
1
);

$files =
glob(
$download .
'\*.xlsx'
);

usort(

$files,

fn(
$a,
$b
)=>

filemtime(
$b
)

<=>

filemtime(
$a
)

);

$file =

$files[0]
?? null;

echo json_encode([

'success'=>

(bool)$file,

'file'=>

$file
? basename(
$file
)
: null

]);