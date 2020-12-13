<?php
global $con;
global $last;
?>
<script>
    if (!$.trim($('.mainc').html()).length == true) {
        $('.carousel').css('width', '0px');
    }
    // $(document).ready(function () {
    console.log($('.carousel').width())
    var objects = <?php echo json_encode($con); ?>;
    var main = eval(objects);

    // console.log(main);

    var maximum = null;
    last = <?php echo json_encode($last); ?>;
    $("#disagree").on('click', function (e) {
        console.log($(".carousel li").length);

        $(".load-more").hide();
        $(".prev-load-more").hide();


        Contri_string = "<div class='show'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px'><div class='contributions'><textarea name='text' id='text' style='top:-740px;'></textarea><div class='bs'><button type='submit' name='submit' id='contribute'>Contribute</button></div></div></div>";

        if ($(".carousel li").length == 0) {


            $(".mainc").css("display", "none");

        } else {


            $(".all-items").css("display", "none");
        }
        $("#itemtitletext").after(Contri_string);


        $("#disagree").hide();

        $('textarea').each(function () {

            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        n = 0;

        $("#contribute").on('click', function () {
            $(".all-items").show();
            n = n + 1;

            $(window).resize(function () {
                if (!$.trim($('.mainc').html()).length == false) {

                    // $(".element").css('height', ($("#con").height()) + 'px');
                    $(".descrip").unbind('mousewheel');
                    // var element = $(".descrip").jScrollPane();
                    // var api = element.data('jsp');
                    // api.destroy();
                }

                // total_width = parseInt($('.carousel').width()) + n * ($(".all-items").width() - 85) + n * 10;
                // console.log(total_width)
                // $('.carousel').css('width', total_width + 'px');
            }).resize();

            total_width = parseInt($('.carousel').width()) + n * ($(".all-items").width() - 85) + n * 10;
            console.log(parseInt($('.carousel').width()))
            $('.carousel').css('width', total_width + 'px');

            $(".show").hide();

            last_id = last + 1;

            var text = $('#text').val();
            console.log(text);
            var user_id = $('.user').attr('id');
            console.log(user_id);
            var lists_pointer = $('.check-con').attr('id');
            console.log(lists_pointer);
            var content_user_id = $(".content_user").attr("content-user-id");
            console.log(content_user_id);

            if ($('#text').val() == '') {
                // $("#contribute").attr("disabled", true);

            } else {

                // if (!$.trim($('.mainc').html()).length == false) {
                //
                //     $(".element").css('height', ($("#con").height()) + 'px');
                // }

                $("#disagree").show();
                $.ajax({
                    type: 'POST',
                    url: 'ajax/contribution.php',
                    dataType: 'text',
                    data: {text: text, user_id: user_id, lists_pointer: lists_pointer},
                    success: function (data) {
                        console.log(data);
                        var objects = JSON.parse(data);

                        sorted_load = Object.values(objects);

                        index = sorted_load.findIndex((item) => item.selected === 1);
                        if (index != -1) {
                            var shifted = sorted_load.shift(index);
                            sorted_load.sort(function (a, b) {
                                var avalue = a.score;
                                bvalue = b.score;
                                if (avalue > bvalue) {
                                    return -1;
                                } else if (bvalue > avalue) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            });
                            sorted_load.unshift(shifted);
                        } else {
                            sorted_load.sort(function (a, b) {

                                var avalue = a.score;
                                bvalue = b.score;
                                if (avalue > bvalue) {
                                    return -1;
                                } else if (bvalue > avalue) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            });
                        }
                        console.log(sorted_load);
                        // for (i = 0; i < Object.keys(sorted_load).length; i++) {
                        index = sorted_load.findIndex((item) => item.id === last_id);


                        if (content_user_id == user_id) {
                            listrings = "<li class='element' id='elem_" + sorted_load[index]['id'] + "' data_elem_id=" + sorted_load[index]['id'] + " data-score=" + sorted_load[index]['score'] + " data_id=" + sorted_load[index]['id'] + " data-select-at=" + sorted_load[index]['selected'] + " ><div class='content-part'><a href='../content_with_image.php/" + sorted_load[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px; display: block; float: left'></a><div class='main-content'><b>" + sorted_load[index]['username'] + " </b></br><div class='descrip' id='des_" + sorted_load[index]['id'] + "'><p class='para' id='para_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['text'] + " </p></div></div>";

                            if (sorted_load[index]['like_before'] === true) {
                                var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + sorted_load[index]['id'] + "' data_field_id=" + sorted_load[index]['id'] + "></div><span class='point' id='span_" + sorted_load[index]['id'] + "' >" + sorted_load[index]['total_likes'] + "</span>";
                            } else {
                                like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + sorted_load[index]['id'] + "' data_field_id=" + sorted_load[index]['id'] + "></div><span class='point' id='span_" + sorted_load[index]['id'] + "' >" + sorted_load[index]['total_likes'] + "</span>";
                            }
                            if (sorted_load[index]['dislike_before'] === true) {
                                var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + sorted_load[index]['id'] + "' data_field_id =" + sorted_load[index]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[index]['id'] + "' > " + sorted_load[index]['total_dislikes'] + " </span>";
                            } else {
                                dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + sorted_load[index]['id'] + "' data_field_id =" + sorted_load[index]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[index]['id'] + "' > " + sorted_load[index]['total_dislikes'] + " </span></div>";
                            }

                            if (sorted_load[index]['selected'] === 0) {
                                var selection = "</div><div class='admin'><div class='select_unselect'><span><input type='button' id='select_" + sorted_load[index]['id'] + "'  class='select not_selected'   data_field_id =" + sorted_load[index]['id'] + "></span></div>";
                            } else {
                                selection = "</div><div class='admin'><div class='select_unselect'><span><input type='button' id='select_" + sorted_load[index]['id'] + "'  class='select selected'   data_field_id =" + sorted_load[index]['id'] + "></span></div>";
                            }

                            score_str = "<div class='score_count' style='display: none'> Score: <span id='span_score_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['score'] + "</span></div></li>";
                            strings = listrings + like_str + dislike_str + selection + score_str;

                        } else {
                            listrings = "<li class='element' id='elem_" + sorted_load[index]['id'] + "' data_elem_id=" + sorted_load[index]['id'] + " data-score=" + sorted_load[index]['score'] + " data_id=" + sorted_load[index]['id'] + " data-select-at=" + sorted_load[index]['selected'] + " ><div class='content-part'><a href='../content_with_image.php/" + sorted_load[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px'></a><div class='main-content'><b>" + sorted_load[index]['username'] + " </b></br><div class='descrip' id='des_" + sorted_load[index]['id'] + "'><p class='para' id='para_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['text'] + " </p></div></div>";
                            if (sorted_load[index]['like_before'] === true) {
                                var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + sorted_load[index]['id'] + "' data_field_id=" + sorted_load[index]['id'] + "></div><span class='point' id='span_" + sorted_load[index]['id'] + "' >" + sorted_load[index]['total_likes'] + "</span>";
                            } else {
                                like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + sorted_load[index]['id'] + "' data_field_id=" + sorted_load[index]['id'] + "></div><span class='point' id='span_" + sorted_load[index]['id'] + "' >" + sorted_load[index]['total_likes'] + "</span></div>";
                            }
                            if (sorted_load[index]['dislike_before'] === true) {
                                var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + sorted_load[index]['id'] + "' data_field_id =" + sorted_load[index]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[index]['id'] + "' > " + sorted_load[index]['total_dislikes'] + " </span>";
                            } else {
                                dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + sorted_load[index]['id'] + "' data_field_id =" + sorted_load[index]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[index]['id'] + "' > " + sorted_load[index]['total_dislikes'] + " </span>";
                            }


                            score_str = "<div class='score_count' style='display: none'> Score: <span id='span_score_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['score'] + "</span></div></li>";
                            strings = listrings + like_str + dislike_str + score_str;


                        }
                        if ($(".carousel li").length == 0 && !$.trim($('.mainc').html()).length == true) {
                            // $("#elem_" + sorted_load[index]['id']).css('width', ($(".all-items").width() - 85) + 'px');
                            // $("#elem_" + sorted_load[index]['id']).css('height', ($(".element").height()) + 'px');
                            // $('.element').css('width', ($(".all-items").width() - 85) + 'px');
                            // $('.element').css('height', $(".element").height() + 'px');
                            $('.element').css('width', ($(".all-items").width() - 85) + 'px');
                            $('.element').css('height', $(".element").height() + 'px');
                            $(".carousel").append(strings);
                            // total_width = parseInt($('.carousel').width()) + n * ($(".all-items").width() - 85) + n * 10 + 50;
                            // $('.carousel').css('width', total_width + 'px');

                        }
                        else if ($(".carousel li").length == 0 && !$.trim($('.mainc').html()).length == false) {
                            $(".load-more").show();
                            // $('.element').css('width', ($(".all-items").width() - 85) + 'px');
                            // $('.element').css('height', $(".element").height() + 'px');
                            // $("#elem_" + sorted_load[index]['id']).css('width', ($(".all-items").width() - 85) + 'px');
                            // $("#elem_" + sorted_load[index]['id']).css('height', ($(".element").height()) + 'px');
                            $('.element').css('width', ($(".all-items").width() - 85) + 'px');
                            $('.element').css('height', $(".element").height() + 'px');
                            $(".mainc").show();
                            $(".carousel").append(strings);
                            // total_width = parseInt($('.carousel').width()) + n * ($(".all-items").width() - 85) + n * 10 + 50;
                            // $('.carousel').css('width', total_width + 'px');


                            console.log($(".carousel li"));
                            if ($(".carousel li").length > 0) {
                                $(".load-more").show();
                            }
                        } else if ($(".carousel li").length > 0) {
                            // prev_index = index - 1;
                            // prev_id = sorted_load[prev_index]['id'];

                            $(".load-more").show();
                            $(".prev-load-more").show();
                            console.log( $("#elem_" + sorted_load[index]['id']));
                            // $("#elem_" + sorted_load[index]['id']).css('width', ($(".all-items").width() - 85) + 'px');
                            // $("#elem_" + sorted_load[index]['id']).css('height', ($(".element").height()) + 'px');
                            $(".mainc").show();

                            $('.carousel li').last().after(strings);
                            $('.element').css('width', ($(".all-items").width() - 85) + 'px');
                            $('.element').css('height', $(".element").height() + 'px');
                            distance = $("#elem_" + sorted_load[index]['id']).offset().left - $('.all-items').offset().left;
                            // distance = $(".carousel li").last().width() - $('.all-items').width();
                            console.log(distance);
                            $('.all-items').animate({'margin-left': -distance + 70 + 'px'}, {
                                "duration": 1000,
                                "easing": "linear"
                            });

                        }


                        height = $("#para_" + sorted_load[index]['id']).height();
                        console.log(height);
                        if (height > 200) {
                            $("#des_" + sorted_load[index]['id'])
                                .jScrollPane()
                                .bind(
                                    'mousewheel',
                                    function (e) {
                                        e.preventDefault();
                                    }
                                );
                        }

                    }
                });
            }
            $('#text').val('');
            last = last_id;

        });
    });


</script>

