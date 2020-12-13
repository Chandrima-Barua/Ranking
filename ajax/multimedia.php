<?php
error_reporting(E_ALL);
include "../core/db/connection.php";
//include '../core/functions/GifCreator.php';
//include '../core/functions/GifFrameExtractor.php';
include "../core/functions/contributionfunctions.php";
include "../core/functions/sitefunctions.php";


if (!isset($_SESSION)) {
    session_start();
}
$user_ip = '173.252.86.71';


try {

    if (empty($_POST) === false) {

        $user_id = $_SESSION['id'];
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
        $lists_pointer = $_POST['lists_pointer'];
        $selected = 0;
        $last = get_contribution_last_id('multimedia_contributions');
        $last_id = $last + 1;
        $gettyimageid = null;
        $giphyid = null;
        $gfycatid = null;
        $image = 'rml';


        function imagesaving($unique_string, $imageraw, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $x1, $x2, $y1, $y2)
        {
            $image_path = 'C:/xampp/htdocs/rank/rankmylist/images/raw/' . $imageraw;
            $image_mime = getimagesize($image_path);
            $imagesize = $image_mime[0] * $image_mime[1];

            if (($image_mime['mime'] == "image/gif" || $image_mime['mime'] == "image/jpeg" || $image_mime['mime'] == "image/png" || $image_mime['mime'] == "image/jpg" || $image_mime['mime'] == "image/bmp" || $image_mime['mime'] == "image/x-png" || $image_mime['mime'] == "image/pjpeg") && ($imagesize <= 4194304)) {

                if($unique_string != "") {

                    $image = $unique_string . ".jpg";
                }
                else{
                    $image = "";
                }
                add_multimedia_lists($imageraw, $image, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $x1, $x2, $y1, $y2);
            }
        }

        if ($ip_exists_or_not == false) {

            $insert_ip = set_ip_view($user_ip, $zipcode, $country_name, $country_code, $latitude, $longitude, $city, $region_code, $region_name, $time_zone);

        }
        $ip = get_pointer($user_ip);

        if ($_FILES != null) {
            if (0 < $_FILES['image']['error']) {
                echo 'Error: ' . $_FILES['image']['error'] . '<br>';
            } else {
//                $unique_string = generate_hash_sha256(".$user_id.");
                $unique_string = $user_id;
                ;

                if (isset($_FILES['image']['tmp_name']) && $_FILES['image']['tmp_name'] !== "") {
                    $file = $_FILES['image']['tmp_name'];
                    $allowedMimes = array('image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/pjpeg', 'image/x-png', 'image/x-ms-bmp');
                    $allowedExts = array('bmp', 'gif', 'jpe', 'jpeg', 'jpg', 'png');
                $temp = explode(".", $_FILES["image"]["name"]);
//                    $extension = strtolower(end(explode(".", $_FILES["image"]["name"])));
//                    print_r($extension);
                $extfromname = end($temp);
                    $mime = getMimeType($file);


                    if (in_array($mime, $allowedMimes) && in_array($extfromname, $allowedExts)) {
                        if ($mime == 'image/gif') {
//                            $gifPath = $_FILES['image']["tmp_name"]; // Your animated GIF path
//                            $issafegif = is_GIF_safe($gifPath);
//                            if ($issafegif) {
//
//                                $imagick = new Imagick();
//                                $imagick->readImage($_FILES['image']["tmp_name"]);
//                                $dimension = $imagick->getImageGeometry();
//                                $imagewidth = $dimension['width'];
//                                $imageheight = $dimension['height'];
//                                $imagick->mergeImageLayers(Imagick::LAYERMETHOD_FLATTEN);
//                                $source_imgk = $imagick->getImageBlob();
//                                $rotate_imgk = $source_imgk;
//
//                                $gifoutputpath = $this->dirpath . "images/contributionimages/";
//                                $outputfilenamegif = generate_hash_sha256($unique_string);
//
//                                $gifpathname = save_gif_imagick($gifPath, $imagewidth, $imageheight, $gifoutputpath, $outputfilenamegif);
//                                $newimagedata['image'] = $gifpathname;
//
//                                $outputfilenameraw = generate_hash_sha256($unique_string);
//
//
//                                $finalimageresult = get_phash_crypthash_for_image_imagick_without_gd($source_imgk, 'multimedia_contributions', $user_id, $unique_string, 4, $ip);
//
//
////                                        $this->save_listitem_thumbnail($rotate_imgk, $actualx1, $actualy1, $actualx2, $actualy2, $outputfilename, 1, [], 'list', $newimagedata);
//
////
//                                $imagick->writeImage('C:/xampp/htdocs/rank/rankmylist/images/contributionimages/' . $unique_string . '.jpg');
//                                $imagick->clear();
//                                $imagick->destroy();
//
//
//                                imagesaving($unique_string, $imageraw, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $x1, $x2, $y1, $y2);
//
//                            }
                        }
                        else {

                            $x1 = $_POST['img1-x1-introitem'];
                            $y1 = $_POST['img1-y1-introitem'];
                            $x2 = $_POST['img1-x2-introitem'];
                            $y2 = $_POST['img1-y2-introitem'];
                            $nuditycheckstatus = (int)$_POST["img1-imagenuditycheck-introitem"];
                            $imageorientation = $_POST['img1-orientation-introitem'];


                            if ($imageorientation == 'ninetydeg') {

                                $orientation = -90;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);


                            }

                            else if ($imageorientation == 'oneeightydeg') {

                                $orientation = -180;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);

                            }

                            else if ($imageorientation == 'twoseventydeg') {

                                $orientation = -270;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);

                            }

                            else if ($imageorientation == 'flipzerodeg') {

                                $orientation = 0;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->flopImage();

                            }
                            else if ($imageorientation == 'flipninetydeg' || $imageorientation == 'rotateninetydeg') {

                                //needed to flip and rotate
                                $orientation = -90;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->flipImage();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);


                            } else if ($imageorientation == 'fliponeeightydeg') {

                                //needed to flip vertically
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->flipImage();

                            } else if ($imageorientation == 'rotatetwoseventydeg' || $imageorientation == 'fliptwoseventydeg') {

                                //needed to flip vertically and rotate
//                    $orientation = -270;
                                $orientation = 90;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->flipImage();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);

                            } else if ($imageorientation == 'rotatefliptwoseventydeg') {

                                //needed to flip

                                $orientation = -0;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->flopImage();

                            } else if ($imageorientation == 'rotateoneeightydeg') {

                                //needed to flip and rotate
                                $orientation = -180;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->flopImage();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);


                            } else {
                                $orientation = 0;
                                $orientation_imgk = -$orientation;
                                $list_display_imgk = new Imagick();
                                $list_display_imgk->readImage($_FILES['image']['tmp_name']);
                                $source_imgk = $list_display_imgk->getImageBlob();
                                $list_display_imgk->rotateImage(new ImagickPixel(), $orientation_imgk);

                            }

                            $dimension = $list_display_imgk->getImageGeometry();
                            $width = $dimension['width'];
                            $height = $dimension['height'];

                            $finalimageresult = get_phash_crypthash_for_image_imagick_without_gd($source_imgk, 'multimedia_contributions', $user_id, $unique_string, 4, $ip);

                            $imageraw = $finalimageresult['filename'];
//                            print_r($finalimageresult);


                            if ($x1 < 0) {
                                $x1 = 0;
                            }
                            if ($y1 < 0) {
                                $y1 = 0;
                            }
                            if ($x2 > $width) {
                                $x2 = $width;
                            }
                            if ($y2 > $height) {
                                $y2 = $height;
                            }

                            $actualx1 = $x1;
                            $actualy1 = $y1;
                            $actualx2 = $x2;
                            $actualy2 = $y2;


                            $dimensionwidth = $actualx2 - $actualx1;
                            $dimensionheight = $actualy2 - $actualy1;

                            $displayimagehash = generate_hash_sha256($user_id);
//                            print_r($displayimagehash);

                            $list_display_imgk->setImageAlphaChannel(Imagick::ALPHACHANNEL_RESET);
                            $list_display_imgk->cropImage($dimensionwidth, $dimensionheight, $actualx1, $actualy1);
                            $list_displayimagewidth = 695;
                            $newheightscale = 695 / $dimensionwidth;
                            $list_displayimageheight = floor($dimensionheight * $newheightscale);

//                $scrambledlist_displayname = $filename . '.jpg';
                            $list_display_imgk->resizeImage($list_displayimagewidth, $list_displayimageheight, Imagick::FILTER_SINC, 1);
                            $list_display_imgk->setImageCompression(Imagick::COMPRESSION_JPEG);
                            $list_display_imgk->setImageCompressionQuality(78);
                            $list_display_imgk->setInterlaceScheme(Imagick::INTERLACE_PLANE);
//                $list_display_imgk->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/listimagedisplay/" . $scrambledlist_displayname);
                            $list_display_imgk->writeImage('C:/xampp/htdocs/rank/rankmylist/images/contributionimages/' . $displayimagehash . '.jpg');
                            $list_display_imgk->clear();
                            $list_display_imgk->destroy();


                            imagesaving($displayimagehash, $imageraw, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $x1, $x2, $y1, $y2);
                        }

                    }
                }
            }
        } else if (empty($_POST['imageurl']) === false) {

            $web_unique_string = $user_id;
//            print_r($unique_string);
            $image_url = $_POST['imageurl'];
//            $unique_string = $image_url;

            $x1 = $_POST['img1-x1-introitem'];
            $y1 = $_POST['img1-y1-introitem'];
            $x2 = $_POST['img1-x2-introitem'];
            $y2 = $_POST['img1-y2-introitem'];
            $nuditycheckstatus = (int)$_POST["img1-imagenuditycheck-introitem"];
            $imageorientation = $_POST['img1-orientation-introitem'];

            $imageinfo = getimagesize($image_url);
//            print_r($imageinfo);
            $width = $imageinfo[0];
            $height = $imageinfo[1];

            if ($imageorientation == 'ninetydeg') {
                $orientation = -90;
                $width = $imageinfo[1];
                $height = $imageinfo[0];
            } else if ($imageorientation == 'oneeightydeg') {
                $orientation = -180;
            } else if ($imageorientation == 'twoseventydeg') {
                $orientation = -270;
                $width = $imageinfo[1];
                $height = $imageinfo[0];
            } else {
                $orientation = 0;
            }



            $orientation_imgk = -$orientation;
            $imagecontents = file_get_contents($image_url);
            $imagick = new Imagick();
            $imagick->readImageBlob($imagecontents);
            $source_imgk = $imagick->getImageBlob();
            if ($orientation_imgk !== 0) {
                $imagick->rotateImage(new ImagickPixel(), $orientation_imgk);
                $rotate_imgk = $imagick->getImageBlob();
            } else {
                $rotate_imgk = $source_imgk;
            }


            $dimension = $imagick->getImageGeometry();
            $width = $dimension['width'];
            $height = $dimension['height'];

            $webfinalimageresult = get_phash_crypthash_for_image_imagick_without_gd($rotate_imgk, 'multimedia_contributions', $user_id, $web_unique_string, 4, $ip);

            $webimageraw = $webfinalimageresult['filename'];
//                var_dump($finalimageresult);


            if ($x1 < 0) {
                $x1 = 0;
            }
            if ($y1 < 0) {
                $y1 = 0;
            }
            if ($x2 > $width) {
                $x2 = $width;
            }
            if ($y2 > $height) {
                $y2 = $height;
            }

            $actualx1 = $x1;
            $actualy1 = $y1;
            $actualx2 = $x2;
            $actualy2 = $y2;


            $dimensionwidth = $actualx2 - $actualx1;
            $dimensionheight = $actualy2 - $actualy1;
            $webdisplayimagehash = generate_hash_sha256($user_id);

            $imagick->setImageAlphaChannel(Imagick::ALPHACHANNEL_RESET);
            $imagick->cropImage($dimensionwidth, $dimensionheight, $actualx1, $actualy1);
            $list_displayimagewidth = 695;
            $newheightscale = 695 / $dimensionwidth;
            $list_displayimageheight = floor($dimensionheight * $newheightscale);

//                $scrambledlist_displayname = $filename . '.jpg';
            $imagick->resizeImage($list_displayimagewidth, $list_displayimageheight, Imagick::FILTER_SINC, 1);
            $imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
            $imagick->setImageCompressionQuality(78);
            $imagick->setInterlaceScheme(Imagick::INTERLACE_PLANE);
//                $list_display_imgk->writeImage($GLOBALS['RML_SERVER_ROOT'] . "/images/listimagedisplay/" . $scrambledlist_displayname);
            $imagick->writeImage('C:/xampp/htdocs/rank/rankmylist/images/contributionimages/' . $webdisplayimagehash . '.jpg');
            $imagick->clear();
            $imagick->destroy();


            imagesaving($webdisplayimagehash, $webimageraw, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $x1, $x2, $y1, $y2);



        } else if (empty($_POST['giphyid']) === false) {

            $giphyid = $_POST['giphyid'];
//            var_dump($giphyid);

            $giphyimageurl = $_POST['imagefromgettyimagesurl'];
            $giphyx1 = $_POST['img1-x1-introitem'];
            $giphyy1 = $_POST['img1-y1-introitem'];
            $giphyx2 = $_POST['img1-x2-introitem'];
            $giphyy2 = $_POST['img1-y2-introitem'];

            if (isset($_POST['giphysearchtext'])) {
                if ($_POST['giphysearchtext'] !== "") {
                    $searchtext = $_POST['giphysearchtext'];
                    if ($searchtext !== "") {
                        $url = "http://api.giphy.com/v1/gifs/search?q=" . $searchtext . "&limit=100&api_key=4c7974638f414558af47da47eddeb5b6";
                        $ch = curl_init($url);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
                        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $output = curl_exec($ch);
                        curl_close($ch);
                        $response = json_decode($output, true);
                        for ($i = 0; $i < count($response['data']); $i++) {
                            $imgsrc[$i] = e($response['data'][$i]['id']);
                        }

                        $giphyfile = "https://media.giphy.com/media/" . $giphyid . "/giphy_s.gif";
                        $giphyimageinfo = getimagesize($giphyfile);
                        $giphywidth = $giphyimageinfo[0];
                        $giphyheight = $giphyimageinfo[1];
                        $mime = $giphyimageinfo['mime'];

                        $filesize = remote_file_size_header($giphyfile);
                        if (!$filesize) {
                            $filesize = remote_file_size_curl($giphyfile);
                        }

                        $giphyoutputfilename = generate_hash_sha256($user_id);
                        if (($filesize < 4194304)) {


                            $imagick = new Imagick();
                            $imagecontents = file_get_contents($giphyfile);
//                print_r($imagecontents);
                            $imagick->readImageBlob($imagecontents);
                            $source_imgk = $imagick->getImageBlob();
                            $rotate_imgk = $source_imgk;
                            $giphyoutputfilenameraw = generate_hash_sha256($giphyoutputfilename);

                            $giphyfinalimageresult = get_phash_crypthash_for_image_imagick_without_gd($rotate_imgk, 'multimedia_contributions', $user_id, $giphyoutputfilenameraw, 4, $ip);

                            $giphyfinalimageresult_name = $giphyfinalimageresult['filename'];
//                print_r($gettyfinalimageresult_name);

                            if ($giphyfinalimageresult) {

                                if ($giphyx1 < 0) {
                                    $giphyx1 = 0;
                                }
                                if ($giphyy1 < 0) {
                                    $giphyy1 = 0;
                                }
                                if ($giphyx2 > $giphywidth) {
                                    $giphyx2 = $giphywidth;
                                }
                                if ($giphyy2 > $giphyheight) {
                                    $giphyy2 = $giphyheight;
                                }

                                $giphydisplayimagehash = "";


                                imagesaving($giphydisplayimagehash, $giphyfinalimageresult_name, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $giphyx1, $giphyx2, $giphyy1, $giphyy2);

                            }

                        }

                    }
                }
            }



        } else if (empty($_POST['gettyimagesid']) == false) {

            $gettyimageid = $_POST['gettyimagesid'];
            $gettyimageurl = $_POST['imagefromgettyimagesurl'];
            $gettyx1 = $_POST['img1-x1-introitem'];
            $gettyy1 = $_POST['img1-y1-introitem'];
            $gettyx2 = $_POST['img1-x2-introitem'];
            $gettyy2 = $_POST['img1-y2-introitem'];

            $nuditycheckstatus = (int)$_POST["img1-imagenuditycheck-introitem"];
            $imageorientation = $_POST['img1-orientation-introitem'];
            $gettyimageinfo = getimagesize($gettyimageurl);



            $embeduriraw = file_get_contents($gettyimageurl);

            $embeduriid = substr($embeduriraw, strpos($embeduriraw, 'gie.widgets.load({id:\'') + 22, strpos($embeduriraw, '\',sig:\'') - strpos($embeduriraw, 'gie.widgets.load({id:\'') - 22);
            $embedurisig = substr($embeduriraw, strpos($embeduriraw, '\',sig:\'') + 7, strpos($embeduriraw, '=\',w:\'') - strpos($embeduriraw, '\',sig:\'') - 6);
            $embeduri = '//embed.gettyimages.com/embed/'.$gettyimageid.'?et='.$embeduriid.'&tld=com&sig='.$embedurisig;
//            $embeduri = unicode_decode($embeduri);


            print_r($embeduri);
            $gettywidth = $gettyimageinfo[0];
            $gettyheight = $gettyimageinfo[1];
            $mime = $gettyimageinfo['mime'];

            $filesize = remote_file_size_header($gettyimageurl);
            if (!$filesize) {
                $filesize = remote_file_size_curl($gettyimageurl);
            }

            $gettyoutputfilename  = generate_hash_sha256($user_id);
            if (($filesize < 4194304)) {

//            if ($mime == 'image/jpeg' || $mime == 'image/pjpeg') {
//                $source = imagecreatefromjpeg($file);
//            } else if ($mime == 'image/png' || $mime == 'image/x-png') {
//                $source = imagecreatefrompng($file);
//            } else if ($mime == 'image/gif') {
//                $source = imagecreatefromgif($file);
//            } else if ($mime == 'image/bmp' || $mime == 'image/x-ms-bmp') {
//                $source = imagecreatefrombmp($file);
//            }
//
//            //$rotate = $source;
//            $rotate_gd = $source;
                $imagick = new Imagick();
                $imagecontents = file_get_contents($gettyimageurl);
//                print_r($imagecontents);
                $imagick->readImageBlob($imagecontents);
                $source_imgk = $imagick->getImageBlob();
                $rotate_imgk = $source_imgk;
                $outputfilenameraw = generate_hash_sha256($gettyoutputfilename);

                 $gettyfinalimageresult = get_phash_crypthash_for_image_imagick_without_gd($rotate_imgk, 'multimedia_contributions', $user_id, $outputfilenameraw, 4, $ip);

                $gettyfinalimageresult_name = $gettyfinalimageresult['filename'];
//                print_r($gettyfinalimageresult_name);

                if ($gettyfinalimageresult) {

                    if ($gettyx1 < 0) {
                        $gettyx1 = 0;
                    }
                    if ($gettyy1 < 0) {
                        $gettyy1 = 0;
                    }
                    if ($gettyx2 > $gettywidth) {
                        $gettyx2 = $gettywidth;
                    }
                    if ($gettyy2 > $gettyheight) {
                        $gettyy2 = $gettyheight;
                    }

                    $gettydisplayimagehash =  "";


                    imagesaving($gettydisplayimagehash, $gettyfinalimageresult_name, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid, $gettyx1, $gettyx2, $gettyy1, $gettyy2);

                }


//

                }

        } else if (empty($_POST['gfycatid']) === false) {

            $gfycatid = $_POST['gfycatid'];
//            var_dump($gfycatid);
            add_multimedia_lists($image, $user_id, $lists_pointer, $selected, $ip, $gettyimageid, $giphyid, $gfycatid);

        }
        $connection = Db_connect::getInstance()->getConnection();
        $last_inserted_id = $connection->insert_id;
        $second = profile_public_latest_multimedia_new($lists_pointer);


//        array_push($second["gettyembeduri"], 'hjhjhjh');


//        $second = array_map(function($arr){
//            return $arr + ['gettyembeduri' => $embeduri];
//        }, $second);
//
//
//        $flagValue = 1;
        $second = array_map(function($arr) use ($embeduri){
            return $arr + ['gettyembeduri' => $embeduri];
        }, $second);
        echo json_encode($second, JSON_FORCE_OBJECT);



    } else {
        // empty post value
        $response = [
            'success' => false,
            'error_code' => 1002,
            'message' => 'invalid attempt'
        ];
    }
} catch
(Exception $exception) {
    $response = [
        'success' => false,
        'error_code' => 1111,
        'message' => 'compilation error'
    ];
}
?>