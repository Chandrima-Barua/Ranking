<?php

function add_lists()
{
    $connection = Db_connect::getInstance()->getConnection();
    $content = $_POST['content'];
    $user_id = $_SESSION['id'];
    $image = '0';
    if ($_FILES != null) {
        if (0 < $_FILES['image']['error']) {
        } else {
            move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $_FILES['image']['name']);
            $image = $_FILES['image']['name'];

        }
    } else {
        $image = null;
    }

    $collect = $connection->prepare("INSERT INTO lists (`content`,`content_censored`,`user_id`,`image`) VALUES (?,?,?,?)");
    $collect->bind_param("ssis", $content, $content, $user_id, $image);
    $last_inserted_id = $connection->insert_id;
    $collect->execute();
    $collect->close();
    return $last_inserted_id;
}

function get_lists($lists_pointer)
{
    $connection = Db_connect::getInstance()->getConnection();
    $final_result = [];
    $query = $connection->prepare("SELECT `id`,`content`,`user_id`,`image` FROM `lists` WHERE `id`= ?");
    $query->bind_param('i', $lists_pointer);
    $query->execute();
    $query->bind_result($final_result['id'], $final_result['content'], $final_result['user_id'], $final_result['image']);
    $query->fetch();
    $query->close();
    return $final_result;

}

function check_content_user($lists_pointer)
{
    if (isset($_GET['lists_pointer']) && !empty($_GET['lists_pointer'])) {
        $connection = Db_connect::getInstance()->getConnection();
        $query = $connection->prepare("SELECT `user_id` FROM `lists` WHERE `id`= ?");
        $query->bind_param('i', $lists_pointer);
        $query->execute();
        $query->bind_result($user_id);
        $query->fetch();
        $query->close();
    }

    if ($_SESSION['id'] === $user_id) {
        return true;
    } else {
        return false;
    }
}
function check_contribution_exist($lists_pointer)
{
    if (isset($_GET['lists_pointer']) && !empty($_GET['lists_pointer'])) {
        $connection = Db_connect::getInstance()->getConnection();
        $query = $connection->prepare("SELECT `id` FROM `multimedia_contributions` WHERE `lists_pointer`= ?");
        $query->bind_param('i', $lists_pointer);
        $query->execute();
        $query->bind_result($id);
        $query->fetch();
        $query->close();
    }
        return $id;
}
function content_user($lists_pointer)
{
    $connection = Db_connect::getInstance()->getConnection();
    $query = $connection->prepare("SELECT `user_id` FROM `lists` WHERE `id`= ?");
    $query->bind_param('i', $lists_pointer);
    $query->execute();
    $query->bind_result($content_user_id);
    $query->fetch();
    $query->close();
    return $content_user_id;
}

function user_name($id)
{
    $connection = Db_connect::getInstance()->getConnection();
    $query = $connection->prepare("SELECT `username` FROM `users` WHERE `id`= ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->bind_result($username);
    $query->fetch();
    $query->close();
    return $username;
}

function get_contribution_user_id($contribution_type, $id)
{
    $connection = Db_connect::getInstance()->getConnection();
    $query = $connection->prepare("SELECT `user_id` FROM `$contribution_type` WHERE `id`= ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->bind_result($user_id);
    $query->fetch();
    $query->close();
    return $user_id;

}
function get_contribution_last_id($contribution_type)
{
    $connection = Db_connect::getInstance()->getConnection();
    $query = $connection->prepare("SELECT max(`id`) FROM `$contribution_type`");
    $query->execute();
    $query->bind_result($id);
    $query->fetch();
    $query->close();
    return $id;

}
function contri_selection($contribution_type,$contributions_pointer)
{
    $connection = Db_connect::getInstance()->getConnection();
    $selected = 1;
    $result = $connection->prepare("SELECT COUNT(`id`) AS ids FROM `$contribution_type`  WHERE `id`=? AND selected = ?");
    $result->bind_param('ii', $contributions_pointer, $selected);
    $result->execute();
    $result->bind_result($count);
    $result->fetch();
    $result->close();
    if ((int)$count === 1) {
        return true;
    } else {
        return false;
    }
}

function has_contributionselected($contribution_type, $lists_pointer)
{
    $connection = Db_connect::getInstance()->getConnection();
    $select = 1;
    $result = $connection->prepare("SELECT COUNT(`selected`) AS sel FROM `$contribution_type`  WHERE lists_pointer= ? AND selected = ?");
    $result->bind_param('ii', $lists_pointer, $select);
    $result->execute();
    $result->bind_result($count);
    $result->fetch();
    $result->close();

    if ((int)$count === 0) {
        return true;
    } else {
        return false;
    }
}


function has_like_before_return_boolean($contribution_type, $contributions_pointer, $user_id)
{
    $table = $contribution_type . 'likedislike';
    $pointer = $contribution_type . '_pointer';
    $connection = Db_connect::getInstance()->getConnection();
    $result = $connection->prepare("SELECT `like_status` FROM `$table` WHERE $pointer = ? AND user_id=? ORDER BY id DESC LIMIT 1");
    $result->bind_param('ii', $contributions_pointer, $user_id);
    $result->execute();
    $result->bind_result($likes);
    $result->fetch();
    $result->close();
    if ((int)$likes === 1) {
        return true;
    } else {
        return false;
    }

}

function has_dislike_before_return_boolean($contribution_type, $contributions_pointer, $user_id)
{
    $table = $contribution_type . 'likedislike';
    $pointer = $contribution_type . '_pointer';
    $connection = Db_connect::getInstance()->getConnection();
    $result = $connection->prepare("SELECT `dislike_status` FROM `$table` WHERE $pointer= ? AND user_id= ? ORDER BY id DESC LIMIT 1");
    $result->bind_param('ii', $contributions_pointer, $user_id);
    $result->execute();
    $result->bind_result($dislikes);
    $result->fetch();
    $result->close();
    if ((int)$dislikes == 1) {
        return true;
    } else {
        return false;
    }
}

function arraySearchId($selected, $array)
{
    foreach ($array as $key => $val) {
        if ($val['selected'] === $selected) {
            $results = $key;
            break;
        } else {
            $results = -1;
        }

    }
    return $results;
}

function removeElementWithValue($array, $key, $value)
{
    foreach ($array as $subKey => $subArray) {
        if ($subArray[$key] == $value) {
            unset($array[$subKey]);
        }
    }
    return $array;
}

function count_number($contribution_type,$lists_pointer)
{
    $connection = Db_connect::getInstance()->getConnection();
    $allcount_query = $connection->prepare("SELECT count(*) AS allcount FROM $contribution_type WHERE lists_pointer = ?");
    $allcount_query->bind_param('i', $lists_pointer);
    $allcount_query->execute();
    $allcount_query->bind_result($count);
    $allcount_query->fetch();
    $allcount_query->close();
    return (int)$count;

}


////////insert like for contributions//////////////

function likeinsertion($contribution_type, $contributionstype_pointer, $user_id)
{
    $connection = Db_connect::getInstance()->getConnection();
    $unique_pointer = $contribution_type . '_pointer';
    $table = $contribution_type . 'likedislike';
    $main_table_pointer = $table . '_pointer';

    $result = $connection->prepare("SELECT `like_status`,`dislike_status` FROM $table WHERE $unique_pointer= ? AND user_id= ? ORDER BY id DESC LIMIT 1");

    $result->bind_param('ii', $contributionstype_pointer, $user_id);
    $result->execute();
    $result->bind_result($likes, $dislikes);
    $result->fetch();
    $result->close();
    $str = (int)$likes . ',' . (int)$dislikes;

    $like_event = array(
        '1,-1' => array('likes' => -1, 'dislikes' => 0),
        '1,0' => array('likes' => -1, 'dislikes' => 0),
        '0,-1' => array('likes' => 1, 'dislikes' => 0),
        '0,0' => array('likes' => 1, 'dislikes' => 0),
        '0,1' => array('likes' => 1, 'dislikes' => -1),
        '-1,0' => array('likes' => 1, 'dislikes' => 0),
        '-1,1' => array('likes' => 1, 'dislikes' => -1),

    );
    foreach ($like_event as $index => $value) {

        if ($str == $index) {
            foreach ($value as $like_items => $item) {
                if ($like_items == 'likes') {
                    $li_val = $item;
                } else {
                    $dis_val = $item;
                }
            }
        }
    }

    $like_entry = $connection->prepare("INSERT INTO $table (`user_id`,`like_status`,`dislike_status`,`$unique_pointer`, `time`) VALUES (?,?,?,?, NOW())");

    $like_entry->bind_param("iiii", $user_id, $li_val, $dis_val, $contributionstype_pointer);
    $like_entry->execute();
    $pointer = $like_entry->insert_id;
    $like_entry->close();
    $queue_table = get_insertion_queue_table($table);
    $statement = $connection->prepare("INSERT INTO  $queue_table (`user_id`,`like_status`,`dislike_status`,`$unique_pointer`, `time`, `$main_table_pointer`) VALUES (?,?,?,?, NOW(),?)");
    $statement->bind_param("iiiii", $user_id, $li_val, $dis_val, $contributionstype_pointer, $pointer);
    $statement->execute();
    $statement->close();

}

////////insert dislike for contributions//////////////
function dislikeinsertion($contribution_type, $contributions_pointer, $user_id)
{
    $connection = Db_connect::getInstance()->getConnection();
    $unique_pointer = $contribution_type . '_pointer';
    $table = $contribution_type . 'likedislike';
    $main_table_pointer = $table . '_pointer';

    $result = $connection->prepare("SELECT `like_status`,`dislike_status` FROM $table WHERE $unique_pointer= ? AND user_id= ? ORDER BY id DESC LIMIT 1");

    $result->bind_param('ii', $contributions_pointer, $user_id);
    $result->execute();
    $result->bind_result($likes, $dislikes);
    $result->fetch();
    $result->close();
    $str = (int)$likes . ',' . (int)$dislikes;

    $dislike_event = array(
        '1,-1' => array('likes' => -1, 'dislikes' => 1),
        '1,0' => array('likes' => -1, 'dislikes' => 1),
        '0,-1' => array('likes' => 0, 'dislikes' => 1),
        '0,0' => array('likes' => 0, 'dislikes' => 1),
        '0,1' => array('likes' => 0, 'dislikes' => -1),
        '-1,0' => array('likes' => 0, 'dislikes' => 1),
        '-1,1' => array('likes' => 0, 'dislikes' => 1),

    );
    foreach ($dislike_event as $index => $value) {

        if ($str == $index) {
            foreach ($value as $dislike_items => $item) {
                if ($dislike_items == 'likes') {
                    $li_val = $item;
                } else {
                    $dis_val = $item;
                }
            }
        }
    }

    $dislike_entry = $connection->prepare("INSERT INTO $table (`user_id`,`like_status`,`dislike_status`,`$unique_pointer`, `time`) VALUES (?,?,?,?, NOW())");

    $dislike_entry->bind_param("iiii", $user_id, $li_val, $dis_val, $contributions_pointer);
    $dislike_entry->execute();
    $pointer = $dislike_entry->insert_id;
    $dislike_entry->close();
    $queue_table = get_insertion_queue_table($table);
    $statement = $connection->prepare("INSERT INTO  $queue_table (`user_id`,`like_status`,`dislike_status`,`$unique_pointer`, `time`, `$main_table_pointer`) VALUES (?,?,?,?, NOW(),?)");
    $statement->bind_param("iiiii", $user_id, $li_val, $dis_val, $contributions_pointer, $pointer);
    $statement->execute();
    $statement->close();

}

function get_pointer($ip)
{
    $connection = Db_connect::getInstance()->getConnection();
    $result = $connection->prepare("SELECT `pointer` FROM `ip_view` WHERE ip= ? ");
    $result->bind_param('s', $ip);
    $result->execute();
    $result->bind_result($ip_address);
    $result->fetch();
    $result->close();

    return $ip_address;
}

function check_ip($user_ip)
{
    $connection = Db_connect::getInstance()->getConnection();
    $result = $connection->prepare("SELECT COUNT(`pointer`) AS ip_exist FROM `ip_view` WHERE ip=? LIMIT 1");
    $result->bind_param('s', $user_ip);
    $result->execute();
    $result->bind_result($exist_ip);
    $result->fetch();
    $result->close();
    if ($exist_ip === 0) {
        return false;
    } else {
        return true;
    }
}

function get_ip_view_data($db, $ip)
{
    $ip_pointer = $zipcode = $country_name = $country_code = $latitude = $longitude = $city = $region_code = $region_name = $time_zone = null;
    $selection_tables = get_selection_tables('ip_view');
    $selection_tables_count = count($selection_tables);

    for ($i = 0; $i < $selection_tables_count && $ip_pointer == null; $i++) {
        $st = $db->prepare("SELECT `ip_pointer`,`zipcode`,`country_name`, `country_code`, `latitude`, `longitude`, `city`, `region_code`, `region_name`, `time_zone` FROM `$selection_tables[$i]` WHERE `ip` = ?");
        $st->bind_param('s', $ip);
        $st->execute();
        $st->bind_result($ip_pointer, $zipcode, $country_name, $country_code, $latitude, $longitude, $city, $region_code, $region_name, $time_zone);
        $st->fetch();
        $st->close();
    }

    if ($ip_pointer !== null) {
        $ip_data = array(
            'ip_pointer' => $ip_pointer,
            'zip_code' => $zipcode,
            'country_name' => $country_name,
            'country_code' => $country_code,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'city' => $city,
            'region_code' => $region_code,
            'region_name' => $region_name,
            'time_zone' => $time_zone
        );
        return $ip_data;
    } else {
        return false;
    }
}


function set_ip_view($user_ip, $zipcode, $country_name, $country_code, $latitude, $longitude, $city, $region_code, $region_name, $time_zone)
{
    $connection = Db_connect::getInstance()->getConnection();
    $ip_insert = $connection->prepare("INSERT INTO `ip_view` (`ip` ,`zipcode`, `country_name`,`country_code`,`latitude`,`longitude`,`city`,`region_code`,`region_name`,`time_zone`) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $ip_insert->bind_param('ssssddssss', $user_ip, $zipcode, $country_name, $country_code, $latitude, $longitude, $city, $region_code, $region_name, $time_zone);
    $ip_insert->execute();
    $ip_insert->close();

}



function profile_public_latest_multimedia_new($lists_pointer)
{

    $connection = Db_connect::getInstance()->getConnection();
    $cron_status = get_cronjob_status('multimedia_contributions');
    $selected_tables = get_index_first_selection_tables_with_updates('multimedia_contributions', $cron_status);
    $number_of_table = count($selected_tables);
    $contentlist = $multimedia_contributions_pointers = array();
    $total_lists = 0;
    for ($j = 0; $j < $number_of_table; $j++) {

        $retrieved_contributions_pointers = $multimedia_contributions_pointers;
        $retrieved_contributions_pointer_str = implode(',', $retrieved_contributions_pointers);
        $invalid_lists_pointers = array();
        $invalid_lists_pointers = check_lists_invalid_status_by_multiple_contribution_pointer('multimedia_contributions',$lists_pointer, $cron_status);
        $invalid_lists_pointer_str = implode(',', $invalid_lists_pointers);
        if ($invalid_lists_pointer_str == '' && $retrieved_contributions_pointer_str == '') {
            $notincondition = '';
        } elseif ($retrieved_contributions_pointer_str == '') {
            $notincondition = "AND `multimedia_contributions_pointer` NOT IN (" . $invalid_lists_pointer_str . ")";

        } elseif ($invalid_lists_pointer_str == '') {
            $notincondition = "AND `multimedia_contributions_pointer` NOT IN (" . $retrieved_contributions_pointer_str . ")";

        } else {
            $notincondition = "AND `multimedia_contributions_pointer` NOT IN (" . $invalid_lists_pointer_str . ',' . $retrieved_contributions_pointer_str . ")";
        }

        $statement1 = $connection->prepare("SELECT `id`,`imageraw` ,`image`,`user_id` , `selected`,`time`,`ip`,`likes`,`dislikes`,`score`,`multimedia_contributions_pointer`,`gettyimageid`,`giphyid`,`gfycatid`, `imagedisplayx1`, `imagedisplayx2`,`imagedisplayy1`,`imagedisplayy2` FROM $selected_tables[$j] WHERE `lists_pointer` = ? and `recorded` = 1 $notincondition ");

        $statement1->bind_param("i", $lists_pointer);
        $statement1->execute();
        $statement1->bind_result($id, $imageraw,$image, $user_id, $selected, $time, $ip, $likes, $dislikes, $score, $multimedia_contributions_pointer,$gettyimageid, $giphyid, $gfycatid, $imagedisplayx1 , $imagedisplayx2 , $imagedisplayy1 ,$imagedisplayy2);
        $statement1->store_result();
        while ($statement1->fetch()) {
            if ($multimedia_contributions_pointer != null) {
                $total_lists++;
                $multimedia_contributions_pointers[] = $multimedia_contributions_pointer;
                $flag_value = get_4type_contributionflag_status('multimedia_contributionflag', 'multimedia_contributions_pointer', $multimedia_contributions_pointer, $_SESSION['id']);


                $contentlist[$multimedia_contributions_pointer] = array(

                    'id' => $multimedia_contributions_pointer,
                    'username' => user_name($user_id),
                    'imageraw' => $imageraw,
                    'image' => $image,
                    'user_id' => $user_id,
                    'lists_pointer' => (int)$lists_pointer,
                    'content_user_id' => (int)content_user($lists_pointer),
                    'selected' => $selected,
                    'time' => $time,
                    'ip' => $ip,
                    'total_likes' => $likes,
                    'total_dislikes' => $dislikes,
                    'score' => (float)$score,
                    'gettyimageid'=> $gettyimageid,
                    'giphyid'=>$giphyid,
                    'gfycatid'=>$gfycatid,
                    'recorded' => 1,
                    'abusive' => $flag_value['abusive'],
                    'spam' => $flag_value['spam'],
                    'iip' => $flag_value['iip'],
                    'cordinatex1' => $imagedisplayx1,
                    'cordinatey1' => $imagedisplayy1,
                    'cordinatex2' => $imagedisplayx2,
                    'cordinatey2' => $imagedisplayy2,
                    'like_before' => has_like_before_return_boolean('multimedia_contributions', $multimedia_contributions_pointer, $user_id),
                    'dislike_before' => has_dislike_before_return_boolean('multimedia_contributions', $multimedia_contributions_pointer, $user_id));


            }
        }
        $statement1->close();
        $retrieved_contributions_pointers = array_unique($multimedia_contributions_pointers);
        $retrieved_contributions_pointer_str = implode(',', $retrieved_contributions_pointers);

    }


    if ($total_lists != 0) {
        $types = ['multimedia_contributionslikedislike'];
        $childrens_cronjobstatus = get_updated_date_depend_on_children_cronstatus($types)[1];
        $fieldnames = array();
        $fieldnames[] = 'multimedia_contributions_pointer';
        if ($childrens_cronjobstatus !== false) {
            if (in_array("multimedia_contributionslikedislike", $childrens_cronjobstatus)) {
                $fieldnames[] = 'like_status';
                $fieldnames[] = 'dislike_status';
            }
            $fieldname_str = "`" . implode("`,`", $fieldnames) . "`";
            $valid_lists_pointers_check_str = implode(',', $retrieved_contributions_pointers);
            $statement = $connection->prepare("SELECT $fieldname_str FROM `lists_index2` WHERE `multimedia_contributions_pointer` IN ($valid_lists_pointers_check_str) GROUP  BY `multimedia_contributions_pointer`");
            $statement->execute();
            $meta = $statement->result_metadata();
            while ($field = $meta->fetch_field()) {
                $parameters[] = &$row[$field->name];
            }
            call_user_func_array(array($statement, 'bind_result'), $parameters);
            while ($statement->fetch()) {
                foreach ($row as $key => $val) {
                    $multimedia_contributions_pointer = $row['multimedia_contributions_pointer'];
                    for ($k = 0; $k < count($fieldnames); $k++) {
                        $suggestedlists[$multimedia_contributions_pointer][$fieldnames[$k]] = $row[$fieldnames[$k]];
                    }
                }
            }
            $statement->close();
        }
        $contentlist = get_multiple_lists_like_dislike_for_contributionmanager('multimedia_contributions', $retrieved_contributions_pointer_str, $contentlist);
    }
    return $contentlist == array() ? false : array_values($contentlist);

}


//............................................................add contribution.............................................................................

function set_add_contribution($contribution_type, $text, $user_id, $lists_pointer, $selected, $ip)
{
    $connection = Db_connect::getInstance()->getConnection();

    $table = $contribution_type;
    $unique_pointer = $contribution_type . '_pointer';

    $collection = $connection->prepare("INSERT INTO `$table` (`text` ,`text_censored`,`user_id` ,`lists_pointer`, `selected`,`time`,`ip`) VALUES (?,?,?,?,?,NOW(),?)");
    $collection->bind_param('ssiiii', $text, $text, $user_id, $lists_pointer, $selected, $ip);
    $collection->execute();
    $contributions_pointer = $collection->insert_id;
    $collection->close();

    $queue_table = get_insertion_queue_table($table);

    $statement = $connection->prepare("INSERT INTO  $queue_table (`text`,`user_id` ,`lists_pointer`, `selected`,`time`,`ip`,`$unique_pointer`) VALUES (?,?,?,?, NOW() , ?,?)");
    $statement->bind_param("siiiii", $text, $user_id, $lists_pointer, $selected, $ip, $contributions_pointer);
    $statement->execute();
    $statement->close();
}

function contribution_display_image($src)
{

//    header('Content-type: image/jpg');
//    $image = new Imagick($src);
// If 0 is provided as a width or height parameter,
// aspect ratio is maintained
//    $image->thumbnailImage(100, 0);
//    echo $image;


}


function generate_list_display_image_imagick($image, $imagex1, $imagey1, $imagex2, $imagey2, $filename)
{
    $actualx1 = $imagex1;
    $actualy1 = $imagey1;
    $actualx2 = $imagex2;
    $actualy2 = $imagey2;

    $dimensionwidth = $actualx2 - $actualx1;
    $dimensionheight = $actualy2 - $actualy1;

    $list_display_imgk = new Imagick();
    $list_display_imgk->readImageBlob($image);
    $list_display_imgk->setImageAlphaChannel(Imagick::ALPHACHANNEL_RESET);
    $list_display_imgk->cropImage($dimensionwidth, $dimensionheight, $actualx1, $actualy1);
    $list_displayimagewidth = 695;
    $newheightscale = 695/$dimensionwidth;
    $list_displayimageheight = floor($dimensionheight*$newheightscale);

    $scrambledlist_displayname = $filename . '.jpg';
    $list_display_imgk->resizeImage($list_displayimagewidth, $list_displayimageheight, Imagick::FILTER_SINC, 1);
    $list_display_imgk->setImageCompression(Imagick::COMPRESSION_JPEG);
    $list_display_imgk->setImageCompressionQuality(78);
    $list_display_imgk->setInterlaceScheme(Imagick::INTERLACE_PLANE);
    $list_display_imgk->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/listimagedisplay/" . $scrambledlist_displayname);
    $list_display_imgk->clear();
    $list_display_imgk->destroy();

    return array('height' => $list_displayimageheight);
}

function multimedia_image_src ($item,$i,$iseditlist=false) {
    $imagebanned='';
    if(!empty($item["image" . $i . "id"])) {
        $imagebanned = is_imageid_banned_new($item["image" . $i . "id"]);
    }
    if($imagebanned == 'bannedimage'){
        return "images/fallbackimages/itemimagebanned.png";

    } else{
        if ($item["image" . $i . "provider"] == 'getty') {
            if (list_gettyimage_check($item["gettyimage" . $i . "id"]) === true) {
                if ($iseditlist) {
                    return "http://media.gettyimages.com/photos/" . $item["gettyimage" . $i . "id"];
                } else {
                    if ($item["gettyembedimage" . $i . "url"]) {
                        return $item["gettyembedimage" . $i . "url"];
                    } else {
                        return "images/fallbackimages/itemimage.png";
                    }
                }
            } else {
                return "images/fallbackimages/itemimage.png";
            }
        }
        else if ($item["image" . $i . "provider"] == 'giphy') {
            if (list_giphyimage_check($item["giphy" . $i . "id"]) === true) {
//				return "https://i.giphy.com/" . $item["giphy" . $i . "id"] . ".gif";
                if ($iseditlist) {
                    return "https://i.giphy.com/" . $item["giphy" . $i . "id"] . ".gif";
                }
                else {
                    return "https://giphy.com/embed/" . $item["giphy" . $i . "id"];
                }
            } else {
                return "images/fallbackimages/itemimage.png";
            }
        }
        else if ($item["image" . $i . "provider"] == 'gfycat') {
            if (list_gfycatimage_check($item["gfycat" . $i . "id"]) === true) {
//                return "https://thumbs.gfycat.com/" . $item["gfycat" . $i . "id"] . "-size_restricted.gif";
                if ($iseditlist) {
                    return "https://thumbs.gfycat.com/" . $item["gfycat" . $i . "id"] . "-size_restricted.gif";
                }
                else {
                    return "https://gfycat.com/ifr/" . $item["gfycat" . $i . "id"];
                }
            } else {
                return "images/fallbackimages/itemimage.png";
            }
        }
        else if ($item["image" . $i . "provider"] == 'instagram') {
            if ($iseditlist) {
                return "https://instagram.com/p/".$item["instagram" . $i . "photoid"]."/media/?size=l";
            }
        }
        else if ($item["image" . $i . "provider"] == 'rml') {
            if ($iseditlist) {
                if (empty($item["image" . $i . "raw"])) {
                    return "images/fallbackimages/itemimage.png";
                }
                if (rml_file_exist("images/raw", $item["image" . $i . "raw"])) {
                    return "images/raw/" . $item["image" . $i . "raw"];
                } else {
                    return "images/fallbackimages/itemimage.png";
                }
            }
            else {
                if (!empty($item['videohost'])) {
                    if (empty($item["image" . $i . "raw"])) {
                        return "images/fallbackimages/itemimage.png";
                    }
                    if (rml_file_exist("images/raw", $item["image" . $i . "raw"])) {
                        return "images/raw/" . $item["image" . $i . "raw"];
                    } else {
                        return "images/fallbackimages/itemimage.png";
                    }
                }
                else {
                    if (empty($item["image" . $i])) {
                        return "images/fallbackimages/itemimageunavailablefullsize.png";
                    }
                    if (rml_file_exist("images/listimagedisplay", $item["image" . $i])) {
                        return "images/listimagedisplay/" . $item["image" . $i];
                    } else {
                        return "images/fallbackimages/itemimageunavailablefullsize.png";
                    }
                }
            }
        }
    }
}



function add_multimedia_lists( $imageraw , $image ,$user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid,$x1,$x2,$y1,$y2)
{

    $connection = Db_connect::getInstance()->getConnection();
    $collection = $connection->prepare("INSERT INTO `multimedia_contributions` (`imageraw` ,`image`,`user_id` ,`lists_pointer`, `selected`,`time`,`ip`, `gettyimageid`, `giphyid`, `gfycatid`, `imagedisplayx1`, `imagedisplayx2`, `imagedisplayy1`, `imagedisplayy2`)
 VALUES (?,?,?,?,?,NOW(),?,?,?,?,?,?,?,?)");

    $collection->bind_param('ssiiiisssiiii',  $imageraw , $image, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid,$x1,$x2,$y1,$y2);
    $collection->execute();
    $multimedia_contributions_pointer = $collection->insert_id;
    $collection->close();


    $queue_table = get_insertion_queue_table('multimedia_contributions');

    $statement = $connection->prepare("INSERT INTO  $queue_table (`imageraw` ,`image` ,`user_id` ,`lists_pointer`, `selected`,`time`,`ip`,`multimedia_contributions_pointer`,`gettyimageid`, `giphyid`, `gfycatid`,`imagedisplayx1`, `imagedisplayx2`, `imagedisplayy1`, `imagedisplayy2`) VALUES (?,?,?,?,?, NOW() , ?,?,?,?,?,?,?,?,?)");
    $statement->bind_param("ssiiiiisssiiii",  $imageraw , $image, $user_id, $lists_pointer, $selected, $ip, $multimedia_contributions_pointer,$gettyimageid, $giphyid, $gfycatid,$x1,$x2,$y1,$y2);
    $statement->execute();
    $statement->close();
    return $multimedia_contributions_pointer;
}

//updating historical table

function delete_contribution($contribution_type, $items_pointer, $recorded, $data)
{
    $update_data = array(
        'recorded' => $recorded,
        'time_offset_delete' => $data['time_offset'],
        'ip' => $data['ip'],
    );
    update_contribution($contribution_type, $items_pointer, $update_data);
}


function update_contribution($contribution_type, $items_pointer, $update_data)
{
    $connection = Db_connect::getInstance()->getConnection();

    $fields = [];

    if ($contribution_type == 'contributions') {
        $itemparamtype = get_itemparam_array_for_update_contributions();

    } elseif ($contribution_type == 'multimedia_contributions') {
        $itemparamtype = get_itemparam_array_for_update_imagecontributions();
    }
    $value_array = [];
    $bindtype = "";
    foreach ($update_data as $k => &$val) {
        $fields[] = '`' . $k . '`=?';
        $value_array[] = &$val;
        $bindtype = $bindtype . $itemparamtype[$k];
    }
    $fields = implode(', ', $fields);
    $value_array[] = &$items_pointer;
    $bindtype = $bindtype . 'i';
    array_unshift($value_array, $bindtype);
    $statement = $connection->prepare("UPDATE `$contribution_type` SET " . $fields . "  WHERE `id`=?");
    call_user_func_array(array($statement, 'bind_param'), $value_array);
    $statement->execute();
    $statement->close();
    items_queue_update($contribution_type, $items_pointer, $fields, $value_array);
    return true;
}

function items_queue_update($contribution_type, $items_pointer, $fields, $value_array)
{
    $pointer = $contribution_type . '_pointer';

    $cron_status = get_cronjob_status($contribution_type);
    $insertion_table = get_update_queue_table($contribution_type, $cron_status);
    $selected_table = get_table_name_where_pointer_exists_new($contribution_type, $items_pointer, $cron_status);
    $connection = Db_connect::getInstance()->getConnection();


    if ($contribution_type == 'contributions') {
        $field_list = "`text` ,`text_censored`,`user_id` ,`lists_pointer`, `selected`,`time`,`ip`,`likes`,`dislikes`,`score`,`recorded`,`time_offset_delete`,`time_offset_add`,`contributions_pointer`";

    } elseif ($contribution_type == 'multimedia_contributions') {
        $field_list = "`imageraw` ,`user_id` ,`lists_pointer`, `selected`,`time`,`ip`,`likes`,`dislikes`,`score`,`recorded`,`total_spam`,`total_abusive`,`total_iip`,`time_offset_delete`,`time_offset_add`,`multimedia_contributions_pointer`";
    }
    if ($insertion_table !== $selected_table) {
        $statement = $connection->prepare("INSERT INTO `$insertion_table` ($field_list) SELECT $field_list FROM `$selected_table` WHERE `$pointer` = ? ");
        $statement->bind_param('i', $items_pointer);
        $statement->execute();
        $statement->close();
    }
    $statement = $connection->prepare("UPDATE `$insertion_table` SET " . $fields . " WHERE `$pointer` = ?");
    call_user_func_array(array($statement, 'bind_param'), $value_array);
    $statement->execute();
    $statement->close();
}

//get single row contribution data


function get_contributions_like_dislike_status($queue_type, $column_name, $contributions_pointer, $user_id)
{

    $tables = get_selection_tables($queue_type);
    $total_tables = count($tables);
    $connection = Db_connect::getInstance()->getConnection();
    $like_status = $dislike_status = null;
    for ($i = 0; $i < $total_tables; $i++) {
        $st = $connection->prepare("SELECT `like_status`, `dislike_status` FROM `$tables[$i]` WHERE `id` IN (SELECT MAX(`id`) as pointer FROM `$tables[$i]`  WHERE `$column_name` = ? AND `user_id` = ?)");
        $st->bind_param("ii", $contributions_pointer, $user_id);
        $st->execute();
        $st->bind_result($like_status, $dislike_status);
        $st->fetch();
        $st->close();
        if ($like_status !== null) break;
    }
    return ($like_status !== null) ? array('likes' => $like_status, 'dislike' => $dislike_status) : false;
}

/*check validation*/
function check_lists_invalid_status_by_multiple_contribution_pointer($contribution_type,$lists_pointer, $lists_cronjob_status)
{
    $unique_pointer = $contribution_type . '_pointer';
    $lists_update_tables = get_selection_only_update_table_with_cronstatus($contribution_type, $lists_cronjob_status);
    $connection = Db_connect::getInstance()->getConnection();
    $invalid_lists = array();
    $st_get_invalid_lists = $connection->prepare("SELECT `$unique_pointer` FROM `$lists_update_tables[0]` WHERE `lists_pointer` = ? AND (`recorded` = 0 )");
    $st_get_invalid_lists->bind_param('i', $lists_pointer);
    $st_get_invalid_lists->execute();
    $st_get_invalid_lists->bind_result($lists_pointer);
    while ($st_get_invalid_lists->fetch()) {
        $invalid_lists[] = $lists_pointer;
    }
    $st_get_invalid_lists->close();
    if (isset($lists_update_tables[1])) {
        $st_get_invalid_lists = $connection->prepare("SELECT `$unique_pointer` FROM `$lists_update_tables[1]` WHERE `lists_pointer` = ? AND (`recorded` = 0  )");
        $st_get_invalid_lists->bind_param('i', $lists_pointer);

        $st_get_invalid_lists->execute();
        $st_get_invalid_lists->bind_result($lists_pointer);
        while ($st_get_invalid_lists->fetch()) {
            $invalid_lists[] = $lists_pointer;
        }
        $st_get_invalid_lists->close();
        if (count($invalid_lists) > 0) {
            $changed_invalid_lists = array();
            $invalid_lists_str = implode(',', $invalid_lists);
            $st_get_invalid_lists = $connection->prepare("SELECT `$unique_pointer` FROM `$lists_update_tables[0]` WHERE `lists_pointer` IN ($invalid_lists_str) AND(`recorded` = 0  )");
            $st_get_invalid_lists->execute();
            $st_get_invalid_lists->bind_result($lists_pointer);
            while ($st_get_invalid_lists->fetch()) {
                $changed_invalid_lists[] = $lists_pointer;
            }
            $st_get_invalid_lists->close();
            $invalid_lists = array_diff($invalid_lists, $changed_invalid_lists);
        }
    }
    return $invalid_lists;
}

function profile_public_latest_contributions_new($lists_pointer)
{

    $connection = Db_connect::getInstance()->getConnection();
    $cron_status = get_cronjob_status('contributions');
    $selected_tables = get_index_first_selection_tables_with_updates('contributions', $cron_status);
    $number_of_table = count($selected_tables);
    $contentlist = $content_pointers_lookup = $content_pointers = $contributions_pointers = array();
    $total_lists = 0;
    for ($j = 0; $j < $number_of_table; $j++) {
        $retrieved_contributions_pointers = $contributions_pointers;
        $retrieved_contributions_pointer_str = implode(',', $retrieved_contributions_pointers);
        $invalid_lists_pointers = array();
        $invalid_lists_pointers = check_lists_invalid_status_by_multiple_contribution_pointer('contributions',$lists_pointer, $cron_status);
        $invalid_lists_pointer_str = implode(',', $invalid_lists_pointers);
        if ($invalid_lists_pointer_str == '' && $retrieved_contributions_pointer_str == '') {
            $notincondition = '';
        } elseif ($retrieved_contributions_pointer_str == '') {
            $notincondition = "AND `contributions_pointer` NOT IN (" . $invalid_lists_pointer_str . ")";

        } elseif ($invalid_lists_pointer_str == '') {
            $notincondition = "AND `contributions_pointer` NOT IN (" . $retrieved_contributions_pointer_str . ")";

        } else {
            $notincondition = "AND `contributions_pointer` NOT IN (" . $invalid_lists_pointer_str . ',' . $retrieved_contributions_pointer_str . ")";
        }

        $statement1 = $connection->prepare("SELECT `id`,`text`,`text_censored`,`user_id`,`selected`,`time`,`ip`,`likes`,`dislikes`,`score`,`contributions_pointer` FROM $selected_tables[$j] WHERE `lists_pointer` = ? and `recorded` = 1 $notincondition ");
        $statement1->bind_param("i", $lists_pointer);
        $statement1->execute();
        $statement1->bind_result($id, $text, $text_censored, $user_id, $selected, $time, $ip, $likes, $dislikes, $score, $contributions_pointer);
        $statement1->store_result();
        while ($statement1->fetch()) {
            if ($contributions_pointer != null) {
                $total_lists++;
                $contributions_pointers[] = $contributions_pointer;
                $flag_status = get_4type_contributionflag_status('contributionflag', 'contributions_pointer', $contributions_pointer, $_SESSION['id']);
                print_r($flag_status);
                $contentlist[$contributions_pointer] = array(

                    'id' => $contributions_pointer,
                    'username' => user_name($user_id),
                    'text' => $text,
                    'text_censored' => $text_censored,
                    'user_id' => $user_id,
                    'lists_pointer' => (int)$lists_pointer,
                    'content_user_id' => (int)content_user($lists_pointer),
                    'selected' => $selected,
                    'time' => $time,
                    'ip' => $ip,
                    'total_likes' => $likes,
                    'total_dislikes' => $dislikes,
                    'score' => (float)$score,
                    'recorded' => 1,
                    'abusive' => $flag_status ? $flag_status['abusive'] : null,
                    'spam' => $flag_status ?  $flag_status['spam']: null,
                    'iip' => $flag_status ?  $flag_status['iip']: null,
                    'like_before' => has_like_before_return_boolean('contributions', $contributions_pointer, $_SESSION['id']),
                    'dislike_before' => has_dislike_before_return_boolean('contributions', $contributions_pointer, $_SESSION['id']));

                if (isset($_SESSION['id'])) {
                    if (age_check($_SESSION['id']) < 18 && $contentlist[$contributions_pointer]['text_censored'] != null) {
                        $contentlist[$contributions_pointer]['text'] = $contentlist[$contributions_pointer]['text_censored'];
                    } else {
                        $contentlist[$contributions_pointer]['text'] = replace_banned_character($contentlist[$contributions_pointer]['text']);
                    }
                }
            }
        }
        $statement1->close();
        $retrieved_contributions_pointers = array_unique($contributions_pointers);
        $retrieved_contributions_pointer_str = implode(',', $retrieved_contributions_pointers);

    }


    if ($total_lists != 0) {
        $types = ['contributionslikedislike'];
        $childrens_cronjobstatus = get_updated_date_depend_on_children_cronstatus($types)[1];
        $fieldnames = array();
        $fieldnames[] = 'contributions_pointer';
        if ($childrens_cronjobstatus !== false) {
            if (in_array("contributionslikedislike", $childrens_cronjobstatus)) {
                $fieldnames[] = 'like_status';
                $fieldnames[] = 'dislike_status';
            }
            $fieldname_str = "`" . implode("`,`", $fieldnames) . "`";
            $valid_lists_pointers_check_str = implode(',', $retrieved_contributions_pointers);
            $statement = $connection->prepare("SELECT $fieldname_str FROM `lists_index2` WHERE `contributions_pointer` IN ($valid_lists_pointers_check_str) GROUP  BY `contributions_pointer`");
            $statement->execute();
            $meta = $statement->result_metadata();
            while ($field = $meta->fetch_field()) {
                $parameters[] = &$row[$field->name];
            }
            call_user_func_array(array($statement, 'bind_result'), $parameters);
            while ($statement->fetch()) {
                foreach ($row as $key => $val) {
                    $contributions_pointer = $row['contributions_pointer'];
                    for ($k = 0; $k < count($fieldnames); $k++) {
                        $suggestedlists[$contributions_pointer][$fieldnames[$k]] = $row[$fieldnames[$k]];
                    }
                }
            }
            $statement->close();
        }
        $contentlist = get_multiple_lists_like_dislike_for_contributionmanager('contributions', $retrieved_contributions_pointer_str, $contentlist);
    }
    return $contentlist == array() ? false : array_values($contentlist);

}

function get_multiple_lists_like_dislike_for_contributionmanager($contribution_type, $retrieved_lists_pointers_str, $array_type)
{
    $unique_pointer = $contribution_type . '_pointer';
    $likedisliketable = $contribution_type . 'likedislike';

    $cron_status = get_cronjob_status($likedisliketable);
    $connection = Db_connect::getInstance()->getConnection();
    $tables = get_selection_tables_with_cronstatus($likedisliketable, $cron_status);
    $total_tables = count($tables);

    for ($i = 0; $i < $total_tables - 1; $i++) {

        $lists_pointer = $likes = $dislikes = null;
        $st_get_discussions_like_dislike_queue = $connection->prepare("SELECT  `$unique_pointer`, COALESCE (SUM(`like_status`)) AS likes , COALESCE (SUM(`dislike_status`)) AS dislikes FROM `$tables[$i]` WHERE `$unique_pointer` IN ($retrieved_lists_pointers_str) GROUP  BY `$unique_pointer`");

        $st_get_discussions_like_dislike_queue->execute();
        $st_get_discussions_like_dislike_queue->bind_result($contributions_pointer, $likes, $dislikes);
        while ($st_get_discussions_like_dislike_queue->fetch()) {


            $array_type[$contributions_pointer]['total_likes'] += $likes;
            $array_type[$contributions_pointer]['total_dislikes'] += $dislikes;

            if ($likes === null || $dislikes === null) {
                $array_type[$contributions_pointer]['total_likes'] = 0;
                $array_type[$contributions_pointer]['total_dislikes'] = 0;
            }

            $high_value = ($array_type[$contributions_pointer]['total_likes'] - $array_type[$contributions_pointer]['total_dislikes']);
            $low_value = ($array_type[$contributions_pointer]['total_likes'] + $array_type[$contributions_pointer]['total_dislikes']);

            if ($high_value != 0 && $low_value != 0) {
                $array_type[$contributions_pointer]['score'] = ($high_value / $low_value);


            } else {
                $array_type[$contributions_pointer]['score'] = 0;
            }

            if ($array_type[$contributions_pointer]['score'] === null) {
                $array_type[$contributions_pointer]['score'] = 0;
            }


        }
        $st_get_discussions_like_dislike_queue->close();

    }

    return $array_type;
}

function get_itemparam_array_for_update_contributions()
{
    $itemparamtype = array('id' => 'i', 'text' => 's', 'text_censored' => 's', 'user_id' => 'i', 'lists_pointer' => 'i', 'selected' => 'i', 'time' => 's', 'ip' => 's', 'likes' => 'i', 'dislikes' => 'i', 'score' => 'f', 'recorded' => 'i', 'total_spam' => 'i', 'total_abusive' => 'i', 'total_iip' => 'i', 'time_offset_delete' => 'i', 'time_offset_add' => 'i', 'contributions_pointer' => 'i');
    return $itemparamtype;
}

function get_itemparam_array_for_update_imagecontributions()
{
    $itemparamtype = array('id' => 'i', 'imageraw' => 's','image' => 's', 'user_id' => 'i', 'lists_pointer' => 'i', 'selected' => 'i', 'time' => 's', 'ip' => 's', 'likes' => 'i', 'dislikes' => 'i', 'score' => 'f', 'recorded' => 'i', 'total_spam' => 'i', 'total_abusive' => 'i', 'total_iip' => 'i', 'time_offset_delete' => 'i', 'time_offset_add' => 'i', 'multimedia_contributions_pointer' => 'i');
    return $itemparamtype;
}

function update_for_selected_single_contributions_table($connection, $items_pointer, $update_data, $selected_table)
{
    $fields = $value_array = array();
    $itemparamtype = get_itemparam_array_for_update_contributions();
    $bindtype = "";
    print_r($update_data);
    foreach ($update_data as $k => &$val) {
        $fields[] = '`' . $k . '`=?';
        $value_array[] = &$val;
        $bindtype = $bindtype . $itemparamtype[$k];
    }
    $fields = implode(', ', $fields);
    $value_array[] = &$items_pointer;
    $bindtype = $bindtype . 'i';
    array_unshift($value_array, $bindtype);
    $statement = $connection->prepare("UPDATE `$selected_table` SET " . $fields . " WHERE `contributions_pointer` = ?");
    call_user_func_array(array($statement, 'bind_param'), $value_array);
    $statement->execute();
    $statement->close();
}

function check_censored_for_contributions_data($connection, $items_pointers, $item_data, $selected_table)
{
    for ($i = 0; $i < count($items_pointers); $i++) {
        $update_items_pointer = $items_pointers[$i];
        $update_item_name = replace_banned_character($item_data[$update_items_pointer]['text']);

        if ($update_item_name == NULL) {
            $updated_item_data = [];
        } else {
            $text_swearword_replacing = swearword_replacing($update_item_name);

            $updated_item_data = array(
                'text_censored' => $text_swearword_replacing,

            );
        }
        if ($updated_item_data !== []) {
            update_for_selected_single_contributions_table($connection, $update_items_pointer, $updated_item_data, $selected_table);
        }
    }
}


function get_contribution_data_for_one_selected_table($connection, $selected_table, $already_checked_items_pointer_array = array())
{

    $items_pointers = $item_data = array();
    if ($already_checked_items_pointer_array == array()) {
        $not_in_case = "";

    } else {
        $already_checked_items_pointer_str = implode(",", $already_checked_items_pointer_array);
        $not_in_case = " contributions_pointer NOT IN ($already_checked_items_pointer_str) AND ";

    }
    $items_pointer = $text = $text_censored = null;
    $statement = $connection->prepare("SELECT `contributions_pointer`,`text`,`text_censored` FROM `$selected_table` WHERE $not_in_case (`text_censored` IS NULL AND `text` IS NOT NULL )");

    if ($statement === false) {
        //dashboard
    }
    $statement->execute();
    $statement->store_result();
    $statement->bind_result($items_pointer, $text, $text_censored);
    while ($statement->fetch()) {
        if ($items_pointer != null) {
            $items_pointers[] = $items_pointer;
            $item_data[$items_pointer]['text'] = $text;

        }
    }
    $statement->close();


    check_censored_for_contributions_data($connection, $items_pointers, $item_data, $selected_table);
    return ($selected_table = "items_update") ? $items_pointers : array();
}

function get_multimediacontribution_data_for_one_selected_table($connection, $selected_table, $already_checked_items_pointer_array = array())
{

    $items_pointers = $item_data = array();
    if ($already_checked_items_pointer_array == array()) {
        $not_in_case = "";

    } else {
        $already_checked_items_pointer_str = implode(",", $already_checked_items_pointer_array);
        $not_in_case = " multimedia_contributions_pointer NOT IN ($already_checked_items_pointer_str) AND ";

    }
    $items_pointer = $image = null;
    $statement = $connection->prepare("SELECT `multimedia_contributions_pointer`,`imageraw` FROM `$selected_table` WHERE $not_in_case ( `imageraw` IS NOT NULL )");

    if ($statement === false) {
        //dashboard
    }
    $statement->execute();
    $statement->store_result();
    $statement->bind_result($items_pointer, $image);
    while ($statement->fetch()) {
        if ($items_pointer != null) {
            $items_pointers[] = $items_pointer;
            $item_data[$items_pointer]['imageraw'] = $image;

        }
    }
    $statement->close();

//    check_censored_for_contributions_data($connection, $items_pointers, $item_data, $selected_table);
    return ($selected_table = "items_update") ? $items_pointers : array();
}


function get_last_stored_pointer_into_index($connection, $unique_pointer, $selected_table)
{
    //last cronjob end point
    $last_stored_pointer = null;
    $st_get_last_indexed_pointer = $connection->prepare("SELECT MAX(`$unique_pointer`) AS `last_stored_pointer` FROM $selected_table");
    $st_get_last_indexed_pointer->execute();
    $st_get_last_indexed_pointer->bind_result($last_stored_pointer);
    $st_get_last_indexed_pointer->fetch();
    $st_get_last_indexed_pointer->close();
    return $last_stored_pointer != null ? $last_stored_pointer : 0;
}

function age_retrival($userid)
{
    $connection = Db_connect::getInstance()->getConnection();
    $query = $connection->prepare("SELECT `dob` FROM `users` WHERE `id`= ?");
    $query->bind_param('i', $userid);
    $query->execute();
    $query->bind_result($dob);
    $query->fetch();
    $query->close();
    return $dob;
}


function age_check($userid)
{
    $birthday = new DateTime(age_retrival($userid));
    //var_dump($birthday);
    //echo($birthday->format('U'));
    $now = new DateTime();
    $age = $now->diff($birthday);
    return $age->y;
}


//flag contribution

function flag_contribution($contribution_type, $flagtype, $contributions_pointer, $lists_pointer, $users_pointer, $flaguser_pointer, $abusive, $spam, $iip, $ip_pointer)
{
    $table_pointer = $contribution_type . '_pointer';
    $flag_pointer = $flagtype . '_pointer';

    $connection = Db_connect::getInstance()->getConnection();
    $collection = $connection->prepare("INSERT INTO `$flagtype` (`$table_pointer` ,`lists_pointer`,`users_pointer` ,`flaguser_pointer`, `abusive`,`spam`,`iip`,`ip_pointer`,`time`) VALUES (?,?,?,?,?,?,?,?,NOW())");
    $collection->bind_param('iiiiiiii', $contributions_pointer, $lists_pointer, $users_pointer, $flaguser_pointer, $abusive,
        $spam, $iip, $ip_pointer);
    $collection->execute();
    $contributionflag_pointer = $collection->insert_id;
    $collection->close();
    $queue_table = get_insertion_queue_table($flagtype);

    $statement = $connection->prepare("INSERT INTO  $queue_table (`$table_pointer` ,`lists_pointer`,`users_pointer` ,`flaguser_pointer`, `abusive`,`spam`,`iip`,`ip_pointer`,`time`,`$flag_pointer`) VALUES (?,?,?,?,?,?,?,?,NOW(),?)");
    $statement->bind_param('iiiiiiiii', $contributions_pointer, $lists_pointer, $users_pointer, $flaguser_pointer, $abusive,
        $spam, $iip, $ip_pointer, $contributionflag_pointer);
    $statement->execute();
    $statement->close();
}

function get_4type_contributionflag_status($queue_type, $type_of_pointer_name, $type_of_pointer, $users_pointer)
{
    $connection = Db_connect::getInstance()->getConnection();
    $selected_table = get_selection_tables($queue_type);
    $flagged_array = array();
    $pointer = $abusive = $spam = $iip = null;
    for ($i = 0; $i < count($selected_table); $i++) {
        $query = "SELECT `id`,`abusive`,`spam`,`iip` FROM `$selected_table[$i]` WHERE `id` = (SELECT MAX(`id`) as `id` FROM `$selected_table[$i]`  WHERE `$type_of_pointer_name`=? AND `flaguser_pointer`=?)";

        $query_run = $connection->prepare($query);
        $query_run->bind_param('ii', $type_of_pointer, $users_pointer);
        $query_run->execute();
        $query_run->bind_result($pointer, $abusive, $spam, $iip);
        $query_run->fetch();
        $flagged_array = array(
            'abusive' => $abusive ? $abusive : null,
            'spam' => $spam ? $spam : null,
            'iip' => $iip ? $iip: null
        );

        $query_run->close();
        if ($pointer !== null) {
            break;
        }
    }
    return $flagged_array = ($pointer == null) ? false : $flagged_array;

}

?>