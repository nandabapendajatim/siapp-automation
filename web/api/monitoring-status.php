<?php

header(
'Content-Type: application/json'
);

echo file_get_contents(
'../../logs/monitoring-status.json'
);