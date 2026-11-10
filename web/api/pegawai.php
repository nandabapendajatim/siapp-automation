<?php

header(
    'Content-Type: application/json'
);

try {

    $db =
        new SQLite3(
            __DIR__ .
                '/../../database.sqlite'
        );

    $result =
        $db->query('

SELECT
id,
nama,
aktif

FROM pegawai

');

    $data =
        [];

    while (

        $row =

        $result->fetchArray(
            SQLITE3_ASSOC
        )

    ) {

        $data[] =
            $row;
    }

    echo json_encode(
        $data
    );
} catch (
    Exception $e
) {

    http_response_code(
        500
    );

    echo json_encode([

        'error' =>

        $e->getMessage()

    ]);
}
