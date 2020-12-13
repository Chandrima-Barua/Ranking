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
        $multispam = (int)$_POST['multispam'];
        $multiabusive = (int)$_POST['multiabusive'];
        $multiiip = (int)$_POST['multilistflagip'];
        $flaguser_pointer = $_SESSION['id'];
        $user_ip = '173.252.86.71';
        $ip = get_pointer($user_ip);
        $multimedia_pointer = $_POST['multimedia_pointer'];
        $multimedia_user_pointer = get_contribution_user_id('multimedia_contributions', $multimedia_pointer);
        $previous_multiflag_status = get_4type_contributionflag_status('multimedia_contributionflag', 'multimedia_contributions_pointer', $multimedia_pointer, $_SESSION['id']);

        if ($previous_multiflag_status === false && ($multiabusive === 0 && $multiiip === 0 && $multispam === 0)) {
            echo "hell";

        } else if ($previous_multiflag_status === false || $previous_multiflag_status['abusive'] !== $multiabusive || $previous_multiflag_status['iip'] !== $multiiip || $previous_multiflag_status['spam'] !== $multispam) {


            flag_contribution('multimedia_contributions', 'multimedia_contributionflag', $multimedia_pointer, $lists_pointer, $multimedia_user_pointer, $flaguser_pointer, $multiabusive,
                $multispam, $multiiip, $ip);

        }

        echo json_encode($previous_multiflag_status, JSON_FORCE_OBJECT);

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
