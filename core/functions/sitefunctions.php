<?php
use GifFrameExtractor\GifFrameExtractor AS GifFrameExtractor;

function sanitize($data)
{
    $connection = Db_connect::getInstance()->getConnection();

    return htmlentities(strip_tags(mysqli_real_escape_string($connection, $data)));
}

function get_ip_data_from_mmdb($ip)
{
    $connection = Db_connect::getInstance()->getConnection();

    include "../includes/mmdb/Db/Reader.php";
    include "../includes/mmdb/Db/Reader/Decoder.php";
    include "../includes/mmdb/Db/Reader/InvalidDatabaseException.php";
    include "../includes/mmdb/Db/Reader/Metadata.php";
    include "../includes/mmdb/Db/Reader/Util.php";

    $data = [];
    $city_mmdb_ip = 'GeoIP2-City.mmdb';
    $city_mmdb_lite = 'GeoLite2-City.mmdb';
    $maxmind['geo_city_ip'] = new MaxMind\Db\Reader('../includes/mmdb/' . $city_mmdb_ip);
    $data1 = $maxmind['geo_city_ip']->get($ip);

    $maxmind ['geo_city_lite'] = new MaxMind\Db\Reader('../includes/mmdb/' . $city_mmdb_lite);
    $data2 = $maxmind['geo_city_lite']->get($ip);

    if ($data1['country']['iso_code'] != $data2['country']['iso_code']) {
        $data1 = $data2;
    }


    if (isset($data1['location']['latitude'])) {
        $data["latitude"] = sanitize($data1['location']['latitude']);
    }


    if (isset($data1['location']['longitude'])) {
        $data["longitude"] = sanitize($data1['location']['longitude']);
    }


    if (isset($data1['subdivisions'][0]['names']['en'])) {
        $data['region_name'] = sanitize($data1['subdivisions'][0]['names']['en']);
    }


    if (isset($data1['subdivisions'][0]['iso_code'])) {
        $data['region_code'] = sanitize($data1['subdivisions'][0]['iso_code']);
    }


    if (isset($data1['city']['names']['en'])) {
        $data['city'] = sanitize($data1['city']['names']['en']);

    }


    if (isset($data1['location']['time_zone'])) {
        $data['time_zone'] = sanitize($data1['location']['time_zone']);
    }


    if (isset($data1['postal']['code'])) {
        $data['zip_code'] = $data1['postal']['code'];
    }

    if (isset($data1['country']['names']['en'])) {
        $data['country_name'] = sanitize($data1['country']['names']['en']);
    }

    if (isset($data1['country']['iso_code'])) {
        $data['country_code'] = sanitize($data1['country']['iso_code']);
    }


    return $data;

}

function get_cronjob_status($queue_type)
{

    $connection = Db_connect::getInstance()->getConnection();
    $statement = $connection->prepare("SELECT `cronstatus` FROM `cronjobstatus` WHERE `type` = ?");
    $statement->bind_param("s", $queue_type);
    $statement->execute();
    $statement->bind_result($cron_status);
    $statement->fetch();
    $statement->close();
    return $cron_status ? $cron_status : false;
}

function get_insertion_queue_table($queue_type)
{
    $cron_status = get_cronjob_status($queue_type);
    if (in_array($cron_status, array(1, 2, 3, 4, 5, 6))) {
        $queue_table = in_array($cron_status, array(1, 5, 6)) ? $queue_type . '_queue1' : $queue_type . '_queue2';
        return $queue_table;
    } else {
        // send error to admin
        return false;
    }
}

function get_update_queue_table($queue_type, $cron_status)
{
    if (in_array($cron_status, array(1, 2, 3, 4, 5, 6))) {
        $queue_table = in_array($cron_status, array(1, 5, 6)) ? $queue_type . '_update1' : $queue_type . '_update2';
        return $queue_table;
    } else {
        // send error to admin
        return false;
    }
}


function get_table_name_where_pointer_exists_new($queue_type, $select_pointer, $cron_status)
{
    $selected_tables = null;
    if ($cron_status !== false && in_array($cron_status, array(1, 2, 3, 4, 5, 6))) {
        $selected_index1_table = $queue_type . '_index1';
        $selected_index2_table = $queue_type . '_index2';
        $selected_queue1_table = $queue_type . '_queue1';
        $selected_queue2_table = $queue_type . '_queue2';
        $selected_update1_table = $queue_type . '_update1';
        $selected_update2_table = $queue_type . '_update2';
        $selected_field = $queue_type . '_pointer';
        switch ($cron_status) {
            case 1:
                $selected_tables = [$selected_update1_table, $selected_queue1_table, $selected_index1_table];
                break;
            case 2:
                $selected_tables = [$selected_update2_table, $selected_update1_table, $selected_queue2_table, $selected_queue1_table, $selected_index1_table];
                break;
            case 3:
                $selected_tables = [$selected_update2_table, $selected_queue2_table, $selected_index2_table];
                break;
            case 4:
                $selected_tables = [$selected_update2_table, $selected_queue2_table, $selected_index1_table];
                break;
            case 5:
                $selected_tables = [$selected_update1_table, $selected_update2_table, $selected_queue1_table, $selected_queue2_table, $selected_index1_table];
                break;
            case 6:
                $selected_tables = [$selected_update1_table, $selected_queue1_table, $selected_index2_table];
                break;
        }

        $result = false;
        $connection = Db_connect::getInstance()->getConnection();
        foreach ($selected_tables as $selected_table) {
            $statement = $connection->prepare("SELECT EXISTS(SELECT 1 FROM `$selected_table` WHERE `$selected_field` = ?)");
            $statement->bind_param('i', $select_pointer);
            $statement->execute();
            $statement->bind_result($pointer_exist);
            $statement->fetch();
            $statement->close();
            if ($pointer_exist === 1) {
                $result = $selected_table;
                break;
            }
        }
        return $result !== false ? $result : false;
    }
    return false;
}

function get_selection_tables($queue_type)
{
    $cron_status = get_cronjob_status($queue_type);
    $cron_status_array = array(1, 2, 3, 4, 5, 6);
    if (in_array($cron_status, $cron_status_array)) {
        switch ($cron_status) {
            case 1:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 2:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 3:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_index2';
                break;
            case 4:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 5:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 6:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_index2';
                break;
            default:
                $selection_tables = false;
                break;
        }
        return $selection_tables;
    } else {
        //dashboard
        return false;
    }
}

function get_selection_only_queue_table_with_cronstatus($queue_type, $cron_status)
{
    $cron_status_array = array(1, 2, 3, 4, 5, 6);
    if (in_array($cron_status, $cron_status_array)) {
        switch ($cron_status) {
            case 1:
                $selection_tables[] = $queue_type . '_queue1';
                break;
            case 2:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_queue1';
                break;
            case 3:
                $selection_tables[] = $queue_type . '_queue2';
                break;
            case 4:
                $selection_tables[] = $queue_type . '_queue2';
                break;
            case 5:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_queue2';
                break;
            case 6:
                $selection_tables[] = $queue_type . '_queue1';
                break;
            default:
                $selection_tables = false;
                break;
        }
        return $selection_tables;
    } else {
        // dashboard
        return false;
    }
}

function get_row_from_statement($statement)
{
    $statement->execute();
    $meta = $statement->result_metadata();
    while ($field = $meta->fetch_field()) {
        $parameters[] = &$row[$field->name];
    }
    call_user_func_array(array($statement, 'bind_result'), $parameters);
    if ($statement->fetch()) {
        foreach ($row as $key => $val) {
            $result[$key] = $val;
        }
        $statement->close();
        return $result;
    } else {
        return false;
    }
}

function get_selection_only_update_table_with_cronstatus($queue_type, $cron_status)
{
    $cron_status_array = array(1, 2, 3, 4, 5, 6);
    if (in_array($cron_status, $cron_status_array)) {
        switch ($cron_status) {
            case 1:
                $selection_tables[] = $queue_type . '_update1';
                break;
            case 2:
                $selection_tables[] = $queue_type . '_update2';
                $selection_tables[] = $queue_type . '_update1';
                break;
            case 3:
                $selection_tables[] = $queue_type . '_update2';
                break;
            case 4:
                $selection_tables[] = $queue_type . '_update2';
                break;
            case 5:
                $selection_tables[] = $queue_type . '_update1';
                $selection_tables[] = $queue_type . '_update2';
                break;
            case 6:
                $selection_tables[] = $queue_type . '_update1';
                break;
            default:
                $selection_tables = false;
                break;
        }
        return $selection_tables;
    } else {
        // dashboard
        return false;
    }
}

function replace_banned_character($text)
{

    $text = str_replace('&amp;', '&', $text);

    $text = str_replace("\\'", "'", $text);

    $text = urldecode($text);

    $text = html_entity_decode($text);

    return $text;

}

function get_index_first_selection_tables_with_updates($queue_type, $cron_status)
{
    $cron_status_array = array(1, 2, 3, 4, 5, 6);
    if (in_array($cron_status, $cron_status_array)) {
        switch ($cron_status) {
            case 1:
                $selection_tables[] = $queue_type . '_update1';
                $selection_tables[] = $queue_type . '_index1';
                $selection_tables[] = $queue_type . '_queue1';
                break;
            case 2:
                $selection_tables[] = $queue_type . '_update2';
                $selection_tables[] = $queue_type . '_update1';
                $selection_tables[] = $queue_type . '_index1';
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_queue1';
                break;
            case 3:
                $selection_tables[] = $queue_type . '_update2';
                $selection_tables[] = $queue_type . '_index2';
                $selection_tables[] = $queue_type . '_queue2';
                break;
            case 4:

                $selection_tables[] = $queue_type . '_update2';
                $selection_tables[] = $queue_type . '_index1';
                $selection_tables[] = $queue_type . '_queue2';
                break;
            case 5:
                $selection_tables[] = $queue_type . '_update1';
                $selection_tables[] = $queue_type . '_update2';
                $selection_tables[] = $queue_type . '_index1';
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_queue2';
                break;
            case 6:
                $selection_tables[] = $queue_type . '_update1';
                $selection_tables[] = $queue_type . '_index2';
                $selection_tables[] = $queue_type . '_queue1';
                break;
            default:
                $selection_tables = false;
                break;
        }
        return $selection_tables;
    } else {
        //dashboard
        return false;
    }
}

function get_multiple_cronjob_data($types)
{
    $types_count = count($types);
    $cron_job_data = array_fill_keys($types, array());
    $fieldvalues = "'" . implode("','", $types) . "'";
    $pointer = $type = $cronstatus = $last_pointer = $last_pointer_queue1 = $last_pointer_queue2 = null;
    $db = Db_connect::getInstance()->getConnection();
    $st = $db->prepare("SELECT `pointer`, `type`, `cronstatus`, `last_pointer`,`last_pointer_queue1`, `last_pointer_queue2` FROM cronjobstatus WHERE `type` IN ($fieldvalues)");
    $st->execute();
    $st->bind_result($pointer, $type, $cronstatus, $last_pointer, $last_pointer_queue1, $last_pointer_queue2);
    $st->store_result();
    while ($st->fetch()) {
        $types_count--;
        $cron_job_data[$type] = array(
            'pointer' => $pointer,
            'type' => $type,
            'cronstatus' => $cronstatus,
            'last_pointer' => $last_pointer,
            'last_pointer_queue1' => $last_pointer_queue1,
            'last_pointer_queue2' => $last_pointer_queue2);
    }
    $st->close();
    return $types_count !== 0 ? [] : $cron_job_data;

}

function get_updated_date_depend_on_children_cronstatus($types)
{
    $check_multiple_cron_status = array_values(get_multiple_cronjob_data($types));
    $alternative_cron_type = array();
    $number_of_check_multiple_cron_status = count($check_multiple_cron_status);
    for ($i = 0; $i < $number_of_check_multiple_cron_status; $i++) {
        if ($check_multiple_cron_status[$i]['cronstatus'] == 3 || $check_multiple_cron_status[$i]['cronstatus'] == 6) {
            $alternative_cron_type[] = $check_multiple_cron_status[$i]['type'];
        }
    }
    $alternative_cron_type = $alternative_cron_type == array() ? false : $alternative_cron_type;
    return [$check_multiple_cron_status, $alternative_cron_type];
}

function get_selection_tables_with_cronstatus($queue_type, $cron_status)
{
    $cron_status_array = array(1, 2, 3, 4, 5, 6);
    if (in_array($cron_status, $cron_status_array)) {
        switch ($cron_status) {
            case 1:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 2:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 3:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_index2';
                break;
            case 4:
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 5:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_queue2';
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 6:
                $selection_tables[] = $queue_type . '_queue1';
                $selection_tables[] = $queue_type . '_index2';
                break;
            default:
                $selection_tables = false;
                break;
        }
        return $selection_tables;
    } else {
        // dashboard
        return false;
    }
}

function get_selection_only_index_tables_with_cronstatus($queue_type, $cron_status)
{
    $cron_status_array = array(1, 2, 3, 4, 5, 6);
    if (in_array($cron_status, $cron_status_array)) {
        switch ($cron_status) {
            case 1:
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 2:
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 3:
                $selection_tables[] = $queue_type . '_index2';
                break;
            case 4:
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 5:
                $selection_tables[] = $queue_type . '_index1';
                break;
            case 6:
                $selection_tables[] = $queue_type . '_index2';
                break;
            default:
                $selection_tables = false;
                break;
        }
        return $selection_tables;
    } else {
        //dashboard
        return false;
    }
}


function get_last_id_from_queue($statement)
{
    $last_id = null;
    $statement->execute();
    $statement->bind_result($last_id);
    $statement->store_result();

    return $last_id ? $last_id : false;
}

function execute_statement($statement)
{
    $statement->execute();
    $statement->close();
}

function execute_statements($statements)
{
    foreach ($statements as $statement) {
        execute_statement($statement);
    }
}

function get_cronjob_pointer_status($queue_type)
{
    $connection = Db_connect::getInstance()->getConnection();
    $pointer = $cron_status = $last_pointer = $last_pointer_queue1 = $last_pointer_queue2 = $last_daily_digest = $last_weekly_digest = null;
    $statement = $connection->prepare("SELECT `pointer`, `cronstatus`,`last_pointer`, `last_pointer_queue1`, `last_pointer_queue2`,`last_daily_digest`,`last_weekly_digest` FROM `cronjobstatus` WHERE `type` = ?");
    $statement->bind_param("s", $queue_type);
    $statement->execute();
    $statement->bind_result($pointer, $cron_status, $last_pointer, $last_pointer_queue1, $last_pointer_queue2, $last_daily_digest, $last_weekly_digest);
    $statement->fetch();
    $statement->close();
    return $pointer ? array($pointer, $cron_status, $last_pointer, $last_pointer_queue1, $last_pointer_queue2, $last_daily_digest, $last_weekly_digest) : false;
}

function swearword_replacing($string)
{
    $fp = fopen("../core/functions/swearwords.txt", "r");
    $alloftheswearwords = json_decode(fread($fp, filesize('../core/functions/swearwords.txt')));
    $totalwords = explode(' ', $string);
    $alloftheswearwords = json_decode(json_encode($alloftheswearwords), True);
    for ($i = 0; $i < count($totalwords); $i++) {
        $words = $totalwords[$i];
        if (isset($alloftheswearwords[$words])) {
            $length = strlen($words);
            $replacebystar = "";
            for ($j = 0; $j < $length - 2; $j++) {
                $replacebystar .= '*';
            }
            $replaceword = substr_replace($words, $replacebystar, 1, -1);
            $totalwords[$i] = $replaceword;
        }

    }
    $returnword = implode(' ', $totalwords);
    return $returnword;
}


function generate_hash_sha256($string)
{
    return b62_from_b16_len_43(hash("sha256", $string . microtime() . htmlentities(base64_encode(openssl_random_pseudo_bytes(mt_rand(32, 256)))) . "", false));
}

function b62_from_b16_len_43($b16)
{
    $b62 = gmp_strval(gmp_init($b16, 16), 62);
    $diff = 43 - strlen($b62);
    if ($diff !== 0) {
        while ($diff--) {
            $b62 = '0' . $b62;
        }
    }
    return $b62;
}


//UPDATE IMAGE
function update_image($images_pointer, $update_data)
{
    $fields = $value_array = array();
    $imageparamtype = get_imageparam_array();
    $bindtype = "";
    foreach ($update_data as $k => &$val) {
        $fields[] = '`' . $k . '`=?';
        $value_array[] = &$val;
        $bindtype = $bindtype . $imageparamtype[$k];
    }
    $fields = implode(', ', $fields);
    $value_array[] = &$images_pointer;
    $bindtype = $bindtype . 'i';
    array_unshift($value_array, $bindtype);
    $statement = Db_connect::getInstance()->getConnection()->prepare("UPDATE `images` SET " . $fields . " WHERE `pointer` = ?");
    call_user_func_array(array($statement, 'bind_param'), $value_array);
    $statement->execute();
    $affected_rows = $statement->affected_rows;
    $statement->close();
    image_queue_update($images_pointer, $fields, $value_array);
    return $affected_rows;
}

function get_imageparam_array()
{
    $imageparamtype = array('pointer' => 'i', 'images_pointer' => 'i', 'imagename' => 's', 'recorded' => 'i', 'banstatus' => 'i', 'originalcrypthash' => 's', 'phash_0deg' => 's', 'phash_0deg_hor' => 's', 'phash_90deg' => 's', 'phash_90deg_hor' => 's', 'phash_180deg' => 's', 'phash_180deg_hor' => 's', 'phash_270deg' => 's', 'phash_270deg_hor' => 's', 'nuditycheckstatus' => 'i', 'sfw' => 'd', 'nsfw' => 'd', 'general_properties' => 's', 'celebrity_match' => 's', 'logo_info' => 's', 'travel_info' => 's', 'food_info' => 's', 'demographic_data' => 's', 'ip_pointer' => 'i', 'time' => 's', 'time_offset' => 'd');
    return $imageparamtype;
}

function image_queue_update($images_pointer, $fields, $value_array)
{
    $cron_status = get_cronjob_status('images');
    $insertion_table = get_update_queue_table('images', $cron_status);
    $selected_table = get_table_name_where_pointer_exists_new('images', $images_pointer, $cron_status);
    if ($selected_table == false) {
        return false;
    } else {
        $db = Db_connect::getInstance()->getConnection();
        $field_list = " `images_pointer`, `imagename`, `recorded`, `banstatus`, `originalcrypthash`, `phash_0deg`, `phash_0deg_hor`, `phash_90deg`, `phash_90deg_hor`, `phash_180deg`, `phash_180deg_hor`, `phash_270deg`, `phash_270deg_hor`, `nuditycheckstatus`, `sfw`, `nsfw`, `general_properties`, `celebrity_match`, `logo_info`, `travel_info`, `food_info`, `demographic_data`, `ip_pointer`, `time`, `time_offset`";
        if ($insertion_table !== $selected_table) {
            $statement = $db->prepare("INSERT INTO `$insertion_table` ($field_list) SELECT $field_list FROM `$selected_table` WHERE `images_pointer` = ?");
            $statement->bind_param('i', $images_pointer);
            $statement->execute();
            $statement->close();
        }
        $statement = $db->prepare("UPDATE `$insertion_table` SET " . $fields . " WHERE `images_pointer` = ?");
        call_user_func_array(array($statement, 'bind_param'), $value_array);
        $statement->execute();
        $statement->close();
    }
}

function images_pointer_from_imagick_crypthash($inputtext, $post)
{
    $db = Db_connect::getInstance()->getConnection();
    $cron_status = get_cronjob_status('images');
    $tables = get_index_first_selection_tables_with_updates('images', $cron_status);
    $total_tables = count($tables);
    $final_data = array();
    for ($i = 0; $i < $total_tables; $i++) {
        $images_pointer = $imagename = $recorded = $banstatus = null;
//        echo "SELECT `images_pointer`,`imagename`,`recorded`,`banstatus` FROM `" . $tables[$i] . "` WHERE `imagick_crypthash` = `" . $inputtext . "`";
        $st = $db->prepare("SELECT `images_pointer`,`imagename`,`recorded`,`banstatus` FROM `" . $tables[$i] . "` WHERE `imagick_crypthash` = ?");


//        echo "SELECT `images_pointer`,`imagename`,`recorded`,`banstatus` FROM `" . $tables[$i] . "` WHERE `imagick_crypthash` = $inputtext";

        $st->bind_param('s', $inputtext);
        $st->execute();
        $st->bind_result($images_pointer, $imagename, $recorded, $banstatus);
        $st->fetch();
        $final_data = array(
            'images_pointer' => $images_pointer,
            'imagename' => $imagename,
            'recorded' => $recorded,
            'banstatus' => $banstatus);
        $st->close();
        if ($images_pointer != null) break;
    }
    if (!empty($final_data['images_pointer'])) {
        if ($final_data['banstatus'] == 1) {
            return 'bannedimage';
        } else {
            $imagename = $final_data['imagename'];
            if ($final_data['recorded'] == 0) {
                $update_data = ['recorded' => 1];
                update_image($final_data['images_pointer'], $update_data);
                if ($post == "user" || $post == "userdragged") {

                    rename($GLOBALS['RML_SERVER_ROOT'] . "/images/archivedimages/" . $imagename, $GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $imagename);

                } else if ($post == "list" || $post == "item") {
                    rename($GLOBALS['RML_SERVER_ROOT'] . "/images/archivedimages/" . $imagename, $GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $imagename);
                } else if ($post == "coverimage") {
                    rename($GLOBALS['RML_SERVER_ROOT'] . "/images/archivedimages/" . $imagename, $GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $imagename);
                } else if ($post == 'multimedia_contributions') {
//                    rename($GLOBALS['RML_SERVER_ROOT'] . "/images/contributionimages/" . $imagename, $GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $imagename);

                    rename('C:/xampp/htdocs/rank/rankmylist/images/contributionimages/' . $imagename, 'C:/xampp/htdocs/rank/rankmylist/images/raw/'. $imagename);
                }
            }
            return $final_data;
        }
    }
}


function rml_file_exist($foldername, $filename)
{
//    $path = $GLOBALS['RML_SERVER_ROOT'] . "/" . $foldername . "/" . $filename;
    $path = 'C:/xampp/htdocs/rank/rankmylist' . "/" . $foldername . "/" . $filename;
    return file_exists($path) == 1 ? true : false;
}



function getMimeType($filePath) {

    if (!is_file($filePath)) {

        return false;

    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);

    $mime = finfo_file($finfo, $filePath);

    finfo_close($finfo);

    return $mime;

}
function is_GIF_safe($filename)
{
    if (GifFrameExtractor::isAnimatedGif($filename)) {
        $opts = array('http' =>
            array(
                'method' => 'POST',
                'header' => array('Content-type: application/x-www-form-urlencoded', 'Custom-header: check'),
                'timeout' => 60
            )
        );
        $context = stream_context_create($opts);
        if (!($fh = @fopen($filename, 'rb')) && !($fh = @fopen($filename, 'rb', false, $context))) {
            return false;
        }
        $count = 0;
        while (!feof($fh) && $count < 2) {
            $chunk = fread($fh, 1024 * 100); //read 100kb at a time
            $count += preg_match_all('#\x00\x21\xF9\x04.{4}\x00(\x2C|\x21)#s', $chunk, $matches);
        }
        fclose($fh);
        return $count > 1;
    } else {
        return true;
    }
}

function getExtensionToMimeTypeMapping()
{
    return array(
        'ai' => 'application/postscript',
        'aif' => 'audio/x-aiff',
        'aifc' => 'audio/x-aiff',
        'aiff' => 'audio/x-aiff',
        'anx' => 'application/annodex',
        'asc' => 'text/plain',
        'au' => 'audio/basic',
        'avi' => 'video/x-msvideo',
        'axa' => 'audio/annodex',
        'axv' => 'video/annodex',
        'bcpio' => 'application/x-bcpio',
        'bin' => 'application/octet-stream',
        'bmp' => 'image/bmp',
        'bmp' => 'image/x-ms-bmp',
        'c' => 'text/plain',
        'cc' => 'text/plain',
        'ccad' => 'application/clariscad',
        'cdf' => 'application/x-netcdf',
        'class' => 'application/octet-stream',
        'cpio' => 'application/x-cpio',
        'cpt' => 'application/mac-compactpro',
        'csh' => 'application/x-csh',
        'css' => 'text/css',
        'csv' => 'text/csv',
        'dcr' => 'application/x-director',
        'dir' => 'application/x-director',
        'dms' => 'application/octet-stream',
        'doc' => 'application/msword',
        'drw' => 'application/drafting',
        'dvi' => 'application/x-dvi',
        'dwg' => 'application/acad',
        'dxf' => 'application/dxf',
        'dxr' => 'application/x-director',
        'eps' => 'application/postscript',
        'etx' => 'text/x-setext',
        'exe' => 'application/octet-stream',
        'ez' => 'application/andrew-inset',
        'f' => 'text/plain',
        'f90' => 'text/plain',
        'flac' => 'audio/flac',
        'fli' => 'video/x-fli',
        'flv' => 'video/x-flv',
        'gif' => 'image/gif',
        'gtar' => 'application/x-gtar',
        'gz' => 'application/x-gzip',
        'h' => 'text/plain',
        'hdf' => 'application/x-hdf',
        'hh' => 'text/plain',
        'hqx' => 'application/mac-binhex40',
        'htaccess' => 'text/htaccess',
        'htm' => 'text/html',
        'html' => 'text/html',
        'ice' => 'x-conference/x-cooltalk',
        'ief' => 'image/ief',
        'iges' => 'model/iges',
        'igs' => 'model/iges',
        'ips' => 'application/x-ipscript',
        'ipx' => 'application/x-ipix',
        'jpe' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'jpg' => 'image/jpeg',
        'js' => 'application/x-javascript',
        'kar' => 'audio/midi',
        'latex' => 'application/x-latex',
        'lha' => 'application/octet-stream',
        'lsp' => 'application/x-lisp',
        'lzh' => 'application/octet-stream',
        'm' => 'text/plain',
        'man' => 'application/x-troff-man',
        'me' => 'application/x-troff-me',
        'mesh' => 'model/mesh',
        'mid' => 'audio/midi',
        'midi' => 'audio/midi',
        'mif' => 'application/vnd.mif',
        'mime' => 'www/mime',
        'mov' => 'video/quicktime',
        'movie' => 'video/x-sgi-movie',
        'mp2' => 'audio/mpeg',
        'mp3' => 'audio/mpeg',
        'mpe' => 'video/mpeg',
        'mpeg' => 'video/mpeg',
        'mpg' => 'video/mpeg',
        'mpga' => 'audio/mpeg',
        'ms' => 'application/x-troff-ms',
        'msh' => 'model/mesh',
        'nc' => 'application/x-netcdf',
        'oga' => 'audio/ogg',
        'ogg' => 'audio/ogg',
        'ogv' => 'video/ogg',
        'ogx' => 'application/ogg',
        'oda' => 'application/oda',
        'pbm' => 'image/x-portable-bitmap',
        'pdb' => 'chemical/x-pdb',
        'pdf' => 'application/pdf',
        'pgm' => 'image/x-portable-graymap',
        'pgn' => 'application/x-chess-pgn',
        'png' => 'image/png',
        'pnm' => 'image/x-portable-anymap',
        'pot' => 'application/mspowerpoint',
        'ppm' => 'image/x-portable-pixmap',
        'pps' => 'application/mspowerpoint',
        'ppt' => 'application/mspowerpoint',
        'ppz' => 'application/mspowerpoint',
        'pre' => 'application/x-freelance',
        'prt' => 'application/pro_eng',
        'ps' => 'application/postscript',
        'qt' => 'video/quicktime',
        'ra' => 'audio/x-realaudio',
        'ram' => 'audio/x-pn-realaudio',
        'ras' => 'image/cmu-raster',
        'rgb' => 'image/x-rgb',
        'rm' => 'audio/x-pn-realaudio',
        'roff' => 'application/x-troff',
        'rpm' => 'audio/x-pn-realaudio-plugin',
        'rtf' => 'text/rtf',
        'rtx' => 'text/richtext',
        'scm' => 'application/x-lotusscreencam',
        'set' => 'application/set',
        'sgm' => 'text/sgml',
        'sgml' => 'text/sgml',
        'sh' => 'application/x-sh',
        'shar' => 'application/x-shar',
        'silo' => 'model/mesh',
        'sit' => 'application/x-stuffit',
        'skd' => 'application/x-koan',
        'skm' => 'application/x-koan',
        'skp' => 'application/x-koan',
        'skt' => 'application/x-koan',
        'smi' => 'application/smil',
        'smil' => 'application/smil',
        'snd' => 'audio/basic',
        'sol' => 'application/solids',
        'spl' => 'application/x-futuresplash',
        'spx' => 'audio/ogg',
        'src' => 'application/x-wais-source',
        'step' => 'application/STEP',
        'stl' => 'application/SLA',
        'stp' => 'application/STEP',
        'sv4cpio' => 'application/x-sv4cpio',
        'sv4crc' => 'application/x-sv4crc',
        'swf' => 'application/x-shockwave-flash',
        't' => 'application/x-troff',
        'tar' => 'application/x-tar',
        'tcl' => 'application/x-tcl',
        'tex' => 'application/x-tex',
        'texi' => 'application/x-texinfo',
        'texinfo' => 'application/x-texinfo',
        'tif' => 'image/tiff',
        'tiff' => 'image/tiff',
        'tr' => 'application/x-troff',
        'tsi' => 'audio/TSP-audio',
        'tsp' => 'application/dsptype',
        'tsv' => 'text/tab-separated-values',
        'txt' => 'text/plain',
        'unv' => 'application/i-deas',
        'ustar' => 'application/x-ustar',
        'vcd' => 'application/x-cdlink',
        'vda' => 'application/vda',
        'viv' => 'video/vnd.vivo',
        'vivo' => 'video/vnd.vivo',
        'vrml' => 'model/vrml',
        'wav' => 'audio/x-wav',
        'wrl' => 'model/vrml',
        'xbm' => 'image/x-xbitmap',
        'xlc' => 'application/vnd.ms-excel',
        'xll' => 'application/vnd.ms-excel',
        'xlm' => 'application/vnd.ms-excel',
        'xls' => 'application/vnd.ms-excel',
        'xlw' => 'application/vnd.ms-excel',
        'xml' => 'application/xml',
        'xpm' => 'image/x-xpixmap',
        'xspf' => 'application/xspf+xml',
        'xwd' => 'image/x-xwindowdump',
        'xyz' => 'chemical/x-pdb',
        'zip' => 'application/zip',
    );
}

function get_phash_crypthash_for_image_imagick_without_gd($source_imgk, $post, $session_users_pointer, $scrambledfilename, $nuditycheckstatus, $ip)
{
//    $data = get_ip_time_location();
    $data = $ip;
    $phasher = new Phash;
    $imagick = new Imagick();
    $imagick->readImageBlob($source_imgk);
    $imgk_crypthash = hash("sha256", $source_imgk, false);
    $image_data = images_pointer_from_imagick_crypthash($imgk_crypthash, $post);
    if ($image_data["banstatus"] == 1) {
        return 'bannedimage';
    } else {
        $image_id = $image_data['images_pointer'];
        $image_name = $image_data['imagename'];
        $recorded = $image_data['recorded'];
        if ($image_id) {
//            print("Image exist in database");
            if (rml_file_exist('images/raw/', $image_name)) {

//                print("image exist in folder");
                if ($post == "user") {
                    return array('userid' => $session_users_pointer, 'filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "userdragged") {
                    return array('userid' => $session_users_pointer, 'filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "list") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "item") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "coverimage") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "multimedia_contributions") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                }
            } else {
//                print("Image doesnt exist in folder");

//                $imagick->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $image_name);
                $imagick->writeImage('C:/xampp/htdocs/rank/rankmylist/images/raw/' . $image_name);
                if ($post == "user") {
                    return array('userid' => $session_users_pointer, 'filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "userdragged") {
                    return array('userid' => $session_users_pointer, 'filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "list") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "item") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "coverimage") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                } else if ($post == "multimedia_contributions") {
                    return array('filename' => $image_name, 'image_id' => $image_id);
                }
            }
        } else {

//            print("Image doesnot exist in database");
            $imagearray_imgk = array();
            $imagearray_imgk[0] = (string)$phasher->getHash_imgk($source_imgk);

            //HORIZONTAL
            $imagick->flopImage();
            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[2] = (string)$phasher->getHash_imgk($source_imgk);
            $imagick->rotateImage(new ImagickPixel(), 90);

            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[11] = (string)$phasher->getHash_imgk($source_imgk);   // 11
            $imagick->rotateImage(new ImagickPixel(), 90);

            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[8] = (string)$phasher->getHash_imgk($source_imgk);
            $imagick->rotateImage(new ImagickPixel(), 90);

            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[5] = (string)$phasher->getHash_imgk($source_imgk); // 5

            //HORIZONTAL
            $imagick->flopImage();
            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[3] = (string)$phasher->getHash_imgk($source_imgk);  //3
            $imagick->rotateImage(new ImagickPixel(), 90);
            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[6] = (string)$phasher->getHash_imgk($source_imgk);
            $imagick->rotateImage(new ImagickPixel(), 90);
            $source_imgk = $imagick->getImageBlob();
            $imagearray_imgk[9] = (string)$phasher->getHash_imgk($source_imgk);  // 9
            $imagick->rotateImage(new ImagickPixel(), 90);
            $source_imgk = $imagick->getImageBlob();
            $scrambledfilename = $scrambledfilename . '.' . 'jpg';
            $imagick->setInterlaceScheme(Imagick::INTERLACE_PLANE);
//            $imagick->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $scrambledfilename);
            $imagick->writeImage('C:/xampp/htdocs/rank/rankmylist/images/raw/' . $scrambledfilename);

            $imagick->clear();
            $imagick->destroy();
//            print_r($imagearray_imgk);

            if ($post == "user") {
//                $scrambledfilename = $scrambledfilename . '.' . 'jpg';
//                $imagick->setInterlaceScheme(Imagick::INTERLACE_PLANE);
//                $imagick->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $scrambledfilename);
//                $imagick->clear();
//                $imagick->destroy();
                if (rml_file_exist('images/raw/', $scrambledfilename)) {
                    $image_name = $scrambledfilename;
                    $image_name = sanitize($image_name);
                    $imgk_crypthash = sanitize($imgk_crypthash);
//                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $data, $nuditycheckstatus);
                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $nuditycheckstatus, $ip);
                    $imgk_phash_array = array_values(array_filter($imagearray_imgk));
                    $image_id = sanitize($image_id);
                    array_walk($imgk_phash_array, "array_sanitize");
                    record_phash_new_imagick_without_gd($imgk_phash_array, $image_id);
                    return array('userid' => $session_users_pointer, 'filename' => $scrambledfilename, 'image_id' => $image_id);
                } else {
                    return array('userid' => $session_users_pointer, 'filename' => '', 'image_id' => '');
                }
            } else if ($post == "userdragged") {

                if (rml_file_exist('images/raw/', $scrambledfilename)) {
                    $image_name = $scrambledfilename;
                    $image_name = sanitize($image_name);
                    $imgk_crypthash = sanitize($imgk_crypthash);
//                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $data, $nuditycheckstatus);

                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $nuditycheckstatus, $ip);
                    $imgk_phash_array = array_values(array_filter($imagearray_imgk));
                    $image_id = sanitize($image_id);
                    array_walk($imgk_phash_array, "array_sanitize");
                    record_phash_new_imagick_without_gd($imgk_phash_array, $image_id);
                    return array('userid' => $session_users_pointer, 'filename' => $scrambledfilename, 'image_id' => $image_id);
                } else {
                    return array('userid' => $session_users_pointer, 'filename' => '', 'image_id' => '');
                }
            } else if ($post == "coverimage") {

                if (rml_file_exist('images/raw/', $scrambledfilename)) {
                    $image_name = $scrambledfilename;
                    $image_name = sanitize($image_name);
                    $imgk_crypthash = sanitize($imgk_crypthash);
//                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $data, $nuditycheckstatus);
                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $nuditycheckstatus, $ip);
                    $imgk_phash_array = array_values(array_filter($imagearray_imgk));
                    $image_id = sanitize($image_id);
                    array_walk($imgk_phash_array, "array_sanitize");
                    record_phash_new_imagick_without_gd($imgk_phash_array, $image_id);
                    return array('filename' => $scrambledfilename, 'image_id' => $image_id);
                } else {
                    return array('filename' => '');

                }
            } else if ($post == "list") {
//                $scrambledfilename = $scrambledfilename . '.' . 'jpg';
//                $imagick->setInterlaceScheme(Imagick::INTERLACE_PLANE);
//                $imagick->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/raw/" . $scrambledfilename);
//                $imagick->clear();
//                $imagick->destroy();
//                var_test_die($scrambledfilename);
                if (rml_file_exist('images/raw/', $scrambledfilename)) {
                    $image_name = $scrambledfilename;
                    $image_name = sanitize($image_name);
                    $imgk_crypthash = sanitize($imgk_crypthash);
//                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $data, $nuditycheckstatus);
                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $nuditycheckstatus, $ip);
                    $imgk_phash_array = array_values(array_filter($imagearray_imgk));
                    $image_id = sanitize($image_id);
                    array_walk($imgk_phash_array, "array_sanitize");
                    record_phash_new_imagick_without_gd($imgk_phash_array, $image_id);
                    return array('filename' => $scrambledfilename, 'image_id' => $image_id);
                } else {
                    return array('filename' => '');

                }
            } else if ($post == "item") {

                if (rml_file_exist('images/raw/', $scrambledfilename)) {
                    $image_name = $scrambledfilename;
                    $image_name = sanitize($image_name);
                    $imgk_crypthash = sanitize($imgk_crypthash);
//                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $data, $nuditycheckstatus);

                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $nuditycheckstatus, $ip);
                    $imgk_phash_array = array_values(array_filter($imagearray_imgk));
                    $image_id = sanitize($image_id);
                    array_walk($imgk_phash_array, "array_sanitize");
                    record_phash_new_imagick_without_gd($imgk_phash_array, $image_id);
                    return array('filename' => $scrambledfilename, 'image_id' => $image_id);
                } else {
                    return array('filename' => '');
                }
            } else if ($post == "multimedia_contributions") {

                if (rml_file_exist('images/raw/', $scrambledfilename)) {


//                    print("after datbase entry , file exist in database");
                    $image_name = $scrambledfilename;
//                    print ($image_name);
                    $image_name = sanitize($image_name);
                    $imgk_crypthash = sanitize($imgk_crypthash);
//                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, $data, $nuditycheckstatus);


                    $image_id = record_image_data_new_imagick_without_gd($image_name, $imgk_crypthash, $imagearray_imgk, 4, $ip);
                    $imgk_phash_array = array_values(array_filter($imagearray_imgk));
                    $image_id = sanitize($image_id);
//                    print_r($imgk_phash_array);
                    array_walk($imgk_phash_array, "array_sanitize");
//                    print_r( array_walk($imgk_phash_array, "array_sanitize"));
                    record_phash_new_imagick_without_gd($imgk_phash_array, $image_id);
                    return array('filename' => $scrambledfilename, 'image_id' => $image_id);
                } else {
                    return array('filename' => '');
                }
            }

        }
    }

}

function array_sanitize(&$item)
{
    $db = Db_connect::getInstance()->getConnection();
    $item = htmlentities(strip_tags(mysqli_real_escape_string($db, $item)));
}

function record_phash_new_imagick($phash_imgk, $images_pointer, $phash_gd)
{
    $db = Db_connect::getInstance()->getConnection();
    ksort($phash_imgk);
    ksort($phash_gd);
    for ($i = 0; $i < count($phash_imgk); $i++) {
        $statement = $db->prepare("INSERT INTO `imagephash` (`imagick_phash`, `phash`, `images_pointer`) VALUES (?, ?, ?)");
        $statement->bind_param('ssi', $phash_imgk[$i], $phash_gd[$i], $images_pointer);
        $statement->execute();
        $statement->close();
//        $queue_table= get_insertion_queue_table('imagephash');
//        $statement1 = $db->prepare("INSERT INTO `$queue_table` (`phash`,`images_pointer`) VALUES (?, ?)");
//        if($statement1 === false) {
//            //dashboard
//        }
//        $statement1->bind_param("si",$phash[$i],$images_pointer);
//        $statement1->execute();
//        $statement1->close();
    }
    return true;
}

function record_phash_new_imagick_without_gd($phash_imgk, $images_pointer)
{
//    print_r($phash_imgk);
    $db = Db_connect::getInstance()->getConnection();
    ksort($phash_imgk);
    for ($i = 0; $i < count($phash_imgk); $i++) {
        $statement = $db->prepare("INSERT INTO `imagephash` (`imagick_phash`, `images_pointer`) VALUES (?, ?)");
        $statement->bind_param('si', $phash_imgk[$i], $images_pointer);
        $statement->execute();
        $statement->close();
    }
    return true;
}

function record_image_data_new_imagick_without_gd($filename, $crypthash_imgk, $phash_imgk, $nuditycheckstatus, $ip)
{

    $mysqli = Db_connect::getInstance()->getConnection();
    $statement = $mysqli->prepare("INSERT INTO images (`imagename`,`imagick_crypthash`,`phash_0deg`,`phash_0deg_hor`,`phash_90deg`,`phash_90deg_hor`,`phash_180deg`,`phash_180deg_hor`,`phash_270deg`,`phash_270deg_hor`,`nuditycheckstatus`,`ip_pointer`, `time`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");

    if ($statement === false) {
        //dashboard
    }
    $statement->bind_param('ssssssssssii', $filename, $crypthash_imgk, $phash_imgk[0], $phash_imgk[2], $phash_imgk[3], $phash_imgk[5], $phash_imgk[6], $phash_imgk[8], $phash_imgk[9], $phash_imgk[11], $nuditycheckstatus, $ip);
    $statement->execute();
    $images_pointer = $statement->insert_id;
    $statement->close();
    if (empty($images_pointer) == false) {
        $queue_table = get_insertion_queue_table('images');
        $db = Db_connect::getInstance()->getConnection();
        $statement1 = $db->prepare("INSERT INTO `$queue_table` (`images_pointer`,`imagename`,`imagick_crypthash`,`phash_0deg`,`phash_0deg_hor`,`phash_90deg`,`phash_90deg_hor`,`phash_180deg`,`phash_180deg_hor`,`phash_270deg`,`phash_270deg_hor`,`nuditycheckstatus`,`ip_pointer`, `time`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        if ($statement1 === false) {
            //dashboard
        }
        $statement1->bind_param('issssssssssii', $images_pointer, $filename, $crypthash_imgk, $phash_imgk[0], $phash_imgk[2], $phash_imgk[3], $phash_imgk[5], $phash_imgk[6], $phash_imgk[8], $phash_imgk[9], $phash_imgk[11], $nuditycheckstatus, $ip);
        $statement1->execute();
        $statement1->close();
    }
    return $images_pointer;
}


function getHash_imgk($image_object, $asstring = true)
{
    $scale = 8;//todo, allow scale specification
    $product = $scale * $scale;
    $imagick_phash = new Imagick();
    $imagick_phash->readImageBlob($image_object);
    $img = $imagick_phash;
    if (!$img) {
        return 'failed to load ' . $image_object;
    }

    $hw = $img->getImageGeometry();
    $width = $hw['width'];
    $height = $hw['height'];
    if ($width != $scale || $height !== $scale) {
        //stretch resize to ensure better/accurate comparison
        $img->thumbnailImage($scale, $scale);
    }
    $averageValue = 0;

    for ($y = 0; $y < $scale; $y++) {
        for ($x = 0; $x < $scale; $x++) {
            // get the rgb value for current pixel

            $pixel = $img->getImagePixelColor($x, $y);
            $colors = $pixel->getColor();
            $red = $colors['r'];
            $green = $colors['g'];
            $blue = $colors['b'];
            $gray = $red + $blue + $green;
            $gray /= 12;
            $gray = floor($gray);
            $grayscale[$x + ($y * $scale)] = $gray;
            $averageValue += $gray;
        }
    }
    $averageValue /= $product;
    $averageValue = floor($averageValue);

    $phash = array_fill(0, $product, 0);
    for ($i = 0; $i < $product; $i++) {
        $rgb = $grayscale[$i];
        if ($rgb >= $averageValue) {
            $this->leftShift($phash, 1, ($product - $i));
        }
    }

    #free memory
    $imagick_phash->destroy();
    $imagick_phash->clear();

    if ($asstring) {
        return $this->hashAsString($phash);
    }
    return $phash;
}

class Phash
{

    protected $bitCounts = array(0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3,
        2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3,
        4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3,
        3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3,
        4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
        2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5,
        6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5,
        5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5,
        6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8);

    /**
     * |---------------------------------------------------------------------
     * | Returns a percentage similarity using the bitCount method.
     * | This should be similar to but faster than hamming distance but
     * | will not work out of the box for scales above 8x8
     * |---------------------------------------------------------------------
     * @param $hash1
     * @param $hash2
     * @param string $method
     * @return int percentage similarity
     */
    public function getSimilarity($hash1, $hash2, $method = 'HAMMING')
    {
        switch ($method) {
            case "HAMMING":
                return $this->getSimilarityHamming($hash1, $hash2);
            case "BITS":
                return $this->getSimilarityBits($hash1, $hash2);
        }
    }

    public function getSimilarityHamming($hash1, $hash2, $precision = 1)
    {
//        if(is_array($hash1))
//        {
//            $similarity = count($hash1);
//
//            // take the hamming distance between the hashes.
//            foreach($hash1 as $key=>$val)
//            {
//                if($hash1[$key] != $hash2[$key])
//                {
//                    $similarity--;
//                }
//            }
//            $percentage = round(($similarity/count($hash1)*100), $precision);
//            return $percentage;
//        }
        if (is_string($hash1) && is_string($hash2)) {

            $similarity = $disimilarity = strlen($hash1);
            // take the hamming distance between the strings.
            for ($i = 0; $i < strlen($hash1); $i++) {
                if ($hash1[$i] != $hash2[$i]) {
                    $similarity--;
                }
            }
            $disimilarity = $disimilarity - $similarity;
            return $disimilarity;
//            $percentage = round(($similarity/strlen($hash1)*100), $precision);
//            return $percentage;
        }
    }

    public function getSimilarityBits($hash1, $hash2)
    {
        if (is_array($hash1)) {
            $hash1 = hexdec($this->hashAsString($hash1));
            $hash2 = hexdec($this->hashAsString($hash2));
        } elseif (is_string($hash1)) {
            //convert to float
            $hash1 = (int)$hash1;
            $hash2 = (int)$hash2;
        }
        //Get count of bits that are set in $hash1 or $hash2 but not both are set
        $count = $this->bitCount(abs($hash1 ^ $hash2));
        //subtract count to get similar bits, and use to compute percentage similarity
        $result = ((64 - $count) / 64.0) * 100;
        return (int)$result;
    }

    // compare hash strings (no rotation)
    // this assumes the strings will be the same length, which they will be
    // as hashes.

    public function hashAsString($hash, $hex = true)
    {
        $i = 0;
        $bucket = null;
        $result = null;
        if ($hex == true) {
            foreach ($hash as $bit) {
                $i++;
                $bucket .= $bit;
                if ($i == 4) {
                    $result .= dechex(bindec($bucket));
                    $i = 0;
                    $bucket = null;
                }
            }
            return $result;
        }
        return implode(null, $hash);
    }

    /* return a perceptual hash as a string. Hex or binary. */

    function bitCount($num)
    {
        $num += 0;
        $count = 0;
        for (; $num > 0; $num >>= 8) $count += $this->bitCounts[($num & 0xff)];
        return $count;
    }

    /**
     * |---------------------------------------------------------------------
     * | PHP implementation of the AverageHash algorithm for dct based phash
     * | Accepts PNG or JPEG images
     * |---------------------------------------------------------------------
     * @param string full path to the file
     * @param bool $asstring
     * @return computed hash
     */
//    public function getHash($image_object, $asstring = true)
//    {
//        $scale = 8;//todo, allow scale specification
//        $product = $scale * $scale;
//        $img = $image_object;
//        if (!$img) {
//            // error, unsupported format.
//            $supportedFormats = '';
//            $needle = 'Support';
//            $needleLen = strlen($needle);
//            foreach (gd_info() as $key => $val) {
//                if (!$val || strlen($key) <= $needleLen || substr($key, -$needleLen) !== $needle) {
//                    continue;
//                }
//                $supportedFormats .= trim(substr($key, 0, strlen($key) - $needleLen)) . ', ';
//            }
//            $supportedFormats = rtrim($supportedFormats, ', ');
//            return 'the image format is not supported. supported formats: ' . $supportedFormats;
//        }
//
//        //test image for same size
//        $width = imagesx($img);
//        $height = imagesy($img);
//        if ($width != $scale || $height !== $scale) {
//            //stretch resize to ensure better/accurate comparison
//            $img = $this->makeThumbnail($img, $scale, $scale, $width, $height);
//        }
//        $averageValue = 0;
//        for ($y = 0; $y < $scale; $y++) {
//            for ($x = 0; $x < $scale; $x++) {
//                // get the rgb value for current pixel
//                $rgb = ImageColorAt($img, $x, $y);
//                // extract each value for r, g, b
//                $red = ($rgb & 0xFF0000) >> 16;
//                $green = ($rgb & 0x00FF00) >> 8;
//                $blue = ($rgb & 0x0000FF);
//                $gray = $red + $blue + $green;
//                $gray /= 12;
//                $gray = floor($gray);
//                $grayscale[$x + ($y * $scale)] = $gray;
//                $averageValue += $gray;
//            }
//        }
//        $averageValue /= $product;
//        $averageValue = floor($averageValue);
//        $hash = 0;
//
//        $phash = array_fill(0, $product, 0);
//        for ($i = 0; $i < $product; $i++) {
//            $rgb = $grayscale[$i];
//            if ($rgb >= $averageValue) {
//                $this->leftShift($phash, 1, ($product - $i));
//            }
//        }
//
//        #free memory
////        imagedestroy($img);
//
//        if ($asstring) {
//            return $this->hashAsString($phash);
//        }
//        return $phash;
//    }

    /**
     * |----------------------------------------------------------------------
     * | Creates a thumbnail version of source image in memory.
     * | Please note that this method returns an image object
     * |----------------------------------------------------------------------
     */
//    public function makeThumbnail($img, $thumbwidth, $thumbheight, $width, $height)
//    {
//
//        // Create the image in memory.
//        $finalimg = imagecreatetruecolor($thumbwidth, $thumbheight);
//
//        // Fast copy and resize old image into new image.
//        $this->fastimagecopyresampled($finalimg, $img, 0, 0, 0, 0, $thumbwidth, $thumbheight, $width, $height);
//
//        // release the source object
////        imagedestroy($img);
//
//        return $finalimg;
//    }

//    public function fastimagecopyresampled(&$dst_image, $src_image, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h, $quality = 3)
//    {
//        // Plug-and-Play fastimagecopyresampled function replaces much slower imagecopyresampled.
//        // Just include this function and change all "imagecopyresampled" references to "fastimagecopyresampled".
//        // Typically from 30 to 60 times faster when reducing high resolution images down to thumbnail size using the default quality setting.
//        // Author: Tim Eckel - Date: 09/07/07 - Version: 1.1 - Project: FreeRingers.net - Freely distributable - These comments must remain.
//        //
//        // Optional "quality" parameter (defaults is 3). Fractional values are allowed, for example 1.5. Must be greater than zero.
//        // Between 0 and 1 = Fast, but mosaic results, closer to 0 increases the mosaic effect.
//        // 1 = Up to 350 times faster. Poor results, looks very similar to imagecopyresized.
//        // 2 = Up to 95 times faster.  Images appear a little sharp, some prefer this over a quality of 3.
//        // 3 = Up to 60 times faster.  Will give high quality smooth results very close to imagecopyresampled, just faster.
//        // 4 = Up to 25 times faster.  Almost identical to imagecopyresampled for most images.
//        // 5 = No speedup. Just uses imagecopyresampled, no advantage over imagecopyresampled.
//
//        if (empty($src_image) || empty($dst_image) || $quality <= 0) {
//            return false;
//        }
//        if ($quality < 5 && (($dst_w * $quality) < $src_w || ($dst_h * $quality) < $src_h)) {
//            $temp = imagecreatetruecolor($dst_w * $quality + 1, $dst_h * $quality + 1);
//            imagecopyresized($temp, $src_image, 0, 0, $src_x, $src_y, $dst_w * $quality + 1, $dst_h * $quality + 1, $src_w, $src_h);
//            imagecopyresampled($dst_image, $temp, $dst_x, $dst_y, 0, 0, $dst_w, $dst_h, $dst_w * $quality, $dst_h * $quality);
//            imagedestroy($temp);
//        } else imagecopyresampled($dst_image, $src_image, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);
//        return true;
//    }

    /**
     * |---------------------------------------------------------------------
     * | PHP implementation of the AverageHash algorithm for dct based phash
     * | Accepts PNG or JPEG images
     * |---------------------------------------------------------------------
     * @param string full path to the file
     * @param bool $asstring
     * @return computed hash
     */
    public function getHash_imgk($image_object, $asstring = true)
    {
        $scale = 8;//todo, allow scale specification
        $product = $scale * $scale;
        $imagick_phash = new Imagick();
        $imagick_phash->readImageBlob($image_object);
        $img = $imagick_phash;
        if (!$img) {
            return 'failed to load ' . $image_object;
        }

        $hw = $img->getImageGeometry();
        $width = $hw['width'];
        $height = $hw['height'];
        if ($width != $scale || $height !== $scale) {
            //stretch resize to ensure better/accurate comparison
            $img->thumbnailImage($scale, $scale);
        }
        $averageValue = 0;

        for ($y = 0; $y < $scale; $y++) {
            for ($x = 0; $x < $scale; $x++) {
                // get the rgb value for current pixel

                $pixel = $img->getImagePixelColor($x, $y);
                $colors = $pixel->getColor();
                $red = $colors['r'];
                $green = $colors['g'];
                $blue = $colors['b'];
                $gray = $red + $blue + $green;
                $gray /= 12;
                $gray = floor($gray);
                $grayscale[$x + ($y * $scale)] = $gray;
                $averageValue += $gray;
            }
        }
        $averageValue /= $product;
        $averageValue = floor($averageValue);

        $phash = array_fill(0, $product, 0);
        for ($i = 0; $i < $product; $i++) {
            $rgb = $grayscale[$i];
            if ($rgb >= $averageValue) {
                $this->leftShift($phash, 1, ($product - $i));
            }
        }

        #free memory
        $imagick_phash->destroy();
        $imagick_phash->clear();

        if ($asstring) {
            return $this->hashAsString($phash);
        }
        return $phash;
    }

    // PHASH FUNCTION DONE WITH I M A G I C K

    /**
     * |----------------------------------------------------------------
     * | Performs a left shift on the supplied binary array
     * |----------------------------------------------------------------
     * @param array binary array to perform shift on
     * @param int integer value to shift
     * @param int amount of places to left shift
     */
    function leftShift(&$bin, $val, $places)
    {
        if ($places < 1) return;
        $bin[count($bin) - $places] = $val;
    }

    /**
     * |-----------------------------------------------------------------
     * | Converts supplied bin array to decimal
     * |-----------------------------------------------------------------
     * @param array supplied binary array
     * @return int converted decimal
     */
    function oldBin2Dec($bin)
    {
        $length = count($bin);
        $sum = 0;
        //convert using doubling
        for ($i = 0; $i < $length; $i++) {
            //use string_add if doubling bigger than int32
            if ($i >= 16) {
                $sum = $this->string_add("$sum", "$sum");
                $cr = $bin[$i];
                if ($cr != 0) {
                    $sum = $this->string_add($sum, "$cr");
                }
            } else {
                $sum += $sum + $bin[$i];
            }
        }
        return $sum;
    }

    /**
     * |-----------------------------------------------------------------
     * | Adds any two decimals regardless of their length to bypass int
     * | limitations in PHP
     * |-----------------------------------------------------------------
     * @param int number 1
     * @param int number 2
     * @return string result
     */
    function string_add($a, $b)
    {
        $lena = strlen($a);
        $lenb = strlen($b);
        if ($lena == $lenb) {
            $len = $lena - 1; //any
        } else
            if ($lena > $lenb) {
                $b = str_pad($b, $lena, "0", STR_PAD_LEFT);
                $len = $lena - 1;
            } else
                if ($lenb > $lena) {
                    $a = str_pad($a, $lenb, "0", STR_PAD_RIGHT);
                    $len = $lenb - 1;
                }
        $result = "";
        for ($i = $len, $carry = 0; $i >= 0 || $carry != 0; $i--) {
            $add1 = $i < 0 ? 0 : $a[$i];
            $add2 = $i < 0 ? 0 : $b[$i];
            $add = $add1 + $add2 + $carry;
            if ($add > 9) {
                $carry = 1;
                $add -= 10;
            } else {
                $carry = 0;
            }
            $result .= $add;
        }
        return strrev($result);
    }
}

function e($value){

    return htmlspecialchars($value,ENT_QUOTES,'UTF-8');

}

function remote_file_size_header($url)

{

# Get all header information

    $data = get_headers($url, true);

# Look up validity

    if (isset($data['Content-Length']))

# Return file size

        return (int)$data['Content-Length'];

}

function remote_file_size_curl($url) {

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_NOBODY, 1);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);

    curl_setopt($ch, CURLOPT_HEADER, 0);

    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    curl_setopt($ch, CURLOPT_MAXREDIRS, 3);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    curl_exec($ch);

    $filesize = (string) curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);

    curl_close($ch);

    if ($filesize){

        return $filesize;

    }

}

function unicode_decode($str) {

    return preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', $str);

}

function replace_unicode_escape_sequence($match) {

    return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');

}
function is_imageid_banned_new($images_pointer){
    $db = Db_connect::getInstance()->getConnection();
    $images_pointer = sanitize($images_pointer);
    $images_cron_status = get_cronjob_status('images');
    $selected_images_table = get_index_first_selection_tables_with_updates_without_queue('images', $images_cron_status);
    $selected_images_table_count = count($selected_images_table);
    $pointer = null;
    for ($i = 0; $i < $selected_images_table_count; $i++) {
        $statement1 = $db->prepare("SELECT `pointer` FROM `$selected_images_table[$i]` WHERE `images_pointer` = ? AND `banstatus`= 1");
        $statement1->bind_param('i', $images_pointer);
        $statement1->execute();
        $statement1->bind_result($pointer);
        $statement1->fetch();
        $statement1->close();
        if ($pointer !== null) break;
    }
    return $pointer ? 'bannedimage' : 'notbanned';
}


?>