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
        $spam = (int)$_POST['spam'];
        $abusive = (int)$_POST['abusive'];
        $iip = (int)$_POST['listflagip'];
        $flaguser_pointer = $_SESSION['id'];
        $user_ip = '173.252.86.71';
        $ip = get_pointer($user_ip);
        $contribution_pointer = $_POST['contributions_pointer'];
        $contribution_user_pointer = get_contribution_user_id('contributions', $contribution_pointer);
        $previous_flag_status = get_4type_contributionflag_status('contributionflag', 'contributions_pointer', $contribution_pointer, $_SESSION['id']);

        if ($previous_flag_status === false && ($abusive === 0 && $iip === 0 && $spam === 0)) {
            echo "hell";

        } else if ($previous_flag_status === false || $previous_flag_status['abusive'] !== $abusive || $previous_flag_status['iip'] !== $iip || $previous_flag_status['spam'] !== $spam) {


            flag_contribution('contributions', 'contributionflag', $contribution_pointer, $lists_pointer, $contribution_user_pointer, $flaguser_pointer, $abusive, $spam, $iip, $ip);

        }

        echo json_encode($previous_flag_status, JSON_FORCE_OBJECT);

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
