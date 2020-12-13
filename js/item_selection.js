$(document).ready(function () {
    lists_pointer = parseInt($('.cont').text());
    $(".carousel").on('click', '.select', function (e) {
        contributions_pointer = $(this).attr("data_field_id");
        $(".load-more").show();
        selectioncount = 1;

        $(".carousel").attr('data-count', selectioncount);


        var sel = document.unsel_obj[0]['id'];

        $("#elem_" + contributions_pointer).siblings().attr('data-select-at', 0);
        if ($(this).hasClass('not_selected')) {

            if ($(this).parents().find(".element").siblings().children().find("[id^=select_]").hasClass('selected') == true) {
                $(this).parents().find(".element").siblings().children().find("[id^=select_]").addClass('not_selected').removeClass('selected');
                $(this).addClass('selected').removeClass('not_selected');
                select = 1;
                $("#elem_" + contributions_pointer).attr('data-select-at', 1);
                var get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
                index = document.unsel_obj.findIndex((item) => item.id === get);
                document.unsel_obj[0]['selected'] = 0;
                document.unsel_obj[index]['selected'] = 1;
                check_sel = document.unsel_obj.findIndex((item) => item.selected === 1);
                var b = document.unsel_obj[check_sel];
                document.unsel_obj[check_sel] = document.unsel_obj[0];
                document.unsel_obj[0] = b;
                update_version = document.unsel_obj;
                document.unsel_obj = update_version;
                gets = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
                indexs = document.unsel_obj.findIndex((item) => item.id === gets);
                first = document.unsel_obj[0]['id'];

                if (sel != first) {

                    var copy_from = $("#elem_" + first).clone(true);
                    var copy_to = $("#elem_" + sel).clone(true);
                    $("#elem_" + first).replaceWith(copy_to);
                    $("#elem_" + sel).replaceWith(copy_from);
                }
            }
            else {
                select = 1;
                $(this).addClass('selected').removeClass('not_selected');
                $("#elem_" + contributions_pointer).attr('data-select-at', 1);
                get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
                index_get = document.unsel_obj.findIndex((item) => item.id === get);
                document.unsel_obj[index_get]['selected'] = 1;
                var first = document.unsel_obj[0]['id'];
                var second = document.unsel_obj[index_get]['id'];
                if (first != second) {
                    var copy_from = $("#elem_" + first).clone(true);
                    var copy_to = $("#elem_" + second).clone(true);

                    $('.carousel li:nth-child(1)').before($("#elem_" + second))
                }
            }
        }

        else {
            $(this).addClass('not_selected').removeClass('selected');
            $("#elem_" + contributions_pointer).attr('data-select-at', 0);
            select = 0;
            var get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
            index = document.unsel_obj.findIndex((item) => item.id === get);
            document.unsel_obj[index]['selected'] = 0;

            var sorted = Object.values(document.unsel_obj);
            listindex = document.unsel_obj.findIndex((item) => item.selected === 1);
            if (listindex != -1) {
                var shifted = sorted.splice(listindex, 1);
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
            console.log(after_update)
            var selindex = after_update.findIndex((item) => item.id === get);
            if (selindex > 0) {
                console.log("the index is greater than zero")
                var second = after_update[selindex - 1]['id'];
                console.log(second)

                number = [];
                $('.carousel').children().each(function () {
                    number.push(parseInt($(this).attr("data_elem_id")));
                });
                checkitem = number.includes(second);
                console.log(checkitem);

                var copy_from = $("#elem_" + contributions_pointer).detach();
                console.log($("#elem_" + second))
                console.log(copy_from)

                if(checkitem == false){

                    console.log("this is in check false")
                    $(".carousel li").last().after(copy_from)
                    $(".carousel").attr('data-count', number.length);
                }
                else {
                    console.log("this is in check true");
                    $("#elem_" + second).after(copy_from);
                    $(".carousel").attr('data-count', selindex + 1);
                }

            }

        }

        var selectionli = parseInt($(".carousel").attr('data-count'));
        var selectionlileft_width = parseInt($('.element').width());
        var selectionli_distance = selectionli * selectionlileft_width + selectionli * 10;

        $('.all-items').animate({'margin-left': -selectionli_distance + 'px'}, {
            "duration": 1000,
            "easing": "linear"
        });

        $(window).resize(function () {
            var selectionli = parseInt($(".carousel").attr('data-count'));
            var selectionlileft_width = parseInt($('.element').width());
            var selectionli_distance = selectionli * selectionlileft_width + selectionli * 10;

            $('.all-items').css('margin-left', -selectionli_distance + 'px');
        });

        $.ajax({
            type: "POST",
            url: 'ajax/creator_sel.php',
            data: {contributions_pointer: contributions_pointer, lists_pointer: lists_pointer, select: select},
            success: function (data) {
                console.log(data);
                var objects = JSON.parse(data);
                seload = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        seload.push(objects[i]);
                    }


                    if (selectionli === 0) {
                        $(".prev-load-more").hide()
                    }

                    if (selectionli == seload.length) {
                        $(".load-more").hide();
                    }
                }
            }
        });
        // if (left === 0) {
        //     $(".prev-load-more").hide();
        // }
    });

});