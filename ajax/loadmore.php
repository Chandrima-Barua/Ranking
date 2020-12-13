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

            $lists_pointer = $_POST['lists_pointer'];

            $loadsecond = profile_public_latest_contributions_new($lists_pointer);
            foreach ($loadsecond as $key => $row) {
                $loadselvalue[$key] = $row['selected'];
                $loadscore[$key] = $row['score'];
                $loaddiff[$key] = $row['total_likes'] - $row['total_dislikes'];
                $loadlikes[$key] = $row['total_likes'];
                $loadid[$key] = $row['id'];
            }

            array_multisort($loadselvalue, SORT_DESC, $loadscore, SORT_DESC, $loaddiff, SORT_DESC, $loadlikes, SORT_DESC, $loadid, SORT_DESC, $loadsecond);

                echo json_encode($loadsecond, JSON_FORCE_OBJECT);

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













