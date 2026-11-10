<?php

header(
'Content-Type: application/json'
);

$db =
new SQLite3(
__DIR__ .
'/../../database.sqlite'
);

$result =
$db->query(

'

SELECT

batch_id,

MIN(created_at)
AS tanggal

FROM sk_data

WHERE batch_id
IS NOT NULL

GROUP BY
batch_id

ORDER BY
batch_id DESC

'

);

$data=[];

while(

$row=
$result
->fetchArray(
SQLITE3_ASSOC
)

){

$data[]=
$row;

}

echo json_encode(
$data
);