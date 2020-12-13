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

        if (isset($_POST['multimedia_pointer']) && isset($_POST['select'])) {
            $select_pointer = $_POST['multimedia_pointer'];
            $lists_pointer = $_POST['lists_pointer'];
            $check = has_contributionselected('multimedia_contributions',$lists_pointer);

            if ($check === false) {
                $selected = mysqli_query($connection, "UPDATE `multimedia_contributions` SET `selected` = 0");
            }
            $sel = $_POST['select'];
            $update_contribution = update_contribution('multimedia_contributions',$sel, $select_pointer);

            $second = array();
            $second = profile_public_latest_multimedia_new($lists_pointer);
            foreach ($second as $key => $row) {
                $multilvalue[$key] = $row['selected'];
                $multiscore[$key] = $row['score'];
                $multidiff[$key] = $row['total_likes'] - $row['total_dislikes'];
                $multilikes[$key] = $row['total_likes'];
                $multiid[$key] = $row['id'];
            }

            array_multisort($multilvalue, SORT_DESC, $multiscore, SORT_DESC, $multidiff, SORT_DESC, $multilikes, SORT_DESC, $multiid, SORT_DESC, $second);

            echo json_encode($second, JSON_FORCE_OBJECT);
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


