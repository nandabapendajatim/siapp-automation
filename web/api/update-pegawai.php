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

    $data =
        json_decode(

            file_get_contents(
                'php://input'
            ),

            true

        );

    $stmt =

        $db->prepare(

            '

UPDATE pegawai

SET aktif=?

WHERE id=?

'

        );

    $stmt->bindValue(
        1,
        $data['aktif'],
        SQLITE3_INTEGER
    );

    $stmt->bindValue(
        2,
        $data['id'],
        SQLITE3_INTEGER
    );

    $stmt->execute();

    echo json_encode([

        'success' => true

    ]);
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
