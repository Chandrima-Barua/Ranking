<?php
global $test;
if (!empty($test)) {
    ?>
    <?php
    $id = 'eSQKNSmg07dHq';
    foreach ($test
             as $key => $value) {
        ?>
        <li class="multi-element" id="multi_elem_<?php echo $value['id'] ?>"
            data_multi_elem_id="<?php echo $value['id'] ?>"
            data-score="<?php echo $value['score'] ?>" data_id="<?php echo $value['id'] ?>"
            data-select-at="<?php echo $value['selected'] ?>">
            <div class="multicontent-part" id="multicontent_<?php echo $value['id'] ?>">


                <div class="photo" id="des_<?php echo $value['id'] ?>">
                    <?php
                    if ($value['image'] != 'rml' && $value['gettyimageid'] == null && $value['giphyid'] == null && $value['gfycatid'] == null) {
                        ?>
                        <img src="images/contributionimages/<?php echo $value['image'] ?>" class="multicontent" alt="No Image" id="content_<?php echo $value['id']; ?>"/>

                        <?php


                    } else if ($value['image'] == '' && $value['gettyimageid'] != null && $value['giphyid'] == null && $value['gfycatid'] == null) {
                        ?>

                        <img src="images/raw/<?php echo $value['imageraw'] ?>"
                             class="multicontent thirdparty" alt="No Image"
                             id="content_<?php echo $value['id'] ?>">

<!--                        <iframe src= http://embed.gettyimages.com/embed/--><?php //echo $value['giphyid'] ?><!--?" id="contentframe_--><?php //echo $value['id'] ?><!--" class="multicontent thirdparty"  frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen ></iframe>-->
                        <?php
                    } else if ($value['image'] == '' && $value['gettyimageid'] == null && $value['giphyid'] != null && $value['gfycatid'] == null) {
                        ?>
                        <img src="images/raw/<?php echo $value['imageraw'] ?>" class="multicontent thirdparty" alt="No Image" id="content_<?php echo $value['id'] ?>" style="visibility: hidden">

                        <iframe src="https://giphy.com/embed/<?php echo $value['giphyid'] ?>" id="contentframe_<?php echo $value['id'] ?>" class="multicontent thirdparty"  frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen ></iframe>

                        <?php

                    } else if ($value['image'] == 'rml' && $value['gettyimageid'] == null && $value['giphyid'] == null && $value['gfycatid'] != null) {
                        ?>

                        <img src="https://thumbs.gfycat.com/<?php echo $value['gfycatid'] ?>-size_restricted.gif"
                             class="multicontent thirdparty" alt="No Image" id="content_<?php echo $value['id'] ?>">
                        <?php
                    }
                    ?>

                </div>

                <div class="hoverable" style="display: none">
                    <a href="../content_with_image.php/<?php echo $value['user_id'] ?>">
                        <img src='css/exm.jpg' alt='Paris'
                             style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a>
                    <div class="multimain-content">
                        <?php
                        $name = user_name($value['user_id']);
                        echo '<span class="multicontributor_name">' . ' ' . $name . '</span>';
                        ?>
                    </div>
                    <div class="multiopinion">
                        <?php
                        $user_id = $_SESSION['id'];
                        $check_content = $value['user_id'];
                        $conti_id = $value['id'];
                        $status = get_contributions_like_dislike_status('multimedia_contributionslikedislike', 'multimedia_contributions_pointer', $value['id'], $user_id);
                        $check_user = check_content_user($value['lists_pointer']);
                        ?>
                        <div class="multicontributionslikedislike">
                            <?php
                            if ($status['likes'] === 1) {
                                ?>
                                <div id="multisel_<?php echo $value['id'] ?>"
                                     data_field_id="<?php echo $value['id'] ?>"
                                     class="multilikebutton multiliked_before"></div>
                                <span id="loader" style="display: none">
                            <img src="images/loadermini.gif">
                        </span>
                                <span class="multipoint"
                                      id="multispan_<?php echo $value['id'] ?>"><?php echo $value['total_likes'] ?>
    </span>
                            <?php } else {
                                ?>
                                <div id="multisel_<?php echo $value['id'] ?>"
                                     data_field_id="<?php echo $value['id'] ?>"
                                     class="multilikebutton multilike"></div>
                                <span id="loader" style="display: none">
                            <img src="images/loadermini.gif">
                        </span>
                                <span class="multipoint"
                                      id="multispan_<?php echo $value['id'] ?>"><?php echo $value['total_likes'] ?> </span>
                                <?php
                            }
                            ?>
                            <?php
                            if ($status['dislike'] === 1) { ?>
                            <div id=multisel_dis_<?php echo $value['id'] ?>"
                                 data_field_id="<?php echo $value['id'] ?>"
                                 class="multidislikebutton multidisliked_before"
                            ">
                        </div>
                        <span id="dis_loader" style="display: none">
                            <img src="images/loadermini.gif">
                        </span>
                        <span class="multipoint"
                              id="multispan_dis_<?php echo $value['id'] ?>"><?php echo $value['total_dislikes'] ?> </span>
                    <?php } else {

                        ?>
                        <div id=multisel_dis_<?php echo $value['id'] ?>"
                             data_field_id="<?php echo $value['id'] ?>"
                             class="multidislikebutton multidislike"></div>
                        <span id="dis_loader" style="display: none">
                            <img src="images/loadermini.gif">
                        </span>
                        <span class="multipoint"
                              id="multispan_dis_<?php echo $value['id'] ?>"><?php echo $value['total_dislikes'] ?> </span>

                        <?php
                    }
                    ?>
                    </div>
                </div>

                <?php if ($value['user_id'] === $_SESSION['id']) {
                    ?>
                    <div class="imageitemoptionmorebutton_delete" id="<?php echo $value['id'] ?>"></div>
                    <div class="imageitemoptionmoreoptionholder_delete" id="<?php echo $value['id'] ?>"
                         style="display: none">
                        <div class="imageitemdeletetextparentholder" id="<?php echo $value['id'] ?>">
                            <div class="imageitemdeleteicon"></div>
                            <div class="imagedeletetextforitem">Delete</div>
                        </div>
                    </div>
                    <?php
                } else {

                    $previous_multiflag_status = get_4type_contributionflag_status('multimedia_contributionflag', 'multimedia_contributions_pointer', $value['id'], $_SESSION['id']);

                    ?>

                    <div class="imageitemoptionmorebutton_flag" id="<?php echo $value['id'] ?>"></div>
                    <div class="imageitemoptionmoreoptionholder_flag">
                        <div class="imageitemflagas" style="display: none">
                        <span class="imageitemflagdescription">Flag multimedia contribution as:
                        </span>
                            <form class="imageflagasoptionslist" id="<?php echo $value['id'] ?>">
                                <div class="imageflagasoptionswrapper" id="<?php echo $value['id'] ?>">
                                    <?php
                                    if (($value['abusive'] == 1)) {
                                        ?>
                                        <input type="checkbox" name="multiabusive" class="flagasoptions abusive checked"
                                               label="Hateful or abusive" data_id="<?php echo $value['id']['id'] ?>"
                                               data_val="1"
                                               prev_abusive="<?php echo $previous_multiflag_status['abusive'] ?>"
                                               checked="checked">
                                        <?php
                                    } else if ($previous_multiflag_status != false) {
                                        ?>
                                        <input type="checkbox" name="multiabusive" class="flagasoptions abusive exist"
                                               label="Hateful or abusive" data_id="<?php echo $value['id'] ?>"
                                               data_val="0"
                                               prev_abusive="<?php echo $previous_multiflag_status['abusive'] ?>">
                                        <?php
                                    } else {
                                        ?>
                                        <input type="checkbox" name="multiabusive" class="flagasoptions abusive"
                                               label="Hateful or abusive" data_id="<?php echo $value['id'] ?>"
                                               data_val="0"
                                               prev_abusive="<?php echo $previous_multiflag_status['abusive'] ?>">
                                        <?php
                                    }
                                    ?>
                                    <span class="flagasoptionstext">Hateful or abusive</span>

                                </div>
                                <div class="imageflagasoptionswrapper" id="<?php echo $value['id'] ?>">
                                    <?php
                                    if (($value['spam'] == 1)) {
                                        ?>
                                        <input type="checkbox" name="multispam" class="flagasoptions spam checked"
                                               label="Spam or inappropriate" data_id="<?php echo $value['id'] ?>"
                                               data_val="1" prev_spam="<?php echo $previous_multiflag_status['spam'] ?>"
                                               checked="checked">
                                        <?php
                                    } else if ($previous_multiflag_status != false) {
                                        ?>
                                        <input type="checkbox" name="multispam" class="flagasoptions spam exist"
                                               label="Spam or inappropriate" data_id="<?php echo $value['id'] ?>"
                                               data_val="0"
                                               prev_spam="<?php echo $previous_multiflag_status['spam'] ?>">
                                        <?php
                                    } else {
                                        ?>
                                        <input type="checkbox" name="multispam" class="flagasoptions spam"
                                               label="Spam or inappropriate" data_id="<?php echo $value['id'] ?>"
                                               data_val="0"
                                               prev_spam="<?php echo $previous_multiflag_status['spam'] ?>">
                                        <?php
                                    }
                                    ?>
                                    <span class="flagasoptionstext">Spam or inappropriate</span>

                                </div>
                                <div class="imageflagasoptionswrapper" id="<?php echo $value['id'] ?>">
                                    <?php
                                    if (($value['iip'] == 1)) {
                                        ?>
                                        <input type="checkbox" name="ip" class="flagasoptions listflagip checked"
                                               label="Infringment of intellectual property"
                                               data_id="<?php echo $value['id'] ?>"
                                               data_val="1" prev_iip="<?php echo $previous_multiflag_status['iip'] ?>"
                                               checked="checked">
                                        <?php
                                    } else if ($previous_multiflag_status != false) {
                                        ?>
                                        <input type="checkbox" name="ip" class="flagasoptions listflagip exist"
                                               label="Infringment of intellectual property"
                                               data_id="<?php echo $value['id'] ?>"
                                               data_val="0" prev_iip="<?php echo $previous_multiflag_status['iip'] ?>">
                                        <?php
                                    } else {
                                        ?>
                                        <input type="checkbox" name="ip" class="flagasoptions listflagip"
                                               label="Infringment of intellectual property"
                                               data_id="<?php echo $value['id'] ?>"
                                               data_val="0" prev_iip="<?php echo $previous_multiflag_status['iip'] ?>">
                                        <?php
                                    }
                                    ?>
                                    <span class="flagasoptionstext">Infringment of intellectual property</span>

                                </div>

                                <div class="imageflagreportbuttonholder" id="<?php echo $value['id'] ?>">
                                    <div class="imageflagreportobutton allcorners" id="<?php echo $value['id'] ?>">
                                        <input type="button" id="<?php echo $value['id'] ?>"
                                               class="imagecommentflagreportbutton imageflagreportbutton iebutton"
                                               value="Report">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
            <div class="admin">
                <?php
                if ($check_user === true) {
                    ?>
                    <div class="multiselect_unselect">
                    <?php
                    if ($value['selected'] === 0) { ?>
                        <span>
                            <div id=select_<?php echo $value['id'] ?>"
                                 data_field_id="<?php echo $value['id'] ?>"
                                 class="multiselect not_selected"></div>
</span>
                    <?php } else {
                        ?>
                        <span>
                            <div id=select_<?php echo $value['id'] ?>" data_field_id="<?php echo $value['id'] ?>"
                                 class="multiselect selected"></div>
                        </div>
                        </span>
                        <?php
                    }
                } else {
                    if ($value['selected'] === 1) {
                        ?>
                        <div class="multiselect_unselect">
                            <span>
                                <div id=select_<?php echo $value['id'] ?>"
                                     data_field_id="<?php echo $value['id'] ?>"
                                     class="users"></div>

</span></div>
                        <?php
                    }
                }
                ?>
                <div class="multiscore_count" style="display: none">Score:
                    <span
                            id="multispan_score_<?php echo $value['id'] ?>"><?php echo $value['score'] ?></span>
                </div>
            </div>
        </li>

        <?php
    }
    ?>

    <?php
}


$number = count_number('multimedia_contributions', $_GET['lists_pointer']);
//get the number of total displayed contributions number
$get = profile_public_latest_multimedia_new($_GET['lists_pointer']);
$displayed = sizeof($get);
$content_user_id = content_user($_GET['lists_pointer']);
?>









