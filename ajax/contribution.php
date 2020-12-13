<?php
error_reporting(E_ALL);
include "../core/db/connection.php";
include "../core/functions/contributionfunctions.php";
include "../core/functions/sitefunctions.php";

if (!isset($_SESSION)) {
    session_start();
}
//$user_ip = '173.252.86.217';
$user_ip = '173.252.86.71';
//$user_ip = '54.236.1.14';

try {

    if (empty($_POST) === false) {

        if (isset($_POST['text']) && isset($_POST['user_id']) && isset($_POST['lists_pointer'])) {
            $user_ip = '173.252.86.71';

            $user_id = $_SESSION['id'];
            $test_id = $_POST['lists_pointer'];
            $ip_details = get_ip_data_from_mmdb($user_ip);
            $zipcode = $ip_details['zip_code'];
            $country_name = $ip_details['country_name'];
            $country_code = $ip_details['country_code'];
            $latitude = $ip_details['latitude'];
            $longitude = $ip_details['longitude'];
            $city = $ip_details['city'];
            $region_code = $ip_details['region_code'];
            $region_name = $ip_details['region_name'];
            $time_zone = $ip_details['time_zone'];
            $ip_exists_or_not = check_ip($user_ip);
            $text = addslashes($_POST['text']);
            $user_id = $_POST['user_id'];
            $lists_pointer = $_POST['lists_pointer'];
            $selected = 0;
            if ($ip_exists_or_not == false) {
                $insert_ip = set_ip_view($user_ip, $zipcode , $country_name , $country_code, $latitude, $longitude , $city , $region_code ,$region_name , $time_zone);
            }

            $ip = get_pointer($user_ip);
            $insert_contributions = set_add_contribution('contributions',$text, $user_id, $lists_pointer, $selected, $ip);
            $second = profile_public_latest_contributions_new($lists_pointer);
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
