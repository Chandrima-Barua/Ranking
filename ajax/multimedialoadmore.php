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
        $multisecond = profile_public_latest_multimedia_new($lists_pointer);

        foreach ($multisecond as $key => $row) {
            $imageval[$key] = $row['selected'];
            $imagescore[$key] = $row['score'];
            $imagediff[$key] = $row['total_likes'] - $row['total_dislikes'];
            $imagelikes[$key] = $row['total_likes'];
            $imageid[$key] = $row['id'];
        }

        array_multisort($imageval, SORT_DESC, $imagescore, SORT_DESC, $imagediff, SORT_DESC, $imagelikes, SORT_DESC, $imageid, SORT_DESC, $multisecond);
        echo json_encode($multisecond, JSON_FORCE_OBJECT);


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













