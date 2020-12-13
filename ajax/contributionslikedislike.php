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
        $user_id = $_SESSION['id'];
        $contributionstype_pointer = $_POST['contributions_pointer'];
        $lists_pointer = $_POST['lists_pointer'];
        if (isset($_POST['like'])) {
            $like_insert = likeinsertion('contributions', $contributionstype_pointer, $user_id);
        }
        if (isset($_POST['dislike'])) {
            $dislike_insert = dislikeinsertion('contributions', $contributionstype_pointer, $user_id);
        }
        $textlikesecond = array();
        $textlikesecond = profile_public_latest_contributions_new($lists_pointer);
        foreach ($textlikesecond as $key => $row) {
            $likeselvalue[$key] = $row['selected'];
            $likescore[$key] = $row['score'];
            $likediff[$key] = $row['total_likes'] - $row['total_dislikes'];
            $textlikes[$key] = $row['total_likes'];
            $textid[$key] = $row['id'];
        }

        array_multisort($likeselvalue, SORT_DESC, $likescore, SORT_DESC, $likediff, SORT_DESC, $textlikes, SORT_DESC, $textid, SORT_DESC, $textlikesecond);

        echo json_encode($textlikesecond, JSON_FORCE_OBJECT);


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
