<?php

$file =
$_GET[
'file'
]
?? '';

$path =

'C:\Projects\siapp-automation\download\\'

.

$file;

if(
!file_exists(
$path
)
){

http_response_code(
404
);

exit;

}

header(
'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
);

header(

'Content-Disposition: attachment; filename="' .

basename(
$path
)

.

'"'

);

readfile(
$path
);