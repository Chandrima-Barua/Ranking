<?phpif (!empty($test)) {    global $test;    global $array;    ?>    <?php    foreach ($test             as $key => $value) {        ?>        <li class="element" id="elem_<?php echo $value['id'] ?>" data_elem_id="<?php echo $value['id'] ?>"            data-score="<?php echo $value['score'] ?>" data_id="<?php echo $value['id'] ?>"            data-select-at="<?php echo $value['selected'] ?>">            <div class="content-part"><a href="../content_with_image.php/<?php echo $value['user_id'] ?>">                    <img src='css/exm.jpg' alt='Paris'                         style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><!--                <div class="cont" style="display: none"> --><?php //echo $value['lists_pointer']; ?><!--</div>-->                <div class="main-content">                    <?php                    $name = user_name($value['user_id']);                    echo '<span class="contributor_name">' . ' ' . $name . '</span>';                    ?>                    <div class="descrip" id="des_<?php echo $value['id'] ?>">                        <p class="para" id="para_<?php echo $value['id'] ?>">                            <?php                            echo $value['text'] . ' ' . '';                            ?>                        </p>                    </div>                </div>            </div>            <div class="opinion">                <?php                $user_id = $_SESSION['id'];                $check_content = $value['user_id'];                $conti_id = $value['id'];                $status = get_contributions_like_dislike_status('contributionslikedislike', 'contributions_pointer', $value['id'], $user_id);//                $check = contri_selection('contributions',$value['id']);                $check_user = check_content_user($value['lists_pointer']);                ?>                <div class="contributionslikedislike">                    <?php                    if (($status) && ($status['likes'] === 1)) {                        ?>                        <div id="sel_<?php echo $value['id'] ?>"                             data_field_id="<?php echo $value['id'] ?>" class="likebutton liked_before"></div>                        <span id="loader" style="display: none" >                            <img src="images/loadermini.gif">                        </span>                        <span class="point"                              id="span_<?php echo $value['id'] ?>"><?php echo $value['total_likes'] ?>    </span>                    <?php } else {                        ?>                        <div id="sel_<?php echo $value['id'] ?>"                             data_field_id="<?php echo $value['id'] ?>"                             class="likebutton like"></div>                        <span id="loader" style="display: none" >                            <img src="images/loadermini.gif">                        </span>                        <span class="point"                              id="span_<?php echo $value['id'] ?>"><?php echo $value['total_likes'] ?> </span>                        <?php                    }                    ?>                    <?php                    if (($status) && ($status['dislike'] === 1)) { ?>                    <div id=sel_dis_<?php echo $value['id'] ?>"                         data_field_id="<?php echo $value['id'] ?>"                         class="dislikebutton disliked_before"                    ">                </div>                <span id="dis_loader" style="display: none" >                            <img src="images/loadermini.gif">                        </span>                <span class="point"                      id="span_dis_<?php echo $value['id'] ?>"><?php echo $value['total_dislikes'] ?> </span>            <?php } else {                ?>                <div id=sel_dis_<?php echo $value['id'] ?>"                     data_field_id="<?php echo $value['id'] ?>"                     class="dislikebutton dislike"></div>                <span id="dis_loader" style="display: none" >                            <img src="images/loadermini.gif">                        </span>                <span class="point"                      id="span_dis_<?php echo $value['id'] ?>"><?php echo $value['total_dislikes'] ?> </span>                <?php            }            ?>            </div>            </div>            <?php if ($value['user_id'] === $_SESSION['id']) {                ?>                <div class="itemoptionmorebutton_delete" id="<?php echo $value['id'] ?>"></div>                <div class="itemoptionmoreoptionholder_delete" id="<?php echo $value['id'] ?>"                     style="display: none">                    <div class="itemdeletetextparentholder" id="<?php echo $value['id'] ?>">                        <div class="itemdeleteicon"></div>                        <div class="deletetextforitem">Delete</div>                    </div>                </div>                <?php            } else {                $previous_flag_status = get_4type_contributionflag_status('contributionflag', 'contributions_pointer', $value['id'], $_SESSION['id']);                ?>                <div class="itemoptionmorebutton_flag" id="<?php echo $value['id'] ?>"></div>                <div class="itemoptionmoreoptionholder_flag">                    <div class="itemflagas" style="display: none">                        <span class="itemflagdescription">Flag contribution as:                        </span>                        <form class="flagasoptionslist" id="<?php echo $value['id'] ?>">                            <div class="flagasoptionswrapper" id="<?php echo $value['id'] ?>">                                <?php                                if (($value['abusive'] == 1)) {                                    ?>                                    <input type="checkbox" name="abusive" id="abusive" class="flagasoptions abusive checked"                                           label="Hateful or abusive" data_id="<?php echo $value['id'] ?>" data_val="1"                                           prev_abusive="1"                                           checked="checked">                                    <?php                                } else if ($previous_flag_status != false) {                                    ?>                                    <input type="checkbox" name="abusive" id="abusive" class="flagasoptions abusive exist"                                           label="Hateful or abusive" data_id="<?php echo $value['id'] ?>" data_val="0"                                           prev_abusive="0">                                    <?php                                } else {                                    ?>                                    <input type="checkbox" name="abusive" id="abusive" class="flagasoptions abusive"                                           label="Hateful or abusive" data_id="<?php echo $value['id'] ?>" data_val="0"                                           prev_abusive="0">                                    <?php                                }                                ?>                                <span class="flagasoptionstext">Hateful or abusive</span>                            </div>                            <div class="flagasoptionswrapper" id="<?php echo $value['id'] ?>">                                <?php                                if (($value['spam'] == 1)) {                                    ?>                                    <input type="checkbox" name="spam" id="spam" class="flagasoptions spam checked"                                           label="Spam or inappropriate" data_id="<?php echo $value['id'] ?>"                                           data_val="1" prev_spam="1"                                           checked="checked">                                    <?php                                } else if ($previous_flag_status != false) {                                    ?>                                    <input type="checkbox" name="spam" id="spam" class="flagasoptions spam exist"                                           label="Spam or inappropriate" data_id="<?php echo $value['id'] ?>"                                           data_val="0" prev_spam="0">                                    <?php                                } else {                                    ?>                                    <input type="checkbox" name="spam" id="spam" class="flagasoptions spam"                                           label="Spam or inappropriate" data_id="<?php echo $value['id'] ?>"                                           data_val="0" prev_spam="0">                                    <?php                                }                                ?>                                <span class="flagasoptionstext">Spam or inappropriate</span>                            </div>                            <div class="flagasoptionswrapper" id="<?php echo $value['id'] ?>">                                <?php                                if (($value['iip'] == 1)) {                                    ?>                                    <input type="checkbox" name="ip" id="listflagip" class="flagasoptions listflagip checked"                                           label="Infringment of intellectual property"                                           data_id="<?php echo $value['id'] ?>"                                           data_val="1" prev_iip="1"                                           checked="checked">                                    <?php                                } else if ($previous_flag_status != false) {                                    ?>                                    <input type="checkbox" name="ip" id="listflagip" class="flagasoptions listflagip exist"                                           label="Infringment of intellectual property"                                           data_id="<?php echo $value['id'] ?>"                                           data_val="0" prev_iip="0">                                    <?php                                } else {                                    ?>                                    <input type="checkbox" name="ip" id="listflagip" class="flagasoptions listflagip"                                           label="Infringment of intellectual property"                                           data_id="<?php echo $value['id'] ?>"                                           data_val="0" prev_iip="0">                                    <?php                                }                                ?>                                <span class="flagasoptionstext">Infringment of intellectual property</span>                            </div>                            <div class="flagreportbuttonholder" id="<?php echo $value['id'] ?>">                                <div class="flagreportobutton allcorners" id="<?php echo $value['id'] ?>">                                    <input type="button" id="<?php echo $value['id'] ?>"                                           class="commentflagreportbutton flagreportbutton iebutton" value="Report">                                </div>                            </div>                        </form>                    </div>                </div>                <?php            }            ?>            <div class="admin">                <?php                if ($check_user === true) {                    ?>                    <div class="select_unselect">                    <?php                    if ($value['selected'] === 0) { ?>                        <span>                        <div id=select_<?php echo $value['id'] ?>"                               data_field_id="<?php echo $value['id'] ?>"                             class="select not_selected"></div> </span>                    <?php } else {                        ?>                        <span>            <div id=select_<?php echo $value['id'] ?>" data_field_id="<?php echo $value['id'] ?>"                 class="select selected"></div>                        </span></div>                        <?php                    }                } else {                    if ($value['selected'] === 1) {                        ?>                        <div class="select_unselect">                            <span>    <div id=select_<?php echo $value['id'] ?>"           data_field_id="<?php echo $value['id'] ?>"         class="users"></div></span></div>                        <?php                    }                }                ?>                <div class="score_count" style="display: none">Score:                    <span                            id="span_score_<?php echo $value['id'] ?>"><?php echo $value['score'] ?></span>                </div>        </li>        <?php    }    ?>    </ul>    </div>    <div class="prev-load-more"></div>    <div class="load-more"></div>    <span id="load_loader" style="display: none">        <img src="images/loadermini.gif" style="margin-left: 5px;margin-top: 2px;">    </span>    <?php}?>    <div class="bs">        <?php        if ($check_user === false) {            if (!empty($final_result['content'])) {                ?>                <button type="button" name="disagree" id="disagree">Disagree??</button>                <?php            } else {                ?>                <button type="button" name="disagree" id="disagree">Add Contribution??</button>                <?php            }        }        ?>    </div>    </div><?php$number = count_number('contributions',$_GET['lists_pointer']);//get the number of total displayed contributions number$get = profile_public_latest_contributions_new($_GET['lists_pointer']);$displayed = sizeof($get);$content_user_id = content_user($_GET['lists_pointer']);?>    <input type="hidden" id="row" value="2">    <input type="hidden" id="all" value="<?php echo count($get); ?>">    <input type="hidden" id="<?php echo $_GET['lists_pointer'] ?>" user-id="user_<?php echo $_GET['lists_pointer'] ?>"           class="check-con">    <input type="hidden" id="<?php echo $_SESSION['id'] ?>" user-id="user_<?php echo $_SESSION['id'] ?>" class="user">    <input type="hidden" class="content_user" content-user-id="<?php echo $content_user_id ?>">    </div>    </div><?php