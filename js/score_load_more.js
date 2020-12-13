$(document).ready(function () {
    var checkanimate;

    $(".carousel").css('visibility', 'visible');
    if ($('.carousel li').length == 2 || 1) {
        $('.prev-load-more').hide();
    }

    if (!$.trim($('.mainc').html()).length == false && $('.carousel li').length > 0) {

        $('.load-more').show();
    } else if (!$.trim($('.mainc').html()).length == true && $('.carousel li').length == 1) {

        $('.load-more').hide();

    }


    $(".element").css('height', ($(".all-items").height()) + 'px');
    $(".multi-element").css('height', ($(".content").height()) + 'px');

    apis = [];
    $('.descrip').each(
        function () {
            apis.push($(this).jScrollPane().data().jsp);
        }
    );
    n = parseInt($('.carousel li').length);
    n_multi = parseInt($('.carousel_multi li').length);
    left_width = parseInt($('.all-items').width());
    $(".element").css('width', ($(".all-items").width() - 85) + 'px');
    $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');
    if (!$.trim($('.mainc').html()).length == false) {
        $('.carousel').css('margin-left', ($(".all-items").width() - 60) + 'px');
    }
    $('.carousel_multi').css('margin-left', ($(".all-items-multi").width() - 60) + 'px');
    total_width = n * ($(".all-items").width() - 85) + n * 10;

    $('.carousel').css('width', total_width + 'px');
    multi_total_width = n_multi * ($(".all-items-multi").width() - 85) + n_multi * 10;
    $('.carousel_multi').css('width', multi_total_width + 'px');
    k = 0;
    n = parseInt($('.carousel li').length);

    $(window).on('resize', function () {

        n = parseInt($('.carousel li').length);
        n_multi = parseInt($('.carousel_multi li').length);
        left_width = parseInt($('.all-items').width());
        $(".element").css('width', ($(".all-items").width() - 85) + 'px');
        $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');
        if (!$.trim($('.mainc').html()).length == false) {
            $('.carousel').css('margin-left', ($(".all-items").width() - 60) + 'px');
        }
        $('.carousel_multi').css('margin-left', ($(".all-items-multi").width() - 60) + 'px');
        total_width = n * ($(".all-items").width() - 85) + n * 10;
        $('.carousel').css('width', total_width + 'px');
        multi_total_width = n_multi * ($(".all-items-multi").width() - 85) + n_multi * 10;
        $('.carousel_multi').css('width', multi_total_width + 'px');
        // left_width = parseInt($('.element').width());
        // left_next = k * left_width + k * 10;
        // $('.all-items').css('margin-left', -left_next + 'px');
    });

    $(".wrapper").on('click', '.load-more', function (e) {
        // $(".multi_part").off('click', '.multiload-more');
        checkanimate = 1;
        e.preventDefault();
        count = parseInt($(".carousel").attr('data-count'));
        var sorted_load = [];
        var load = [];
        n = parseInt($('.carousel li').length);
        k = k + 1;
        $(".element").css('width', ($(".all-items").width() - 85) + 'px');
        n = parseInt($('.carousel li').length);
        n = n + 2;
       var left = parseInt($('.all-items').css("margin-left"));
       var left_width = parseInt($('.all-items').width());
       var left_next = left - (left_width - 85 + 10);

        $('.all-items').animate({'margin-left': left_next + 'px'}, {"duration": 1000, "easing": "linear"});

        number = [];
        $('.carousel').children().each(function () {
            number.push(parseInt($(this).attr("data_elem_id")));
        });

        if(checkanimate == 1) {
            $(window).on('resize', function () {

                left_width = parseInt($('.element').width());
                left_next = count * left_width + count * 10;
                // console.log("amount of score load" + left_next)
                $(this).siblings('.all-items').css('margin-left', -left_next + 'px');
            }.bind(this));
        }
        $('.prev-load-more').show();
        user = parseInt($('.user_id').attr("id"));
        row = Number($('#row').val());
        allcount = Number($('#all').val());
        rowperpage = 1;
        row_count = row + rowperpage;
        // var lists_pointer = parseInt($('.cont').text());
        console.log("list pointers: "+lists_pointer);
        $("#all").val(allcount);
        $("#row").val(row_count);
        $.ajax({
            type: 'POST',
            url: 'ajax/loadmore.php',
            data: {lists_pointer: lists_pointer, row_count: row_count},

            success: function (data) {
                var objects = JSON.parse(data);
                load = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        load.push(objects[i]);
                    }
                    sorted_load = Object.values(load);
                    console.log(sorted_load)
                    index = sorted_load.findIndex((item) => item.selected === 1);
                    console.log(index);
                    if (index != -1) {
                        var shifted = sorted_load.splice(index, 1);
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
                        sorted_load.unshift(shifted[0]);
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

                    array_load = [];
                    for (i = 0; i < number.length; i++) {
                        getindexs = sorted_load.findIndex((item) => item.id === number[i]);
                        array_load.push(sorted_load[getindexs])
                    }
                    var difference = [];


                    //for live value update
                    for (var i = 0; i < array_load.length; i++) {
                        $("#span_" + array_load[i]['id']).text(array_load[i]['total_likes']);
                        $("#span_score_" + array_load[i]['id']).text(array_load[i]['score']);
                        $("#elem_" + array_load[i]['id']).attr('data-score', array_load[i]['score']);
                        $("#elem_" + array_load[i]['id']).attr('data-select-at', array_load[i]['selected']);
                    }

                    $(".carousel").each(function () {
                        $(this).html($(this).children('li').sort(function (a, b) {
                            if (($(a).data('select-at')) > ($(b).data('select-at'))) {
                                return ($(a).data('select-at')) - ($(b).data('select-at'));

                            } else if (($(a).data('select-at')) === ($(b).data('select-at'))) {
                                if (($(a).data('score')) === ($(b).data('score'))) {
                                    return ($(a).data('score')) - ($(b).data('score'));
                                } else {
                                    return ($(b).data('score')) - ($(a).data('score'));
                                }
                            }
                        }));
                    });

                    jQuery.grep(sorted_load, function (el) {
                        if (jQuery.inArray(el, array_load) == -1) difference.push(el);
                    });
                    console.log(difference)
                    // if (sorted_load.length % 2 == 0) {
                    //     loop_number = 2;
                    // } else {
                    //     loop_number = 1;
                    // }

                    if (difference.length > 0) {
                        for (i = 0; i < 2; i++) {
                            if (i === difference.length) {
                                break;
                            }

                            if (user === difference[i]['content_user_id']) {
                                strings = "<li class='element' id='elem_" + difference[i]['id'] + "' data_elem_id=" + difference[i]['id'] + " data-score=" + difference[i]['score'] + " data_id=" + difference[i]['id'] + " data-select-at=" + difference[i]['selected'] + "><div class='content-part'><a href='../content_with_image.php/" + difference[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='main-content'><span class='contributor_name'>" + difference[i]['username'] + " </span><div class='descrip' id='des_" + difference[i]['id'] + "'><p class='para' id='para_" + difference[i]['id'] + "'>" + difference[i]['text'] + " </p></div></div>";
                                if (difference[i]['like_before'] === true) {
                                    var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + difference[i]['id'] + "' data_field_id=" + difference[i]['id'] + "></div><span class='point' id='span_" + difference[i]['id'] + "' >" + difference[i]['total_likes'] + "</span>";
                                } else {
                                    like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + difference[i]['id'] + "' data_field_id=" + difference[i]['id'] + "></div><span class='point' id='span_" + difference[i]['id'] + "' >" + difference[i]['total_likes'] + "</span>";
                                }
                                if (difference[i]['dislike_before'] === true) {
                                    var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + difference[i]['id'] + "' data_field_id =" + difference[i]['id'] + "></div><span class='point' id='span_dis_" + difference[i]['id'] + "' > " + difference[i]['total_dislikes'] + " </span></div>";
                                } else {
                                    dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + difference[i]['id'] + "' data_field_id =" + difference[i]['id'] + "></div><span class='point' id='span_dis_" + difference[i]['id'] + "' > " + difference[i]['total_dislikes'] + " </span></div></div>";
                                }
                                if (difference[i]['selected'] === 0) {
                                    var selection = "</div><div class='admin'><div class='select_unselect'><span><div id='select_" + difference[i]['id'] + "'  class='select not_selected' data_field_id =" + difference[i]['id'] + "></div></span></div>";
                                } else {
                                    selection = "</div><div class='admin'><div class='select_unselect'><span><div id='select_" + difference[i]['id'] + "'  class='select selected' data_field_id =" + difference[i]['id'] + "></div></span></div>";
                                }
                                if (user === difference[i]['user_id']) {
                                    delete_str = "</div><div class='itemoptionmorebutton_delete' id=" + difference[i]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + difference[i]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + difference[i]['id'] + "> <div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";

                                    $('.carousel').append(strings + like_str + dislike_str + selection + delete_str);



                                } else {
                                    flag_str = "</div></div><div class='itemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='itemoptionmoreoptionholder_flag'><div class='itemflagas' style='display: none'><span class='itemflagdescription'>Flag contribution as:</span><form class='flagasoptionslist' id=" + difference[i]['id'] + "><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"

                                    if(difference[i]['abusive'] == 1){
                                        var abusive_str = "<input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'> <span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['abusive'] == 0){
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['spam'] == 1){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['spam'] == 0){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "'  data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['iip'] == 1){
                                        var iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else if(difference[i]['iip'] == 0){
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else{
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }

                                    score_str = "</div><div class='flagreportbuttonholder' id=" + difference[i]['id'] + "><div class='flagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button' class='commentflagreportbutton flagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i][' id'] + "'>" + difference[i]['score'] + "</span></div></li>"

                                    $('.carousel').append(strings + like_str + dislike_str + selection + flag_str + abusive_str + spam_str +iip_str + score_str);

                                }

                            } else {
                                strings = "<li class='element' id='elem_" + difference[i]['id'] + "' data_elem_id=" + difference[i]['id'] + " data-score=" + difference[i]['score'] + " data_id=" + difference[i]['id'] + " data-select-at=" + difference[i]['selected'] + "><div class='content-part'><a href='../content_with_image.php/" + difference[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='main-content'><span class='contributor_name'>" + difference[i]['username'] + " </span><div class='descrip' id='des_" + difference[i]['id'] + "'><p class='para' id='para_" + difference[i]['id'] + "'>" + difference[i]['text'] + " </p></div></div>";
                                if (difference[i]['like_before'] === true) {
                                    var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + difference[i]['id'] + "' data_field_id=" + difference[i]['id'] + "></div><span class='point' id='span_" + difference[i]['id'] + "' >" + difference[i]['total_likes'] + "</span>";
                                } else {
                                    like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + difference[i]['id'] + "' data_field_id=" + difference[i]['id'] + "></div><span class='point' id='span_" + difference[i]['id'] + "' >" + difference[i]['total_likes'] + "</span>";
                                }
                                if (difference[i]['dislike_before'] === true) {
                                    var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + difference[i]['id'] + "' data_field_id =" + difference[i]['id'] + "></div><span class='point' id='span_dis_" + difference[i]['id'] + "' > " + difference[i]['total_dislikes'] + " </span>";
                                } else {
                                    dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + difference[i]['id'] + "' data_field_id =" + difference[i]['id'] + "></div><span class='point' id='span_dis_" + difference[i]['id'] + "' > " + difference[i]['total_dislikes'] + " </span></div>";
                                }
                                if (user === difference[i]['user_id']) {
                                    delete_str = "</div><div class='itemoptionmorebutton_delete' id=" + difference[i]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + difference[i]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + difference[i]['id'] + "> <div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";

                                    $('.carousel').append(strings + like_str + dislike_str  + delete_str);



                                } else {
                                    flag_str = "</div></div><div class='itemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='itemoptionmoreoptionholder_flag'><div class='itemflagas' style='display: none'><span class='itemflagdescription'>Flag contribution as:</span><form class='flagasoptionslist' id=" + difference[i]['id'] + "><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"

                                    if(difference[i]['abusive'] == 1){
                                        var abusive_str = "<input type='checkbox' name='abusive' id='abusive' class='flagasoptions  abusive checked' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='1' data_id=" + difference[i]['id'] + "vchecked='checked'> <span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['abusive'] == 0){
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['spam'] == 1){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['spam'] == 0){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['iip'] == 1){
                                        var iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else if(difference[i]['iip'] == 0){
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else{
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }

                                    score_str = "</div><div class='flagreportbuttonholder' id=" + difference[i]['id'] + "><div class='flagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button' class='commentflagreportbutton flagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i][' id'] + "'>" + difference[i]['score'] + "</span></div></li>"

                                    $('.carousel').append(strings + like_str + dislike_str +  flag_str + abusive_str + spam_str +iip_str + score_str);

                                }
                            }
                            $(".element").css('height', ($(".all-items").height()) + 'px');
                            $(".element").css('width', ($(".all-items").width() - 85) + 'px');



                        }
                        total_width = parseInt($('.carousel').width()) + number.length * ($(".all-items").width() - 85) + number.length * 10;
                        $('.carousel').css('width', total_width + 'px');
                    }


                    selected_id = parseInt($(".selected").parent().parent().parent().parent().siblings().attr("data_elem_id"));
                    for (j = 0; j < Object.keys(sorted_load).length; j++) {
                        $(".carousel li").each(function () {
                            $("#elem_" + sorted_load[j]['id']).attr('data-score', sorted_load[j]['score']);
                        });
                        $("#elem_" + sorted_load[j]['id']).attr('data-select-at', sorted_load[j]['selected']);
                        $("#span_" + sorted_load[j]['id']).text(sorted_load[j]['total_likes']);
                        $("#span_dis_" + sorted_load[j]['id']).text(sorted_load[j]['total_dislikes']);
                    }

                    index = sorted_load.findIndex((item) => item.selected === 1);
                    if (index != -1) {
                        from = $("#elem_" + sorted_load[index]['id']).detach();
                        $(".carousel li:nth-child(1)").before(from);
                        if (parseInt($(".content_user").attr("content-user-id")) != parseInt($(".user").attr("id"))) {
                            $(".admin").remove();
                            $(".carousel li:nth-child(1)").append("<div class='admin'><div class='select_unselect'><span><div type='button' class='users'></div></span></div></div>");
                        }
                    }
// if(parseInt(difference.length) == 0 ){
//     $(".load-more").hide();
//                 $(".prev-load-more").show();
// }
                    // if (Object.keys(sorted_load).length % 2 == 0) {
                    //     if (!$.trim($('.mainc').html()).length == false) {
                    //         if (count == Object.keys(sorted_load).length) {
                    //             // $(".load-more").css('display','block');
                    //             $(".prev-load-more").show();
                    //         }
                    //     } else {
                    //         if (count == Object.keys(sorted_load).length) {
                    //             // $(".load-more").hide();
                    //             $(".prev-load-more").show();
                    //         }
                    //     }
                    // } else {
                    //     if (!$.trim($('.mainc').html()).length == false && Object.keys(sorted_load).length > 1) {
                    //         if (count == Object.keys(sorted_load).length) {
                    //             $(".load-more").hide();
                    //             $(".prev-load-more").show();
                    //         }
                    //     } else {
                    //         if (count == Object.keys(sorted_load).length) {
                    //             $(".load-more").hide();
                    //             $(".prev-load-more").show();
                    //         }
                    //     }
                    // }
                }
            },
            complete: function () {
                if (apis.length) {
                    $.each(
                        apis,
                        function (i) {
                            this.destroy();
                        }
                    )
                    apis = [];
                }
                $('.descrip').each(
                    function () {
                        apis.push($(this).jScrollPane().data().jsp);
                    }
                );
                $(window).resize(function () {
                        $.each(
                            apis,
                            function (i) {
                                this.reinitialise();
                            }
                        )
                    }
                );
            }
        });

        left = left_next;
        count = count + 1;
        $(".carousel").attr('data-count', count);

        // $(window).resize(function () {
        //
        //     $(".carousel").attr('data-count', count);
        //     if (count == sorted_load.length) {
        //         // $(".prev-load-more").show();
        //         // $(".load-more").hide()
        //     }
        //
        // }).resize();
        console.log(count)
        if (count == sorted_load.length) {
            $(".prev-load-more").show();
            $(".load-more").hide()
        } else {
            $("#load_loader").show();
            $(".load-more").hide();

            setInterval(function () {
                $("#load_loader").hide();
                if (count == sorted_load.length) {
                    $(".prev-load-more").show();
                    // $(".load-more").hide()
                } else {
                    $(".load-more").show();
                }
            }, 1000);
        }
        return false;

    });

    $(".wrapper").on('click', '.prev-load-more', function (e) {
        var sorted_load = [];
        var load = [];
        k = k - 1;
        n = n - 1;
        // alert(n)
        count = parseInt($(".carousel").attr('data-count')) - 1;
        $(".carousel").attr('data-count', count);

        $('.load-more').show();
        var left = parseInt($('.all-items').css("margin-left"));
        var left_next = left + ($(".all-items").width() - 85 + 10);
        $('.all-items').animate({'margin-left': left_next + 'px'}, {"duration": 1000, "easing": "linear"});

        if (!$.trim($('.mainc').html()).length == false) {
            if (count == 0) {
                $(".prev-load-more").hide();
                $(".load-more").show();
            }
        } else {
            if (count == 1) {
                $(".prev-load-more").hide();
                $(".load-more").show();
            }
        }
        number = [];
        $('.carousel').children().each(function () {
            number.push(parseInt($(this).attr("data_elem_id")));
        });
        $.ajax({
            type: 'POST',
            url: 'ajax/loadmore.php',
            data: {lists_pointer: lists_pointer},

            success: function (data) {
                var objects = JSON.parse(data);
                // load = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        load.push(objects[i]);
                    }
                    sorted_load = Object.values(load);
                    console.log(sorted_load)
                    index = sorted_load.findIndex((item) => item.selected === 1);
                    console.log(index);
                    if (index != -1) {
                        var shifted = sorted_load.splice(index, 1);
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
                        sorted_load.unshift(shifted[0]);
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

                    array_load = [];
                    for (i = 0; i < number.length; i++) {
                        getindexs = sorted_load.findIndex((item) => item.id === number[i]);
                        // console.log(getindexs)
                        array_load.push(sorted_load[getindexs])
                    }

                    sorted_load.splice(array_load.length)
                    console.log(sorted_load)
                    var difference = [];

                    //for live value update
                    for (var i = 0; i < array_load.length; i++) {
                        $("#span_" + array_load[i]['id']).text(array_load[i]['total_likes']);
                        $("#span_score_" + array_load[i]['id']).text(array_load[i]['score']);
                        $("#elem_" + array_load[i]['id']).attr('data-score', array_load[i]['score']);
                        $("#elem_" + array_load[i]['id']).attr('data-select-at', array_load[i]['selected']);

                    }
                    $(".carousel").each(function () {
                        $(this).html($(this).children('li').sort(function (a, b) {
                            if (($(a).data('select-at')) > ($(b).data('select-at'))) {
                                return ($(b).data('select-at')) - ($(a).data('select-at'));

                            } else if (($(a).data('select-at')) === ($(b).data('select-at'))) {
                                if (($(a).data('score')) === ($(b).data('score'))) {
                                    return ($(a).data('score')) - ($(b).data('score'));
                                } else {
                                    return ($(b).data('score')) - ($(a).data('score'));
                                }
                            }
                        }));
                    });
                    jQuery.grep(sorted_load, function (el) {
                        if (jQuery.inArray(el, array_load) == -1) difference.push(el);
                    });

                    console.log(difference)
                    if (difference.length > 0) {
                        for (i = difference.length - 1; i >= 0; i--) {
                            console.log(difference[0])
                            getindexs = sorted_load.findIndex((item) => item.id === difference[0]['id']);
                            console.log(getindexs)
                            console.log(sorted_load[getindexs])

                            if (user === sorted_load[getindexs]['content_user_id']) {
                                strings = "<li class='element' id='elem_" + sorted_load[getindexs]['id'] + "' data_elem_id=" + sorted_load[getindexs]['id'] + " data-score=" + sorted_load[getindexs]['score'] + " data_id=" + sorted_load[getindexs]['id'] + " data-select-at=" + sorted_load[getindexs]['selected'] + "><div class='content-part'><a href='../content_with_image.php/" + sorted_load[getindexs]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='main-content'><b>" + sorted_load[getindexs]['username'] + " </b><div class='descrip' id='des_" + sorted_load[getindexs]['id'] + "'><p class='para' id='para_" + sorted_load[getindexs]['id'] + "'>" + sorted_load[getindexs]['text'] + " </p></div></div>";
                                if (sorted_load[getindexs]['like_before'] === true) {
                                    var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + sorted_load[getindexs]['id'] + "' data_field_id=" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_" + sorted_load[getindexs]['id'] + "' >" + sorted_load[getindexs]['total_likes'] + "</span>";
                                } else {
                                    like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + sorted_load[getindexs]['id'] + "' data_field_id=" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_" + sorted_load[getindexs]['id'] + "' >" + sorted_load[getindexs]['total_likes'] + "</span>";
                                }
                                if (sorted_load[getindexs]['dislike_before'] === true) {
                                    var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + sorted_load[getindexs]['id'] + "' data_field_id =" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[getindexs]['id'] + "' > " + sorted_load[getindexs]['total_dislikes'] + " </span>";
                                } else {
                                    dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + sorted_load[getindexs]['id'] + "' data_field_id =" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[getindexs]['id'] + "' > " + sorted_load[getindexs]['total_dislikes'] + " </span></div>";
                                }
                                if (sorted_load[getindexs]['selected'] === 0) {
                                    var selection = "</div><div class='admin'><div class='select_unselect'><span><div id='select_" + sorted_load[getindexs]['id'] + "' class='select not_selected' data_field_id =" + sorted_load[getindexs]['id'] + "></div></span></div>";
                                } else {
                                    selection = "</div><div class='admin'><div class='select_unselect'><span><div id='select_" + sorted_load[getindexs]['id'] + "' class='select selected' data_field_id =" + sorted_load[getindexs]['id'] + "></div></span></div>";
                                }
                                if (user === sorted_load[getindexs]['user_id']) {
                                    delete_str = "</div><div class='itemoptionmorebutton_delete' id=" + sorted_load[getindexs]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + sorted_load[getindexs]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + sorted_load[getindexs]['id'] + "> <div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + sorted_load[getindexs]['id'] + "'>" + sorted_load[getindexs]['score'] + "</span></div></li>";

                                    $(".carousel li").last().before(strings + like_str + dislike_str + selection + delete_str);

                                } else {
                                    flag_str = "</div></div><div class='itemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='itemoptionmoreoptionholder_flag'><div class='itemflagas' style='display: none'><span class='itemflagdescription'>Flag contribution as:</span><form class='flagasoptionslist' id=" + difference[i]['id'] + "><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"

                                    if(difference[i]['abusive'] == 1){
                                        var abusive_str = "<input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='1' data_id=" + difference[i]['id'] + "> <span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['abusive'] == 0){
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['spam'] == 1){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['spam'] == 0){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['iip'] == 1){
                                        var iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else if(difference[i]['iip'] == 0){
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else{
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }

                                    score_str = "</div><div class='flagreportbuttonholder' id=" + difference[i]['id'] + "><div class='flagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button' class='commentflagreportbutton flagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i][' id'] + "'>" + difference[i]['score'] + "</span></div></li>"
                                    $(".carousel li").last().before(strings + like_str + dislike_str + selection + flag_str + abusive_str + spam_str +iip_str + score_str)
                                }
                                // $(".carousel li").last().before(strings + like_str + dislike_str + score_str)



                            } else {

                                strings = "<li class='element' id='elem_" + sorted_load[getindexs]['id'] + "' data_elem_id=" + sorted_load[getindexs]['id'] + " data-score=" + sorted_load[getindexs]['score'] + " data_id=" + sorted_load[getindexs]['id'] + " data-select-at=" + sorted_load[getindexs]['selected'] + "><div class='content-part'><a href='../content_with_image.php/" + sorted_load[getindexs]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='main-content'><b>" + sorted_load[getindexs]['username'] + " </b><div class='descrip' id='des_" + sorted_load[getindexs]['id'] + "'><p class='para' id='para_" + sorted_load[getindexs]['id'] + "'>" + sorted_load[getindexs]['text'] + " </p></div></div>";
                                if (sorted_load[getindexs]['like_before'] === true) {
                                    var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + sorted_load[getindexs]['id'] + "' data_field_id=" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_" + sorted_load[getindexs]['id'] + "' >" + sorted_load[getindexs]['total_likes'] + "</span>";
                                } else {
                                    like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + sorted_load[getindexs]['id'] + "' data_field_id=" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_" + sorted_load[getindexs]['id'] + "' >" + sorted_load[getindexs]['total_likes'] + "</span>";
                                }
                                if (sorted_load[getindexs]['dislike_before'] === true) {
                                    var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + sorted_load[getindexs]['id'] + "' data_field_id =" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[getindexs]['id'] + "' > " + sorted_load[getindexs]['total_dislikes'] + " </span>";
                                } else {
                                    dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + sorted_load[getindexs]['id'] + "' data_field_id =" + sorted_load[getindexs]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[getindexs]['id'] + "' > " + sorted_load[getindexs]['total_dislikes'] + " </span></div>";
                                }
                                if (user === sorted_load[getindexs]['user_id']) {
                                    delete_str = "</div><div class='itemoptionmorebutton_delete' id=" + sorted_load[getindexs]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + sorted_load[getindexs]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + sorted_load[getindexs]['id'] + "> <div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + sorted_load[getindexs]['id'] + "'>" + sorted_load[getindexs]['score'] + "</span></div></li>";

                                    $(".carousel li").last().before(strings + like_str + dislike_str  + delete_str);
                                } else {

                                    flag_str = "</div></div><div class='itemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='itemoptionmoreoptionholder_flag'><div class='itemflagas' style='display: none'><span class='itemflagdescription'>Flag contribution as:</span><form class='flagasoptionslist' id=" + difference[i]['id'] + "><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"

                                    if(difference[i]['abusive'] == 1){
                                        var abusive_str = "<input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'> <span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['abusive'] == 0){
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        abusive_str = " <input type='checkbox' name='abusive' id='abusive' class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['spam'] == 1){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "'  data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if(difference[i]['spam'] == 0){
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else{
                                        var spam_str = "<input type='checkbox' name='spam' id='spam' class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if(difference[i]['iip'] == 1){
                                        var iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else if(difference[i]['iip'] == 0){
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else{
                                        iip_str = "<input type='checkbox' name='ip' id='listflagip' class='flagasoptions listflagip' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span>"
                                    }

                                    score_str = "</div><div class='flagreportbuttonholder' id=" + difference[i]['id'] + "><div class='flagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button' class='commentflagreportbutton flagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i][' id'] + "'>" + difference[i]['score'] + "</span></div></li>"
                                    $(".carousel li").last().before(strings + like_str + dislike_str + flag_str + abusive_str + spam_str +iip_str + score_str)
                                }
                                // $(".carousel li").last().before(strings + like_str + dislike_str + score_str)
                            }
                            // $(".element").css('height', (196) + 'px');
                            $(".element").css('height', ($(".all-items").height()) + 'px');
                            $(".element").css('width', ($(".all-items").width() - 85) + 'px');
                        }
                        total_width = parseInt($('.carousel').width()) + number.length * ($(".all-items").width() - 85) + number.length * 10;
                        $('.carousel').css('width', total_width + 'px');
                    }
                }
            },
            complete: function () {
                if (apis.length) {
                    $.each(
                        apis,
                        function (i) {
                            this.destroy();
                        }
                    )
                    apis = [];
                }

                $('.descrip').each(
                    function () {
                        apis.push($(this).jScrollPane().data().jsp);
                    }
                );
                $(window).resize(function () {
                        $.each(
                            apis,
                            function (i) {
                                this.reinitialise();
                            }
                        )
                    }
                );
            }
        });

        left = left_next;
    });
})
