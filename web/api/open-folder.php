<?php

$folder =
'C:\Projects\siapp-automation\download';

exec(

'start "" explorer "' .

$folder .

'"'

);

echo 'OK';