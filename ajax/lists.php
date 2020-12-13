<?php
error_reporting(E_ALL);
include "../core/db/connection.php";
include "../core/functions/contributionfunctions.php";
include "../core/functions/sitefunctions.php";

if (!isset($_SESSION)) {
    session_start();
}


try {

    if (empty($_POST) === false) {
        $lists_pointer= add_lists();
        $connection = Db_connect::getInstance()->getConnection();

        $last_inserted_id = $connection->insert_id;
        $retrived_lists = get_lists($last_inserted_id);
        echo json_encode($retrived_lists, JSON_FORCE_OBJECT);

    } else {
        // empty post value
        $response = [
            'success' => false,
            'error_code' => 1002,
            'message' => 'invalid attempt'
        ];
    }
} catch (Exception $exception) {
    $response = [
        'success' => false,
        'error_code' => 1111,
        'message' => 'compilation error'
    ];
}

?>
