$(document).ready(function () {
    $(".carousel").on('click', '.likebutton', function (e) {
        contributions_pointer = parseInt($(this).attr("data_field_id"));
        lists_pointer = parseInt($('.cont').text());
        if ($(this).hasClass('liked_before')) {
            $(this).addClass('like').removeClass('liked_before');
            var value = parseInt($("#span_" + contributions_pointer).text());
            value = value - 1;
            $("#span_" + contributions_pointer).text(value);
        } else if ($(this).parent().children().hasClass('disliked_before') == true) {
            console.log("disliked it before by you");
            $(this).parent().find(".dislikebutton").removeClass('disliked_before').addClass('dislike');
            var dislike = parseInt($("#span_dis_" + contributions_pointer).text());
            dislike = dislike - 1;
            console.log(dislike);
            $("#span_dis_" + contributions_pointer).text(dislike);
            $(this).addClass('liked_before').removeClass('like');
            var value = parseInt($("#span_" + contributions_pointer).text());
            value = value + 1;
            $("#span_" + contributions_pointer).text(value);
        } else {
            console.log($(this).parent().children());
            console.log($(this).parent().children().hasClass('disliked_before'))
            console.log("check it before by you");
            $(this).addClass('liked_before').removeClass('like');
            var value = parseInt($("#span_" + contributions_pointer).text());
            value = value + 1;
            $("#span_" + contributions_pointer).text(value);
        }
        var rank = parseInt($("#span_score_" + contributions_pointer).text());
        var total_dis = parseInt($("#span_dis_" + contributions_pointer).text());
        var total_li = parseInt($("#span_" + contributions_pointer).text());
        console.log('like' + total_li + 'and Dislike' + ' ' + total_dis);
        var high_value = (total_li - total_dis);
        var low_value = (total_li + total_dis);

        if (high_value != 0 && low_value != 0) {
            rank = (high_value / low_value);
        } else {
            rank = 0;
        }
        $("#span_score_" + contributions_pointer).text(rank);
        $("#elem_" + contributions_pointer).attr('data-score', rank);
        cont_id = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
        let cont_index = document.unsel_obj.findIndex((item) => item.id === cont_id);
        document.unsel_obj[cont_index]['score'] = rank;
        document.unsel_obj[cont_index]['total_likes'] = total_li;
        document.unsel_obj[cont_index]['total_dislikes'] = total_dis;
        var sorted = Object.values(document.unsel_obj);
        let s_index = document.unsel_obj.findIndex((item) => item.selected === 1);
        if (s_index != -1) {
            var shifted = sorted.splice(s_index, 1);
            sorted.sort(function (a, b) {
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
            sorted.unshift(shifted[0]);

        } else {
            sorted.sort(function (a, b) {
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
        // console.log(jQuery.type(sorted))
         after_update = [];
        for (i = 0; i < Object.keys(sorted).length; i++) {
            after_update.push(sorted[i]);
        }
        console.log(after_update);
        var get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
        index = parseInt(after_update.findIndex((item) => item.id === get));
        previous = index - 1;
        if (previous >= 0) {
            prev_id = after_update[previous]['id'];
        }

        if (index < sorted.length - 1) {
            after = index + 1;
        } else {
            after = sorted.length - 1;
        }
        after_id = after_update[after]['id'];
        if (contributions_pointer != after_id) {
            if (index === 0) {
                detach = $("#elem_" + contributions_pointer).detach();
                $("#elem_" + after_id).before(detach);
            } else if (index > 0 || index === sorted.length - 1) {
                wraper = $("#elem_" + contributions_pointer).detach();
                $("#elem_" + prev_id).after(wraper);
            }
        }
        user = parseInt($('.user_id').attr("id"));
        $.ajax({
            type: 'POST',
            cache: false,
            url: 'ajax/contributionslikedislike.php',
            dataType: 'text',
            data: {contributions_pointer: contributions_pointer, ranking: rank, like: 1, lists_pointer: lists_pointer},
            success: function (data) {
                console.log(data)
                var objects = JSON.parse(data);
                load = [];
                if (typeof objects !== "undefined") {
                    for (var i = 0; i < Object.keys(objects).length; i++) {
                        load.push(objects[i]);
                    }
                    function equalArray(a, b) {
                        return JSON.stringify(a) == JSON.stringify(b);
                    }

                    if (equalArray(load, document.unsel_obj) == false) {
                        $("#loader").show();
                        changed_index = parseInt(after_update.findIndex((item) => item.id === contributions_pointer));
                        setInterval(function () {
                            $("#loader").hide();

                            $("#span_" + load[changed_index]['id']).text(load[changed_index]['total_likes']);
                            $("#span_score_" + load[changed_index]['id']).text(load[changed_index]['score']);
                            $("#elem_" + load[changed_index]['id']).attr('data-score', load[changed_index]['score']);
                        },500);
                    }
                    if(number.indexOf(get) == (load.length - 1)){

                        $(".load-more").hide();

                    }
                }
            },
        });
        number = [];
        $('.carousel').children().each(function () {
            number.push(parseInt($(this).attr("data_elem_id")));
        });
        console.log(number)
        last_id = parseInt($(".carousel li").last().attr('data_elem_id'));
        count = number.indexOf(get) + 1;
        $(".carousel").attr('data-count', count);
        var count_li =  parseInt($(".carousel").attr('data-count'));



        left_width = parseInt($('.element').width());
        distance = count_li * left_width + count_li * 10;
            $('.all-items').animate({'margin-left':  -distance   + 'px'}, {"duration": 1000, "easing": "linear"});
            // left = -distance ;

        $(window).resize(function () {
            var count_li =  parseInt($(".carousel").attr('data-count'));

            left_width = parseInt($('.element').width());
            distance = count_li * left_width + count_li * 10;
                $('.all-items').css('margin-left',  -distance  + 'px');

        });

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

    });


    $(".carousel").on('click', '.dislikebutton', function (e) {
        contributions_pointer = parseInt($(this).attr("data_field_id"));
        lists_pointer = parseInt($('.cont').text());
        if ($(this).hasClass('disliked_before')) {
            $(this).addClass('dislike').removeClass('disliked_before');
            var dislike = parseInt($("#span_dis_" + contributions_pointer).text());
            dislike = dislike - 1;
            $("#span_dis_" + contributions_pointer).text(dislike);
        } else if ($(this).parent().children().hasClass('liked_before') == true) {
            $(this).parent().find('.likebutton').removeClass('liked_before').addClass('like');
            var like = parseInt($("#span_" + contributions_pointer).text());
            like = like - 1;
            $("#span_" + contributions_pointer).text(like);
            $(this).addClass('disliked_before').removeClass('dislike');
            var dislike = parseInt($("#span_dis_" + contributions_pointer).text());
            dislike = dislike + 1;
            $("#span_dis_" + contributions_pointer).text(dislike);
        } else {
            $(this).addClass('disliked_before').removeClass('dislike');
            var value = parseInt($("#span_dis_" + contributions_pointer).text());
            value = value + 1;
            $("#span_dis_" + contributions_pointer).text(value);
        }
        var rank = parseInt($("#span_score_" + contributions_pointer).text());
        var total_dis = parseInt($("#span_dis_" + contributions_pointer).text());
        var total_li = parseInt($("#span_" + contributions_pointer).text());
        var high_value = (total_li - total_dis);
        var low_value = (total_li + total_dis);
        if (high_value != 0 && low_value != 0) {
            rank = (high_value / low_value);
        } else {
            rank = 0;
        }
        $("#span_score_" + contributions_pointer).text(rank);
        $("#elem_" + contributions_pointer).attr('data-score', rank);
        cont_id = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
        let cont_index = document.unsel_obj.findIndex((item) => item.id === cont_id);
        document.unsel_obj[cont_index]['score'] = rank;
        document.unsel_obj[cont_index]['total_likes'] = total_li;
        document.unsel_obj[cont_index]['total_dislikes'] = total_dis;
        sorted = Object.values(document.unsel_obj);
        s_index = document.unsel_obj.findIndex((item) => item.selected === 1);
        if (s_index != -1) {
            var shifted = sorted.splice(s_index, 1);
            sorted.sort(function (a, b) {
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
            sorted.unshift(shifted[0]);

        } else {
            sorted.sort(function (a, b) {
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
         after_update = [];
        for (i = 0; i < Object.keys(sorted).length; i++) {
            after_update.push(sorted[i]);
        }

        get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
        index = after_update.findIndex((item) => item.id === get);
        previous = index - 1;
        if (previous >= 0) {
            prev_id = after_update[previous]['id'];
        }
        else{
            if(parseInt($(".carousel li") > 0)) {
                prev_id = parseInt($(".carousel li").last().attr('data_elem_id'));
            }
        }
        number = [];
        $('.carousel').children().each(function () {
            number.push(parseInt($(this).attr("data_elem_id")));
        });
        if ($.inArray(prev_id, number) == -1) {
            prev_id = parseInt($(".carousel li").last().attr('data_elem_id'));
        }
        if (index < sorted.length - 1) {
            after = index + 1;
        } else {
            after = sorted.length - 1;
        }
        after_id = after_update[after]['id'];
        if (contributions_pointer != after_id) {
            if (index === 0) {
                detach = $("#elem_" + contributions_pointer).detach();
                $("#elem_" + after_id).before(detach);
            } else if (index > 0 || index === sorted.length - 1) {
                wraper = $("#elem_" + contributions_pointer).detach();
                $("#elem_" + prev_id).after(wraper);
            }
        } else {
            if (index === 0) {
                detach = $("#elem_" + contributions_pointer).detach();
                $("#elem_" + after_id).before(detach);
            } else if (index > 0 || index === sorted.length - 1) {
                wraper = $("#elem_" + contributions_pointer).detach();
                $("#elem_" + prev_id).after(wraper);
            }
        }
        user = parseInt($('.user_id').attr("id"));

        $.ajax({
            type: 'POST',
            cache: false,
            url: 'ajax/contributionslikedislike.php',
            dataType: 'json',
            data: ({
                contributions_pointer: contributions_pointer,
                ranking: rank,
                dislike: 1,
                lists_pointer: lists_pointer
            }),
            success: function (data) {
                console.log(jQuery.type(data));
                var objects = data;
                load = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        load.push(objects[i]);
                    }
                    function equalArray(a, b) {
                        return JSON.stringify(a) == JSON.stringify(b);
                    }

                    if (equalArray(load, document.unsel_obj) == false) {
                        $("#dis_loader").show();
                        changed_index = parseInt(after_update.findIndex((item) => item.id === contributions_pointer));
                        setInterval(function () {
                            $("#dis_loader").hide();
                            $("#span_dis_" + load[changed_index]['id']).text(load[changed_index]['total_dislikes']);
                            $("#span_score_" + load[changed_index]['id']).text(load[changed_index]['score']);
                            $("#elem_" + load[changed_index]['id']).attr('data-score', load[changed_index]['score']);
                        },500);
                    }

                    if(number.indexOf(get) == (load.length - 1)){

                        $(".load-more").hide();

                    }
                }

            }
        });
        var number = [];
        $('.carousel').children().each(function () {
            number.push(parseInt($(this).attr("data_elem_id")));
        });
        var array_load = [];
        for (i = 0; i < number.length; i++) {
            getindexs = after_update.findIndex((item) => item.id === number[i]);
            array_load.push(after_update[getindexs])
        }
        likeindex = array_load.findIndex((item) => item.id === contributions_pointer);
        kmove = likeindex + 1;
        var left_width = parseInt($('.element').width());
        var left_next = kmove * left_width + kmove * 10;

        $('.all-items').animate({'margin-left': -left_next  + 'px'}, {"duration": 1000, "easing": "linear"});
        $(window).resize(function () {
            var left_width = parseInt($('.element').width());
            var left_next = kmove * left_width + kmove * 10;
            $('.all-items').css('margin-left', -left_next + 'px');

        });

        last_id = parseInt($(".carousel li").last().attr('data_elem_id'));
        count = number.indexOf(get) + 1;
        $(".carousel").attr('data-count', count);
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
    });
});