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
        $contributionstype_pointer = $_POST['multimedia_pointer'];
        $lists_pointer = $_POST['lists_pointer'];

        if (isset($_POST['like'])) {
            $like_insert = likeinsertion('multimedia_contributions', $contributionstype_pointer, $user_id);
        }
        if (isset($_POST['dislike'])) {
            $dislike_insert = dislikeinsertion('multimedia_contributions', $contributionstype_pointer, $user_id);
        }
        $likesecond = profile_public_latest_multimedia_new($lists_pointer);
        if (!empty($likesecond)) {
            foreach ($likesecond as $key => $row) {
                $likedislikeselvalue[$key] = $row['selected'];
                $likedislikescore[$key] = $row['score'];
                $likedislikediff[$key] = $row['total_likes'] - $row['total_dislikes'];
                $likedislikes[$key] = $row['total_likes'];
                $likedislikeid[$key] = $row['id'];
            }

            array_multisort($likedislikeselvalue, SORT_DESC, $likedislikescore, SORT_DESC, $likedislikediff, SORT_DESC, $likedislikes, SORT_DESC, $likedislikeid, SORT_DESC, $likesecond);

            echo json_encode($likesecond, JSON_FORCE_OBJECT);
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



