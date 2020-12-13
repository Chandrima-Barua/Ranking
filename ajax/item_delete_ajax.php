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
        $lists_pointer = $_POST['delete_item_id'];
        $recorded = $_POST['recorded'];
        $user_ip = '173.252.86.71';
        $ip = get_pointer($user_ip);
        $data = [
            'time'=>'17:06:09',
            'time_offset'=>'6',
            'ip'=>$ip,

        ];
        delete_contribution('contributions',$lists_pointer, $recorded, $data);

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
