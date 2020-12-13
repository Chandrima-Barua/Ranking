<?php
session_start();
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html;charset=iso-8859-1"/>
    <meta name="description"
          value="An example of a fluid/liquid/responsive full window width carousel with the previous and next image truncated on the sides."/>
    <meta name="keywords" value="example, carousel, full, fluid, liquid, window, width"/>
    <title>Rankmylist</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/content.css">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="js/mwheelIntent.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script>
    <link href="css/jquery.jscrollpane.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
    <script>
        $(document).ready(function () {
            $('textarea').each(function () {
                this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
            }).on('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });
    </script>
    <script type="application/javascript" src="Js/score_load_more.js"></script>
    <script type="application/javascript" src="Js/multi_score_load_more.js"></script>
    <script type="application/javascript" src="Js/lists_add.js"></script>
    <script type="application/javascript" src="Js/contribution_add.js"></script>
    <script type="application/javascript" src="Js/item_delete.js"></script>
    <script type="application/javascript" src="Js/imageitem_delete.js"></script>
    <script type="application/javascript" src="Js/item_flag.js"></script>
    <script type="application/javascript" src="Js/imageitem_flag.js"></script>
    <script type="application/javascript" src="Js/item_selection.js"></script>
    <script type="application/javascript" src="Js/imageitem_selection.js"></script>
    <script type="application/javascript" src="Js/imagelikedislike.js"></script>
    <script type="application/javascript" src="Js/like_dislike.js"></script>
</head>
<body>
<?php

error_reporting(E_ALL);
include "core/db/connection.php";
include "core/functions/contributionfunctions.php";
include "core/functions/sitefunctions.php";

$connection = Db_connect::getInstance()->getConnection();

//echo $_SESSION['id'];
$current_image = get_lists($_GET['lists_pointer']);
?>
<div class="cont" style="display: none"> <?php echo $_GET['lists_pointer']; ?></div>
<div id="deleteconfirmmessagebackground" style="display:none;"></div>
<div id="itempopupbackground" style="display:none;"></div>
<div id="deleteconfirmmessagewrapper">
    <div id="deleteconfirmmessage" style="display: none;">
        <div id="deleteconfirmmessageclose">✖</div>
        <div id="deleteconfirmmessagetitle"> Delete contribution
        </div>
        <div id="deleteconfirmmessagetext">
            Are you sure you want to delete this contribution?
        </div>
        <div id="deleteconfirmmessagebuttoncontainer">
            <div id="deleteconfirmmessagebuttonholderyes" class="allcorners iebutton">
                <input type="button" id="deleteconfirmmessagebuttonyes" class="iebutton" value="Yes">
            </div>
            <div id="deleteconfirmmessagebuttonholderno" class="allcorners iebutton">
                <input type="button" id="deleteconfirmmessagebuttonno" class="iebutton" value="No">
            </div>
        </div>
    </div>
</div>





<div id="imagedeleteconfirmmessagewrapper">
    <!--show media error msg-->
    <div class="itempopup" id="itempopupshowmediaerror" style="display: none">
        <!--    <div class="itempopup" id="itempopupshowmediaerror">-->
        <div class="itempopupclose">&#10006</div>
        <div class="itempopuptitle">Image Upload error</div>
        <div class="itempopuptext"></div>
        <div class="itempopupbuttoncontainer">
            <div class="itempopupbuttonholder">
                <div class="allcorners iebutton itempopupobutton itempopupobuttoncancel"><input type="button" class="iebutton itempopupbutton itempopupbuttoncancel" value="Ok" /></div>
            </div>
        </div>
    </div>
    <div id="imagedeleteconfirmmessage" style="display: none;">
        <div id="imagedeleteconfirmmessageclose">✖</div>
        <div id="imagedeleteconfirmmessagetitle"> Delete Image
        </div>
        <div id="imagedeleteconfirmmessagetext">
            Are you sure you want to delete this image?
        </div>
        <div id="imagedeleteconfirmmessagebuttoncontainer">
            <div id="imagedeleteconfirmmessagebuttonholderyes" class="allcorners iebutton">
                <input type="button" id="imagedeleteconfirmmessagebuttonyes" class="iebutton" value="Yes">
            </div>
            <div id="imagedeleteconfirmmessagebuttonholderno" class="allcorners iebutton">
                <input type="button" id="imagedeleteconfirmmessagebuttonno" class="iebutton" value="No">
            </div>
        </div>
    </div>
</div>


<div id="imageuploadpopupcenter">
    <div id="imageuploadpopup" style="display: none;">
        <div id="listimageuploadpopupclose">✖</div>
        <div id="listimageuploadpopuptitle"> Upload an Image
        </div>
        <div class="imageuploadpopupfromholder" style="display: block">
            <div class="imageuploadpopupfrom">
                <ul class="uploadimagetab">
                    <li id="imageuploadfromyourdevice" class="imageuploadoptions imageuploadfromyourdevice multiselected">From your
                        device
                    </li>
                    <li id="imageuploadfromtheweb" class="imageuploadoptions imageuploadfromtheweb">From the web</li>
                    <li id="imageuploadfromgetty" class="imageuploadoptions imageuploadfromgetty">From GettyImages</li>
                    <li id="imageuploadfromgiphy" class="imageuploadoptions imageuploadfromgiphy">From GIPHY</li>
                    <li id="imageuploadfromgfycat" class="imageuploadoptions imageuploadfromgfycat">From GFYCAT</li>
                </ul>
            </div>
        </div>
        <div class="imageuploadpopupphotowrapper">

            <form action="content_with_image.php?lists_pointer=" method="post" id="myForm_multi"
                  enctype="multipart/form-data">
                <div class="imageuploadpopupphotowrapperleft">
                    <div class="imageuploadpopupframe">
                        <div class="imageuploadpopupphototitle">Current image:</div>
                        <div class="imageuploadpopupphotocontainer">
                            <img draggable="false" src="images/fallbackimages/itemimage.png"
                                 style="width: 100%; margin: 0px;" class="imageuploadpopupphoto zerodeg">
                            <div class="loading" id="loading" style="display: none">
                                <img draggable="false" src="images/nav/rmlloadinglargedark.gif">
                                <div class="loadingtext">Loading...</div>

                            </div>
                        </div>

                    </div>
                </div>

                <div class="imageuploadpopupphotowrapperright">
                    <input type="hidden" id="<?php echo $_GET['lists_pointer'] ?>"
                           name="lists_pointer" value="<?php echo $_GET['lists_pointer'] ?>"
                           class="multi_con">
                    <div>
                        <div class="imageuploadfromyourdeviceholder" style="display: block">
                            <div class="imageuploadpopupuploadbuttonholder">
                                <input type="file" class="imageuploadpopupuploadbutton" name="image"
                                       accept="image/jpeg,image/gif,image/png,image/bmp,image/pjpeg,image/x-png,image/x-ms-bmp">
                                <div class="imageuploadpopupuploadtext">Select new image</div>
                                <div class="imageuploadpopupfeedback"></div>
                                <div class="imageuploadpopupuploadreminder">Your image must have a valid photoformat
                                    (i.e.
                                    jpg, jpeg,
                                    bmp, png, x-png, gif or pjpeg) and be smaller than 4 MB.
                                </div>
                            </div>
                        </div>
                        <div class="imageuploadfromthewebholder" style="display: none">
                            <div class="fromtheweblogocontainer">
                                <img draggable="false" src="images/logos/www_from_the_web_logo.png"></div>
                            <input type="text" id="createlistrawimageurl" class="createlistrawimageurl"
                                   placeholder="Paste an Image URL or Drag an Image from the Web:"
                                   onfocus="if(this.placeholder == 'Paste an Image URL or Drag an Image from the Web:') this.placeholder=''"
                                   onblur="if(this.placeholder == '') this.placeholder='Paste an Image URL or Drag an Image from the Web:'"
                                   name="imageurl">
                            <div id="imageuploadpopupuploadreminderweb" class="imageuploadpopupuploadreminderweb">Your
                                image
                                must have a valid photoformat (i.e. jpg, jpeg, bmp, png, x-png, gif or pjpeg) and be
                                smaller
                                than 4 MB.
                            </div>


                        </div>
                        <div class="imageuploadfromgettyholder" style="display: none">
                            <div class="gettyimagessearchbuttonholdercontainer">
                                <div class="gettyimageslogocontainer">
                                    <img draggable="false" src="images/logos/gettyimages_logo.png"></div>
                                <input type="text" autocomplete="off" id="createlistrawimageurl"
                                       class="createlistrawimageurl"
                                       placeholder="Search From Getty Images"
                                       onfocus="if(this.placeholder == 'Search From Getty Images') this.placeholder=''"
                                       onblur="if(this.placeholder == '') this.placeholder='Search From Getty Images'">
                            </div>
                        </div>
                        <div class="imageuploadfromgiphyholder" style="display: none">
                            <div class="giphysearchbuttonholdercontainer">
                                <div class="giphylogocontainer">
                                    <img draggable="false" src="images/logos/Giphy_Logo_small.png"></div>
                            </div>
                            <input type="text" autocomplete="off" id="giphysearchbox" class="giphysearchbox"
                                   placeholder="Search From GIPHY"
                                   onfocus="if(this.placeholder == 'Search From GIPHY') this.placeholder=''"
                                   onblur="if(this.placeholder == '') this.placeholder='Search From GIPHY'">

                            <div class="giphysearchbuttonholder">
                                <div class="rightcorners">
                                    <div class="giphysearchbutton">
                                        <div class="searchwhite"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="giphyloading" id="giphyloading" style="display: none">
                                <img draggable="false" src="images/nav/rmlloadinglargedark.gif">
                                <div class="giphyloadingtext">Loading...</div>
                            </div>
                            <div id="giphygallery" class="giphygallery">
                                <div class="giphyoutputcontainer">
                                    <div class="giphyoutput"></div>
                                </div>
                            </div>
                            <div id="giphysearchcheck"></div>
                        </div>
                        <input type='hidden' class="imagefromgiphyimage"  value=""/>
                        <!--                        <input type='hidden' class="imagefromgiphyimage" name="itemgiphy--><?php //echo str_replace('img','',$imgno).'-'.$itemid?><!--" value=""/>-->
                    </div>
                    <div class="imageuploadfromgfycatholder" style="display: none">
                        <div class="gfycatsearchbuttonholdercontainer">
                            <div class="giphylogocontainer">
                                <div class="gfycatlogosmall"></div>
                            </div>
                        </div>
                        <input type="text" autocomplete="off" id="gfycatsearchbox" class="gfycatsearchbox"
                               placeholder="Search From GFYCAT"
                               onfocus="if(this.placeholder == 'Search From GFYCAT') this.placeholder=''"
                               onblur="if(this.placeholder == '') this.placeholder='Search From GFYCAT'">

                        <div class="gfycatsearchbuttonholder">
                            <div class="rightcorners">
                                <div class="gfycatsearchbutton">
                                    <div class="searchwhite"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="imageuploadpopupbuttonouter">
                    <div class="imageuploadpopupbuttoncontainer">
                        <div class="imageuploadpopupbuttonholder">
                            <div class="imageuploadpopupobutton">
                                <button type="submit" id="imageuploadpopupbuttonselect" class="imageuploadpopupbutton">Select</button>
                            </div>
                        </div>
                        <div class="imageuploadpopupbuttonholder">
                            <div class="imageuploadpopupobutton">
                                <button type="submit" id="imageuploadpopupbuttoncancel">Cancel Selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>

<div class="flag_delete">
    <div id="flagconfirmmessagebackground" style="display:none;"></div>
    <div id="flagconfirmmessagewrapper">
        <div id="flagconfirmmessage" style="display: none;">
            <div id="flagconfirmmessageclose">✖</div>
            <div id="flagconfirmmessagetitle"> Flag report received

            </div>
            <div id="flagconfirmmessagetext">
                Thank you for bringing this to our attention. We take your report very seriously and we will take
                necessary action as soon as possible.
            </div>
            <div id="flagconfirmmessagebuttoncontainer">
                <div id="flagconfirmmessagebuttonholderok">
                    <div id="flagconfirmmessageobuttonok" class="allcorners iebutton">
                        <input type="button" id="flagconfirmmessagebuttonok" class="iebutton" value="Ok">
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div id="flagerrormessagewrapper">
        <div id="flagerrormessage" style="display: none;">
            <div id="flagerrormessageclose">✖</div>
            <div id="flagerrormessagetitle"> Flag report received

            </div>
            <div id="flagerrormessagetext">
                Please Flag atleast one.
            </div>
            <div id="flagerrormessagebuttoncontainer">
                <div id="flagerrormessagebuttonholderok">
                    <div id="flagerrormessagebuttonok" class="allcorners iebutton">
                        <input type="button" id="flagerrormessagebuttonok" class="iebutton" value="Ok">
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div id="flagexistmessagewrapper">
        <div id="flagexistmessage" style="display: none;">
            <div id="flagexistmessageclose">✖</div>
            <div id="flagexistmessagetitle"> Flag report received

            </div>
            <div id="flagexistmessagetext">
                You've flagged already!
            </div>
            <div id="flagexistmessagebuttoncontainer">
                <div id="flagexistmessagebuttonholderok">
                    <div id="flagexistmessagebuttonok" class="allcorners iebutton">
                        <input type="button" id="flagexistmessagebuttonok" class="iebutton" value="Ok">
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<div class="imageflag_delete">
    <div id="imageflagconfirmmessagebackground" style="display:none;"></div>
    <div id="imageflagconfirmmessagewrapper">
        <div id="imageflagconfirmmessage" style="display: none;">
            <div id="imageflagconfirmmessageclose">✖</div>
            <div id="imageflagconfirmmessagetitle"> Flag report received

            </div>
            <div id="imageflagconfirmmessagetext">
                Thank you for bringing this to our attention. We take your report very seriously and we will take
                necessary action as soon as possible.
            </div>
            <div id="imageflagconfirmmessagebuttoncontainer">
                <div id="imageflagconfirmmessagebuttonholderok">
                    <div id="imageflagconfirmmessageobuttonok" class="allcorners iebutton">
                        <input type="button" id="imageflagconfirmmessagebuttonok" class="iebutton" value="Ok">
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div id="imageflagerrormessagewrapper">
        <div id="imageflagerrormessage" style="display: none;">
            <div id="imageflagerrormessageclose">✖</div>
            <div id="imageflagerrormessagetitle"> Flag report received

            </div>
            <div id="imageflagerrormessagetext">
                Please Flag atleast one.
            </div>
            <div id="imageflagerrormessagebuttoncontainer">
                <div id="imageflagerrormessagebuttonholderok">
                    <div id="imageflagerrormessagebuttonok" class="allcorners iebutton">
                        <input type="button" id="imageflagerrormessagebuttonok" class="iebutton" value="Ok">
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div id="imageflagexistmessagewrapper">
        <div id="imageflagexistmessage" style="display: none;">
            <div id="imageflagexistmessageclose">✖</div>
            <div id="imageflagexistmessagetitle"> Flag report received

            </div>
            <div id="imageflagexistmessagetext">
                You've flagged already!
            </div>
            <div id="imageflagexistmessagebuttoncontainer">
                <div id="imageflagexistmessagebuttonholderok">
                    <div id="imageflagexistmessagebuttonok" class="allcorners iebutton">
                        <input type="button" id="imageflagexistmessagebuttonok" class="iebutton" value="Ok">
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>


<div class="main">

    <?php
    if (!isset($_GET['lists_pointer'])) {
        ?>
        <div class="content_main">
            <p style="color: red;">Note: Put lists_pointer on url please for getting lists!</p>
            <form action="content_with_image.php?lists_pointer=" method="post" id="myForm"
                  enctype="multipart/form-data">
                <input type="file" name="image" class="custom-file-input">
                <label><b>Content</b></label>
                <textarea name="content" class="text"></textarea>
                <button type="submit" class="bt" id="list_button">Submit</button>
            </form>
        </div>
        <?php
    }
    if (isset($_GET['lists_pointer']) && !empty($_GET['lists_pointer'])) {
    ?>
    <?php
    // Count contributions total likes and dislikes
    global $user_id;
    global $test_id;
    global $contributions_pointer;

    if (!empty($current_image['id'])){
    ?>
    <div class="cons">
        <div class="multi_part">
            <div class="underlineholder" style="display: block;">
                <div class="underline"></div>
            </div>
            <?php
            $check_user = check_content_user($_GET['lists_pointer']);
            if ($check_user === false) {
                if (!empty($current_image['image'])) {
                    ?>
                    <div class="uploadimage" style="display: none"></div>
                    <?php
                }
            }

            ?>
            <div class="all-items-multi">
                <div class="image_con">
                    <img src="uploads/<?php echo $current_image['image'] ?>" style="height: 356px; border: none"
                         class="content" alt="No Image"/>
                </div>
                <input type="hidden" id="multirow" value="1">
                <ul class="carousel_multi" data-count="0">
                    <?php
                    if (isset($_GET['lists_pointer']) && !empty($_GET['lists_pointer'])) {
                    $lists_pointer = $_GET['lists_pointer'];
                    $user_id = $_SESSION['id'];
                    //                    $check_query = has_contributionselected('multimedia_contributions',$lists_pointer);
                    $multimedia_contributions = profile_public_latest_multimedia_new($lists_pointer);

                    if (!empty($multimedia_contributions)) {
                    foreach ($multimedia_contributions as $key => $row) {
                        $selectvalue_multimedia[$key] = $row['selected'];
                        $score_multimedia[$key] = $row['score'];
                        $diff_multimedia[$key] = $row['total_likes'] - $row['total_dislikes'];
                        $likes_multimedia[$key] = $row['total_likes'];
                        $id_multimedia[$key] = $row['id'];
                    }
                    array_multisort($selectvalue_multimedia, SORT_DESC, $score_multimedia, SORT_DESC, $diff_multimedia, SORT_DESC, $likes_multimedia, SORT_DESC, $id_multimedia, SORT_DESC, $multimedia_contributions);

                    $sel_id = (arraySearchId(1, $multimedia_contributions));
                    if ($sel_id != -1) {
                        $shifted = array_slice($multimedia_contributions, $sel_id, 1, false);
                        $multiarray = removeElementWithValue($multimedia_contributions, "selected", 1);
                        array_splice($multiarray, 0, 0, $shifted);
                        $test = array_slice($multiarray, 0, 2, false);
                        include "multi-score.php";

                    } else {
                        $multiarray = $multimedia_contributions;

                        $test = array_slice($multiarray, 0, 2, false);

                        include "multi-score.php";
                    }

                    $multiget = profile_public_latest_multimedia_new($_GET['lists_pointer']);
                    ?>
            </div>

            <div class="arraylength" style="display: none" value="<?php echo count($multiget); ?>"></div>
            <div class="multiprev-load-more" style="display: none"></div>
            <div class="multiload-more" style="display: block"></div>
            <span id="multiload_loader" style="display: none">
        <img src="images/loadermini.gif" style="margin-left: 5px;margin-top: 2px;">
    </span>
        <?php
        }
        ?>

        </div>
    </div>

    <div class="wrapper">
        <div class="user_id" id="<?php echo $user_id; ?>" style="display: none"></div>
        <?php

        $contributions = profile_public_latest_contributions_new($_GET['lists_pointer']); // x2D

        if (!empty($contributions)) {
            foreach ($contributions as $key => $row) {
                $selectvalue_text[$key] = $row['selected'];
                $score_text[$key] = $row['score'];
                $diff_text[$key] = $row['total_likes'] - $row['total_dislikes'];
                $likes_text[$key] = $row['total_likes'];
                $id_text[$key] = $row['id'];
            }

            array_multisort($selectvalue_text, SORT_DESC, $score_text, SORT_DESC, $diff_text, SORT_DESC, $likes_text, SORT_DESC, $id_text, SORT_DESC, $contributions); ?>
            <div id="itemtitletext">
                <p id="scrollingitemtitle" class="hidingitemtitle"
                "><?php echo '<b id="scrollingitemtitle">Content No : # </b>' . $current_image['id'] ?></p>
            </div>
            <div class="all-items">
                <?php
                if (!empty($current_image['content'])) {
                ?>
                <div id="con">
                    <p class="mainc"><?php echo $current_image['content'] ?>
                    </p>
                </div>
                <ul class="carousel" data-count="0">
                    <?php
                    }
                    else{
                    ?>
                    <ul class="carousel" data-count="1">
                        <?php
                        }
                        $sel_id = (arraySearchId(1, $contributions));
                        if ($sel_id != -1) {
                            $shifted = array_slice($contributions, $sel_id, 1, false);
                            $array = removeElementWithValue($contributions, "selected", 1);
                            array_splice($array, 0, 0, $shifted);
                            $test = array_slice($array, 0, 2, false);
                            include "score.php";
                        } else {
                            $array = $contributions;
                            $test = array_slice($array, 0, 2, false);
                            include "score.php";
                        }

                        ?>
            </div>
            <?php
        }
        else{
        ?>
        <div id="itemtitletext">
            <p id="scrollingitemtitle" class="hidingitemtitle"
            "><?php echo '<b id="scrollingitemtitle">Content No : # </b>' . $current_image['id'] ?></p>
        </div>
        <div class="all-items">
            <?php
            if (!empty($current_image['content'])) {
                ?>
                <div id="con"><p class="mainc"><?php echo $current_image['content'] ?></p>
                </div>
                <ul class="carousel" data-count="0">
                </ul>
                <?php
            } else {
                ?>
                <ul class="carousel" data-count="1">
                </ul>
                <?php
            }
            ?>
        </div>
        <div class="prev-load-more" style="display: none"></div>
        <div class="load-more" style="display: none"></div>
        <div class="bs">
            <?php
            $check_user = check_content_user($_GET['lists_pointer']);
            if ($check_user === false) {
                if (!empty($current_image['content'])) {
                    ?>
                    <button type="button" name="disagree" id="disagree">Disagree??</button>
                    <?php
                } else {
                    ?>
                    <button type="button" name="disagree" id="disagree">Add Contribution??</button>
                    <?php
                }
            }
            ?>
        </div>
    </div>
    <?php
    $number = count_number('contributions', $_GET['lists_pointer']);
    //get the number of total displayed contributions number
    $get = profile_public_latest_contributions_new($_GET['lists_pointer']);

    $displayed = sizeof($get);
    $content_user_id = content_user($_GET['lists_pointer']);
    ?>

    <input type="hidden" id="row" value="1">
    <input type="hidden" id="all" value="<?php echo $number; ?>">
    <input type="hidden" id="<?php echo $_GET['lists_pointer'] ?>"
           user-id="user_<?php echo $_GET['lists_pointer'] ?>"
           class="check-con">
    <input type="hidden" id="<?php echo $_SESSION['id'] ?>" user-id="user_<?php echo $_SESSION['id'] ?>"
           class="user">
    <input type="hidden" class="content_user" content-user-id="<?php echo $content_user_id ?>">
</div>
    </div>
<?php
}
?>
<?php
}
}
else {
    ?>
    </ul>
    <p style="color: red">Error:Content doesn't available in Database!</p>
    <?php
}
}

?>
<script>
    <?php
    if(!empty($array)){
    ?>
    document.unsel_obj = <?php echo json_encode($array); ?>
    <?php
    }
    ?>
</script>
<script>
    <?php
    if(!empty($multiarray)){

    ?>
    document.multiunsel_obj = <?php echo json_encode($multiarray); ?>
    <?php
    }
    ?>
</script>

</body>
</html>

