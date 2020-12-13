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
        $connection = Db_connect::getInstance()->getConnection();

        if (isset($_POST['contributions_pointer']) && isset($_POST['select'])) {
            $select_pointer = $_POST['contributions_pointer'];
            $lists_pointer = $_POST['lists_pointer'];
            $check = has_contributionselected('contributions', $lists_pointer);

            if ($check === false) {
                $selected = mysqli_query($connection, "UPDATE `contributions` SET `selected` = 0");
            }

            $sel = $_POST['select'];
            $update_contribution = update_contribution('contributions',$sel, $select_pointer);

            $selectedsecond = array();
            $selectedsecond = profile_public_latest_contributions_new($lists_pointer);
            foreach ($selectedsecond as $key => $row) {
                $ownerselvalue[$key] = $row['selected'];
                $ownerscore[$key] = $row['score'];
                $ownerdiff[$key] = $row['total_likes'] - $row['total_dislikes'];
                $ownerlikes[$key] = $row['total_likes'];
                $ownerid[$key] = $row['id'];
            }

            array_multisort($ownerselvalue, SORT_DESC, $ownerscore, SORT_DESC, $ownerdiff, SORT_DESC, $ownerlikes, SORT_DESC, $ownerid, SORT_DESC, $selectedsecond);

                echo json_encode($selectedsecond, JSON_FORCE_OBJECT);

        }
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


