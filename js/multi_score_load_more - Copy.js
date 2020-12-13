$(document).ready(function () {
    lists_pointer = parseInt($('.cont').text());
    // mwidth = ($(".multimain-content").width() - 30)
    // $(".multicontent").css('width', mwidth + 'px')
    $(".carousel_multi").css('visibility', 'visible');

    mk = 0;
    mn = parseInt($('.carousel_multi li').length);
    $(window).on('resize', function () {
        $(".multicontent").css('width', ($(".all-items-multi").width() - 85) + 'px');
        $(".multicontent").css('height', ($(".content").height()) + 'px');
        $(".multicontent-part").css('height', ($(".content").height()) + 'px');
        $(".multicontent-part").css('width', ($(".all-items-multi").width() - 85) + 'px');
    });

    $(".multicontent").css('width', ($(".all-items-multi").width() - 85) + 'px');
    $(".multicontent").css('height', ($(".content").height()) + 'px');
    $(".multicontent-part").css('height', ($(".content").height()) + 'px');
    $(".multicontent-part").css('width', ($(".all-items-multi").width() - 85) + 'px');


    $(".multi_part").on('click', '.multiload-more', function (e) {
        checkanimate = 2;
        e.preventDefault();
        multi_count = parseInt($(".carousel_multi").attr('data-count'));
        $("#multiload_loader").show();
        var multi_sorted_load = [];

        $(window).on('resize', function () {
            // mwidth = ($(".multimain-content").width() - 30)
            // $(".multicontent").css('width', mwidth + 'px')
        });
        $(".multi-element").css('height', ($(".content").height()) + 'px');

       arraylength =  parseInt($('.arraylength').val());
       // if(mk <= arraylength) {
           mk = mk + 1;
       // }
        $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');
        $(".multi-element").css('height', ($(".content").height()) + 'px');
        mn = parseInt($('.carousel_multi li').length);
        mn = mn + 1;
        multi_left = parseInt($('.all-items-multi').css("margin-left"));
        multi_left_width = parseInt($('.all-items-multi').width());
        multi_left_next = multi_left - (multi_left_width - 85 + 10);
       $('.all-items-multi').animate({'margin-left': multi_left_next + 'px'}, {"duration": 1000, "easing": "linear"});

         number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });

        console.log(number);
        $('.multiprev-load-more').show();
        user = parseInt($('.user_id').attr("id"));
        multirow = parseInt($('#multirow').val());
        // console.log(multirow)
        rowperpage = 1;
        multirow_count = multirow + rowperpage;

        $("#multirow").val(multirow_count);

        if(checkanimate == 2) {
            $(window).resize(function () {

                multi_left_width = parseInt($('.multi-element').width());
                multi_left_next = multi_count * multi_left_width + multi_count * 10;
                console.log("amount of multi load more" + multi_left_next);
                // console.log("the number is " + mn);
                $('.all-items-multi').css('margin-left', -multi_left_next + 'px');
                console.log($(this).siblings('.all-items-multi').length)
            //     $(this).siblings('.all-items-multi').css('margin-left', -multi_left_next + 'px');
            // }.bind(this));
            });
        }
        $.ajax({
            type: 'POST',
            url: 'ajax/multimedialoadmore.php',
            data: {lists_pointer: lists_pointer},

            success: function (data) {
                // console.log(data)
                var objects = JSON.parse(data);
                multiload = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        multiload.push(objects[i]);
                    }
                    multi_sorted_load = Object.values(multiload);


                    console.log(multi_sorted_load)
                    index = multi_sorted_load.findIndex((item) => item.selected === 1);
                    console.log(index);
                    if (index != -1) {
                        var shifted = multi_sorted_load.splice(index, 1);
                        multi_sorted_load.sort(function (a, b) {
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
                        multi_sorted_load.unshift(shifted[0]);
                    } else {
                        multi_sorted_load.sort(function (a, b) {
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
                        getmultiindexs = multi_sorted_load.findIndex((item) => item.id === number[i]);
                        array_load.push(multi_sorted_load[getmultiindexs])
                    }
                    console.log(multi_sorted_load.length)
                    var difference = [];

                    //for live value update
                    for (var i = 0; i < array_load.length; i++) {
                        $("#multispan_" + array_load[i]['id']).text(array_load[i]['total_likes']);
                        $("#multispan_score_" + array_load[i]['id']).text(array_load[i]['score']);
                        $("#multi_elem_" + array_load[i]['id']).attr('data-score', array_load[i]['score']);
                        $("#multi_elem_" + array_load[i]['id']).attr('data-select-at', array_load[i]['selected']);
                    }

                    $(".carousel_multi").each(function () {
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

                    jQuery.grep(multi_sorted_load, function (el) {
                        if (jQuery.inArray(el, array_load) == -1) difference.push(el);
                    });
                    console.log(difference)
                    if (multi_sorted_load.length % 2 == 0) {
                        loop_number = 2;
                    } else {
                        loop_number = 1;
                    }

                    if (difference.length > 0) {
                        for (i = 0; i < loop_number; i++) {
                            if (user === difference[i]['content_user_id']) {

                                strings = "<li class='multi-element' id='multi_elem_" + difference[i]['id'] + "' data_multi_elem_id='" + difference[i]['id'] + "' data-score=" + difference[i]['score'] + " data_id=" + difference[i]['id'] + " data-select-at=" + difference[i]['selected'] + "><div class='multicontent-part'><div class='photo' id='des_" + difference[i]['id'] + "'><img src='multimedia_contributions/" + difference[i]['image'] + "' class='multicontent' alt='No Image' style='height: 100%'></div><div class='hoverable' style='display: none'><a href='../content_with_image.php/" + difference[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + difference[i]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + difference[i]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";
                                if (difference[i]['like_before'] === true) {
                                    var like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"
                                } else {
                                    like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"

                                }
                                if (difference[i]['dislike_before'] === true) {
                                    var dislike_str = "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"
                                } else {
                                    dislike_str =  "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"

                                }
                                if (difference[i]['selected'] === 0) {
                                    var selection = "</div></div><div class='admin'><div class='select_unselect'><span><input type='button' id='select_" + difference[i]['id'] + "'  class='multiselect not_selected'   data_field_id =" + difference[i]['id'] + "></span></div>";
                                } else {
                                    selection = "</div></div><div class='admin'><div class='select_unselect'><span><input type='button' id='select_" + difference[i]['id'] + "'  class='multiselect selected'   data_field_id =" + difference[i]['id'] + "></span></div>";
                                }
                                if (user === difference[i]['user_id']) {
                                    score_str = "</div></div><div class='imageitemoptionmorebutton_delete' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + difference[i]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + difference[i]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";


                                } else {
                                    score_str = "</div></div><div class='imageitemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_flag'><div class='imageitemflagas' style='display: none'><span class='imageitemflagdescription'>Flag multimedia contribution as:</span><form class='imageflagasoptionslist' id=" + difference[i]['id'] + "><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + "><input type='checkbox' name='abusive' id='abusive' class='flagasoptions' label='Hateful or abusive' prev_abusive=" + document.multiprev['abusive'] + " data_id=" + difference[i]['id'] + " ><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + "><input type='checkbox' name='spam' id='spam' class='flagasoptions' label='Spam or inappropriate' prev_spam=" + document.multiprev['spam'] + " data_id=" + difference[i]['id'] + " ><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + "><input type='checkbox' name='ip' id='listflagip' class='flagasoptions' label='Infringment of intellectual property' prev_iip=" + document.multiprev['iip'] + " data_id=" + difference[i]['id'] + " ><span class='imageflagasoptionstext'>Infringment of intellectual property</span></div><div class='imageflagreportbuttonholder' id=" + difference[i]['id'] + "><div class='imageflagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button'  class='imagecommentflagreportbutton imageflagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";
                                }
                                $('.carousel_multi').append(strings + like_str + dislike_str + selection + flag_str + abusive_str + spam_str +iip_str + score_str);
                            } else {
                                strings = "<li class='multi-element' id='multi_elem_" + difference[i]['id'] + "' data_multi_elem_id='" + difference[i]['id'] + "' data-score=" + difference[i]['score'] + " data_id=" + difference[i]['id'] + " data-select-at=" + difference[i]['selected'] + "><div class='multicontent-part'><div class='photo' id='des_" + difference[i]['id'] + "'><img src='multimedia_contributions/" + difference[i]['image'] + "' class='multicontent' alt='No Image' style='height: 100%'></div><div class='hoverable' style='display: none'><a href='../content_with_image.php/" + difference[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + difference[i]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + difference[i]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";
                                if (difference[i]['like_before'] === true) {
                                    var like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"
                                } else {
                                    like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"

                                }
                                if (difference[i]['dislike_before'] === true) {
                                    var dislike_str = "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_dislikes'] + "</span>"
                                } else {
                                    dislike_str =  "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_dislikes'] + "</span>"

                                }
                                if (user === difference[i]['user_id']) {
                                    score_str = "</div></div><div class='imageitemoptionmorebutton_delete' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + difference[i]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + difference[i]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";
                                } else {
                                    score_str = "</div></div><div class='imageitemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_flag'><div class='imageitemflagas' style='display: none'><span class='imageitemflagdescription'>Flag multimedia contribution as:</span><form class='imageflagasoptionslist' id=" + difference[i]['id'] + "><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + "><input type='checkbox' name='abusive' id='abusive' class='flagasoptions' label='Hateful or abusive' prev_abusive=" + document.multiprev['abusive'] + " data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + "><input type='checkbox' name='spam' id='spam' class='flagasoptions' label='Spam or inappropriate' prev_spam=" + document.multiprev['spam'] + " data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + "><input type='checkbox' name='ip' id='listflagip' class='flagasoptions' label='Infringment of intellectual property' prev_iip=" + document.multiprev['iip'] + " data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span></div><div class='imageflagreportbuttonholder' id=" + difference[i]['id'] + "><div class='imageflagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button'  class='imagecommentflagreportbutton imageflagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";
                                }
                                $('.carousel_multi').append(strings + like_str + dislike_str + score_str);
                            }

                            $(".multicontent").css('width', ($(".all-items-multi").width() - 85) + 'px');
                            $(".multicontent").css('height', ($(".content").height()) + 'px');
                            $(".multicontent-part").css('height', ($(".content").height()) + 'px');
                            $(".multicontent-part").css('width', ($(".all-items-multi").width() - 85) + 'px');
                            $(".multi-element").css('height', ($(".content").height()) + 'px');
                            $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');
                            total_width = parseInt($('.carousel_multi').width()) + n * ($(".all-items-multi").width() - 85) + n * 10;
                            $('.carousel_multi').css('width', total_width + 'px');

                        }
                    }
                    selected_id = parseInt($(".selected").parent().parent().parent().parent().siblings().attr("data_multi_elem_id"));
                    for (j = 0; j < Object.keys(multi_sorted_load).length; j++) {
                        $(".carousel_multi li").each(function () {
                            $("#multi_elem_" + multi_sorted_load[j]['id']).attr('data-score', multi_sorted_load[j]['score']);
                        });
                        $("#multi_elem_" + multi_sorted_load[j]['id']).attr('data-select-at', multi_sorted_load[j]['selected']);
                        $("#span_" + multi_sorted_load[j]['id']).text(multi_sorted_load[j]['total_likes']);
                        $("#span_dis_" + multi_sorted_load[j]['id']).text(multi_sorted_load[j]['total_dislikes']);
                    }

                    index = multi_sorted_load.findIndex((item) => item.selected === 1);
                    if (index != -1) {
                        from = $("#multi_elem_" + multi_sorted_load[index]['id']).detach();
                        $(".carousel_multi li:nth-child(1)").before(from);
                        if (parseInt($(".content_user").attr("content-user-id")) != parseInt($(".user").attr("id"))) {
                            $(".admin").remove();
                            $(".carousel_multi li:nth-child(1)").append("<div class='admin'><div class='select_unselect'><span><input type='button' class='users'</span></div></div>");
                        }
                    }


                    if (multi_count == Object.keys(multi_sorted_load).length) {
                        $(".multiload-more").hide()
                    }
                }
            }

        });

        multi_left = multi_left_next;
        multi_count = multi_count + 1;
        $(".carousel_multi").attr('data-count', multi_count);
        // $(window).resize(function () {
        //
        //     $(".carousel_multi").attr('data-count', multi_count);
        //     if (multi_count == multi_sorted_load.length) {
        //         $(".multiprev-load-more").show();
        //         $(".multiload-more").hide()
        //     }
        //
        // }).resize();

        // $("#multiload_loader").show();
            // setInterval(function (e) {
            //     $("#multiload_loader").hide();
            // }, 1000);


        // $(".multiload-more").hide();

        setInterval(function () {
            $("#multiload_loader").hide();
            if (multi_count == multi_sorted_load.length) {
            //     $(".multiprev-load-more").show();
            //     $(".multiload-more").hide()
            // } else {
            //     $(".multiload-more").show();
            }
        }, 1000);

        return false;
    });

    $(".multi_part").on('click', '.multiprev-load-more', function (e) {
        $(".multiload-more").show()
        // var multi_count = parseInt($(".carousel_multi").attr('data-count'));
        // lists_pointer = parseInt($('.cont').text());
        var multi_sorted_load = [];
        multi_count = multi_count - 1;
        mk = mk - 1;
        n = n - 1;

        $(".carousel_multi").attr('data-count', multi_count);
        var left = parseInt($('.all-items-multi').css("margin-left"));
        var left_next = left + ($(".all-items-multi").width() - 85 + 10);
        $('.all-items-multi').animate({'margin-left': left_next + 'px'}, {"duration": 1000, "easing": "linear"});
        number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });

        $.ajax({
            type: 'POST',
            url: 'ajax/multimedialoadmore.php',
            data: {lists_pointer: lists_pointer},
            success: function (data) {
                var objects = JSON.parse(data);
                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        multi_sorted_load.push(objects[i]);
                    }
                    multiindex = multi_sorted_load.findIndex((item) => item.selected === 1);
                    console.log(multiindex);
                    if (multiindex != -1) {
                        var shifted = multi_sorted_load.splice(multiindex, 1);
                        multi_sorted_load.sort(function (a, b) {
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
                        multi_sorted_load.unshift(shifted[0]);
                    } else {
                        multi_sorted_load.sort(function (a, b) {
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

                    multiarray_load = [];
                    for (i = 0; i < number.length; i++) {
                        getmultiindexs = multi_sorted_load.findIndex((item) => item.id === number[i]);
                        multiarray_load.push(multi_sorted_load[getmultiindexs])
                    }

                    var difference = [];

                    //for live value update
                    for (var i = 0; i < multiarray_load.length; i++) {
                        $("#multispan_" + multiarray_load[i]['id']).text(multiarray_load[i]['total_likes']);
                        $("#multispan_score_" + multiarray_load[i]['id']).text(multiarray_load[i]['score']);
                        $("#multi_elem_" + multiarray_load[i]['id']).attr('data-score', multiarray_load[i]['score']);
                        $("#multi_elem_" + multiarray_load[i]['id']).attr('data-select-at', multiarray_load[i]['selected']);

                    }
                    console.log(multiarray_load)
                    $(".carousel_multi").each(function () {
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


                    jQuery.grep(multi_sorted_load, function (el) {
                        if (jQuery.inArray(el, multiarray_load) == -1) difference.push(el);
                    });

                    console.log(difference)
                    if (difference.length > 0) {
                        for (i = difference.length - 1; i >= 0; i--) {
                            console.log(difference[0])
                            getmultiindexs = multi_sorted_load.findIndex((item) => item.id === difference[0]['id']);
                            console.log(getmultiindexs)
                            console.log(multi_sorted_load[getmultiindexs])

                            if (user === multi_sorted_load[getmultiindexs]['content_user_id']) {
                                strings = "<li class='multi-element' id='multi_elem_" + multi_sorted_load[getmultiindexs]['id'] + "' data_multi_elem_id=" + multi_sorted_load[getmultiindexs]['id'] + " data-score=" + multi_sorted_load[getmultiindexs]['score'] + " data_id=" + multi_sorted_load[getmultiindexs]['id'] + " data-select-at=" + multi_sorted_load[getmultiindexs]['selected'] + "><div class='multicontent-part'><a href='../content_with_image.php/" + multi_sorted_load[getmultiindexs]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='multimain-content'><b>" + multi_sorted_load[getmultiindexs]['username'] + " </b><div class='descrip' id='des_" + multi_sorted_load[getmultiindexs]['id'] + "'><p class='para' id='para_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['text'] + " </p></div></div>";
                                if (multi_sorted_load[getmultiindexs]['like_before'] === true) {
                                    var like_str = "</div><div class='multiopinion'><div class='multicontributionslikedislike'><div class='likebutton liked_before' id='sel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_" + multi_sorted_load[getmultiindexs]['id'] + "' >" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>";
                                } else {
                                    like_str = "</div><div class='multiopinion'><div class='multicontributionslikedislike'><div class='likebutton like'  id='sel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_" + multi_sorted_load[getmultiindexs]['id'] + "' >" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>";
                                }
                                if (multi_sorted_load[getmultiindexs]['dislike_before'] === true) {
                                    var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' > " + multi_sorted_load[getmultiindexs]['total_dislikes'] + " </span>";
                                } else {
                                    dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' > " + multi_sorted_load[getmultiindexs]['total_dislikes'] + " </span></div>    ";
                                }
                                if (multi_sorted_load[getmultiindexs]['selected'] === 0) {
                                    var selection = "</div><div class='admin'><div class='select_unselect'><span><input type='button' id='select_" + multi_sorted_load[getmultiindexs]['id'] + "'  class='select not_selected'   data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></span></div>";
                                } else {
                                    selection = "</div><div class='admin'><div class='select_unselect'><span><input type='button' id='select_" + multi_sorted_load[getmultiindexs]['id'] + "'  class='select selected'   data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></span></div>";
                                }
                                if (user === multi_sorted_load[getmultiindexs]['user_id']) {
                                    score_str = "</div><div class='itemoptionmorebutton_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "> <div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>";
                                } else {
                                    score_str = "</div><div class='itemoptionmorebutton_flag' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='itemoptionmoreoptionholder_flag'><div class='itemflagas' style='display: none'><span class='itemflagdescription'>Flag contribution as:</span><form class='flagasoptionslist' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='checkbox' name='abusive' id='abusive' class='flagasoptions' label='Hateful or abusive' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='checkbox' name='spam' id='spam' class='flagasoptions' label='Spam or inappropriate' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='checkbox' name='ip' id='listflagip' class='flagasoptions' label='Infringment of intellectual property' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span></div><div class='flagreportbuttonholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='flagreportobutton allcorners' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='button'  class='commentflagreportbutton flagreportbutton iebutton' value='Report' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div></div></form></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>";
                                }
                                $(".carousel_multi li").last().before(strings + like_str + dislike_str + score_str)
                            } else {
                                strings = "<li class='multi-element' id='multi_elem_" + multi_sorted_load[getmultiindexs]['id'] + "' data_multi_elem_id=" + multi_sorted_load[getmultiindexs]['id'] + " data-score=" + multi_sorted_load[getmultiindexs]['score'] + " data_id=" + multi_sorted_load[getmultiindexs]['id'] + " data-select-at=" + multi_sorted_load[getmultiindexs]['selected'] + "><div class='multicontent-part'><a href='../content_with_image.php/" + multi_sorted_load[getmultiindexs]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='multimain-content'><b>" + multi_sorted_load[getmultiindexs]['username'] + " </b><div class='descrip' id='des_" + multi_sorted_load[getmultiindexs]['id'] + "'><p class='para' id='para_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['text'] + " </p></div></div>";
                                if (multi_sorted_load[getmultiindexs]['like_before'] === true) {
                                    var like_str = "</div><div class='multiopinion'><div class='multicontributionslikedislike'><div class='likebutton liked_before' id='sel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_" + multi_sorted_load[getmultiindexs]['id'] + "' >" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>";
                                } else {
                                    like_str = "</div><div class='multiopinion'><div class='multicontributionslikedislike'><div class='likebutton like'  id='sel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_" + multi_sorted_load[getmultiindexs]['id'] + "' >" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>";
                                }
                                if (multi_sorted_load[getmultiindexs]['dislike_before'] === true) {
                                    var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' > " + multi_sorted_load[getmultiindexs]['total_dislikes'] + " </span>";
                                } else {
                                    dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></div><span class='point' id='span_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' > " + multi_sorted_load[getmultiindexs]['total_dislikes'] + " </span></div>";
                                }
                                if (user === multi_sorted_load[getmultiindexs]['user_id']) {
                                    score_str = "</div><div class='itemoptionmorebutton_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "> <div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>";
                                } else {
                                    score_str = "</div><div class='itemoptionmorebutton_flag' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='itemoptionmoreoptionholder_flag'><div class='itemflagas' style='display: none'><span class='itemflagdescription'>Flag contribution as:</span><form class='flagasoptionslist' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='checkbox' name='abusive' id='abusive' class='flagasoptions' label='Hateful or abusive' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='flagasoptionstext'>Hateful or abusive</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='checkbox' name='spam' id='spam' class='flagasoptions' label='Spam or inappropriate' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='flagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='checkbox' name='ip' id='listflagip' class='flagasoptions' label='Infringment of intellectual property' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='flagasoptionstext'>Infringment of intellectual property</span></div><div class='flagreportbuttonholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='flagreportobutton allcorners' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='button'  class='commentflagreportbutton flagreportbutton iebutton' value='Report' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div></div></form></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>";
                                }
                                $(".carousel_multi li").last().before(strings + like_str + dislike_str + score_str)
                            }
                            $("#multi_elem_" + multi_sorted_load[getmultiindexs]['id']).css('width', ($(".all-items-multi").width() - 85) + 'px');
                            $("#multi_elem_" + multi_sorted_load[getmultiindexs]['id']).css('height', ($(".content").height()) + 'px');
                        }
                        multi_total_width = parseInt($('.carousel_multi').width()) + n * ($(".all-items-multi").width() - 85) + n * 10;
                        $('.carousel_multi').css('width', multi_total_width + 'px');
                    }
                }
            }

        });
        if (multi_count == 0) {
            $('.multiload-more').show();
            $('.multiprev-load-more').hide();
        }


        multi_left = multi_left_next;
    });

})
