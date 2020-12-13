$(document).ready(function () {
    $(".carousel_multi").on('click', '.multilikebutton', function (e) {
        multimedia_pointer = parseInt($(this).attr("data_field_id"));
        lists_pointer = parseInt($('.check-con').attr("id"));
        console.log(multimedia_pointer)

        if ($(this).hasClass('multiliked_before')) {
            $(this).addClass('multilike').removeClass('multiliked_before');
            var value = parseInt($("#multispan_" + multimedia_pointer).text());
            value = value - 1;
            $("#multispan_" + multimedia_pointer).text(value);
        } else if ($(this).parent().children().hasClass('multidisliked_before') == true) {
            $(this).parent().find(".dislikebutton").removeClass('disliked_before').addClass('dislike');
            var dislike = parseInt($("#multispan_dis_" + multimedia_pointer).text());
            dislike = dislike - 1;
            console.log(dislike);
            $("#multispan_dis_" + multimedia_pointer).text(dislike);
            $(this).addClass('multiliked_before').removeClass('multilike');
            var value = parseInt($("#multispan_" + multimedia_pointer).text());
            value = value + 1;
            $("#multispan_" + multimedia_pointer).text(value);

        } else {
            $(this).addClass('multiliked_before').removeClass('multilike');
            var value = parseInt($("#multispan_" + multimedia_pointer).text());
            value = value + 1;
            $("#multispan_" + multimedia_pointer).text(value);
        }

        var rank = parseInt($("#multispan_score_" + multimedia_pointer).text());
        var total_dis = parseInt($("#multispan_dis_" + multimedia_pointer).text());
        var total_li = parseInt($("#multispan_" + multimedia_pointer).text());
        console.log('like' + total_li + 'and Dislike' + ' ' + total_dis);
        var high_value = (total_li - total_dis);
        var low_value = (total_li + total_dis);

        if (high_value != 0 && low_value != 0) {
            rank = (high_value / low_value);
        } else {
            rank = 0;
        }
        $("#multispan_score_" + multimedia_pointer).text(rank);
        $("#multi_elem_" + multimedia_pointer).attr('data-score', rank);
        cont_id = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
        let cont_index = document.multiunsel_obj.findIndex((item) => item.id === cont_id);
        document.multiunsel_obj[cont_index]['score'] = rank;
        document.multiunsel_obj[cont_index]['total_likes'] = total_li;
        document.multiunsel_obj[cont_index]['total_dislikes'] = total_dis;
        var sorted = Object.values(document.multiunsel_obj);
        let s_index = document.multiunsel_obj.findIndex((item) => item.selected === 1);
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
        get = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
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
        if (multimedia_pointer != after_id) {
            if (index === 0) {
                detach = $("#multi_elem_" + multimedia_pointer).detach();
                $("#multi_elem_" + after_id).before(detach);
            } else if (index > 0 || index === sorted.length - 1) {
                wraper = $("#multi_elem_" + multimedia_pointer).detach();
                $("#multi_elem_" + prev_id).after(wraper);
            }
        }
        user = parseInt($('.user_id').attr("id"));
        $.ajax({
            type: 'POST',
            cache: false,
            url: 'ajax/multimedialikedislike.php',
            dataType: 'text',
            data: {multimedia_pointer: multimedia_pointer, ranking: rank, like: 1, lists_pointer: lists_pointer},
            success: function (data) {
                console.log(data)
                 objects = JSON.parse(data);
                load = [];
                if (typeof objects !== "undefined") {

                    for (i = 0; i < Object.keys(objects).length; i++) {
                        load.push(objects[i]);
                    }
console.log(load)
                    function equalArray(a, b) {
                        return JSON.stringify(a) == JSON.stringify(b);
                    }

                    if (equalArray(load, document.unsel_obj) == false) {
                        $("#loader").show();
                        changed_index = parseInt(after_update.findIndex((item) => item.id === multimedia_pointer));
                        console.log(changed_index)
                        setInterval(function () {
                            $("#loader").hide();
                            $("#multispan_" + load[changed_index]['id']).text(load[changed_index]['total_likes']);
                            $("#multispan_score_" + load[changed_index]['id']).text(load[changed_index]['score']);
                            $("#multi_elem_" + load[changed_index]['id']).attr('data-score', load[changed_index]['score']);
                        }, 500);
                    }
                    if(load.indexOf(get) == (load.length - 1)){

                        $(".multiload-more").hide();

                    }
                }
            },
        });

        number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });
        console.log(number)
        last_id = parseInt($(".carousel li").last().attr('data_multi_elem_id'));
        count = number.indexOf(get) + 1;
        $(".carousel_multi").attr('data-count', count);
        var multi_count = parseInt($(".carousel_multi").attr('data-count'));
        left_width = parseInt($('.multi-element').width());
        distance = multi_count * left_width + multi_count * 10;
        // distance = $("#multi_elem_" + multimedia_pointer).offset().left - $('.all-items-multi').offset().left;
        console.log(distance)
        $('.all-items-multi').animate({'margin-left': -distance + 'px'}, {
            "duration": 1000,
            "easing": "linear"
        });
        left = -distance;

        $(window).resize(function () {
            var multi_count = parseInt($(".carousel_multi").attr('data-count'));
            left_width = parseInt($('.element').width());
            distance = multi_count * left_width + multi_count * 10;
            $('.all-items-multi').css('margin-left', -distance  + 'px');

        });


        if (count == 0) {
            $(".multiprev-load-more").hide();
            $(".multiload-more").show();
        }

    });

    $(".carousel_multi").on('click', '.multidislikebutton', function (e) {

        multimedia_pointer = parseInt($(this).attr("data_field_id"));
        lists_pointer = parseInt($('.check-con').attr("id"));
        if ($(this).hasClass('multidisliked_before')) {
            $(this).addClass('multidislike').removeClass('multidisliked_before');
            var dislike = parseInt($("#multispan_dis_" + multimedia_pointer).text());
            dislike = dislike - 1;
            $("#multispan_dis_" + multimedia_pointer).text(dislike);
        } else if ($(this).parent().children().hasClass('multiliked_before') == true) {
            $(this).parent().find('.multilikebutton').removeClass('multiliked_before').addClass('multilike');
            var like = parseInt($("#multispan_" + multimedia_pointer).text());
            like = like - 1;
            $("#multispan_" + multimedia_pointer).text(like);
            $(this).addClass('multidisliked_before').removeClass('multidislike');
            var dislike = parseInt($("#multispan_dis_" + multimedia_pointer).text());
            dislike = dislike + 1;
            $("#multispan_dis_" + multimedia_pointer).text(dislike);
        } else {
            $(this).addClass('multidisliked_before').removeClass('multidislike');
            var value = parseInt($("#multispan_dis_" + multimedia_pointer).text());
            value = value + 1;
            $("#multispan_dis_" + multimedia_pointer).text(value);
        }
        var rank = parseInt($("#multispan_score_" + multimedia_pointer).text());
        var total_dis = parseInt($("#multispan_dis_" + multimedia_pointer).text());
        var total_li = parseInt($("#multispan_" + multimedia_pointer).text());
        var high_value = (total_li - total_dis);
        var low_value = (total_li + total_dis);
        if (high_value != 0 && low_value != 0) {
            rank = (high_value / low_value);
        } else {
            rank = 0;
        }
        $("#multispan_score_" + multimedia_pointer).text(rank);
        $("#multi_elem_" + multimedia_pointer).attr('data-score', rank);
        cont_id = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
        let cont_index = document.multiunsel_obj.findIndex((item) => item.id === cont_id);
        document.multiunsel_obj[cont_index]['score'] = rank;
        document.multiunsel_obj[cont_index]['total_likes'] = total_li;
        document.multiunsel_obj[cont_index]['total_dislikes'] = total_dis;
        sorted = Object.values(document.multiunsel_obj);
        s_index = document.multiunsel_obj.findIndex((item) => item.selected === 1);
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

        get = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
        index = after_update.findIndex((item) => item.id === get);
        console.log("this is the liked index" + index)
        previous = index - 1;
        if (previous >= 0) {
            console.log("this is if");
            prev_id = after_update[previous]['id'];
        }
        else {
            console.log("this is else");
            if ( parseInt($(".carousel_multi li").length) > 0) {
                console.log("The list number is greater than zero")
                prev_id = parseInt($(".carousel_multi li").last().attr('data_multi_elem_id'));
            }
            else{
                console.log("something is happened with carousel list length")
            }
        }
        number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });
        if ($.inArray(prev_id, number) == -1) {
            prev_id = parseInt($(".carousel_multi li").last().attr('data_multi_elem_id'));
        }
        if (index < sorted.length - 1) {
            after = index + 1;
        } else {
            after = sorted.length - 1;
        }
        after_id = after_update[after]['id'];
        if (multimedia_pointer != after_id) {
            if (index === 0) {
                detach = $("#multi_elem_" + multimedia_pointer).detach();
                $("#multi_elem_" + after_id).before(detach);
            } else if (index > 0 || index === sorted.length - 1) {
                wraper = $("#multi_elem_" + multimedia_pointer).detach();
                $("#multi_elem_" + prev_id).after(wraper);
            }
        } else {
            if (index === 0) {
                detach = $("#multi_elem_" + multimedia_pointer).detach();
                $("#multi_elem_" + after_id).before(detach);
            } else if (index > 0 || index === sorted.length - 1) {
                wraper = $("#multi_elem_" + multimedia_pointer).detach();
                $("#multi_elem_" + prev_id).after(wraper);
            }
        }
        user = parseInt($('.user_id').attr("id"));

        $.ajax({
            type: 'POST',
            cache: false,
            url: 'ajax/multimedialikedislike.php',
            dataType: 'json',
            data: ({
                multimedia_pointer: multimedia_pointer,
                ranking: rank,
                dislike: 1,
                lists_pointer: lists_pointer
            }),
            success: function (data) {
                console.log(data)
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

                    if (equalArray(load, document.multiunsel_obj) == false) {
                        $("#dis_loader").show();
                        changed_index = parseInt(after_update.findIndex((item) => item.id === multimedia_pointer));
                        setInterval(function () {
                            $("#dis_loader").hide();
                            $("#multispan_dis_" + load[changed_index]['id']).text(load[changed_index]['total_dislikes']);
                            $("#multispan_score_" + load[changed_index]['id']).text(load[changed_index]['score']);
                            $("#multi_elem_" + load[changed_index]['id']).attr('data-score', load[changed_index]['score']);
                        }, 500);
                    }
                    alert(number.indexOf(get));

                    if(number.indexOf(get) == (load.length - 1)){

                        $(".multiload-more").hide();

                    }
                }

            }
        });
        var number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });
        var array_load = [];
        for (i = 0; i < number.length; i++) {
            getindexs = after_update.findIndex((item) => item.id === number[i]);
            array_load.push(after_update[getindexs])
        }
        likeindex = array_load.findIndex((item) => item.id === multimedia_pointer);
        kmove = likeindex + 1;
        var left_width = parseInt($('.element').width());
        var left_next = kmove * left_width + kmove * 10;

        $('.all-items-multi').animate({'margin-left': -left_next + 'px'}, {"duration": 1000, "easing": "linear"});
        $(window).resize(function () {
            var left_width = parseInt($('.element').width());
            var left_next = kmove * left_width + kmove * 10;
            $('.all-items-multi').css('margin-left', -left_next + 'px');

        });

        last_id = parseInt($(".carousel_multi li").last().attr('data_multi_elem_id'));
        count = number.indexOf(get) + 1;
        $(".carousel_multi").attr('data-count', count);

        if (count == 0) {
            $(".multiprev-load-more").hide();
            $(".multiload-more").show();
        }



    });
});
