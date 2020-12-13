$(document).ready(function () {
    lists_pointer = parseInt($('.cont').text());

    $(".carousel_multi").on('click', '.multiselect', function (e) {
        multimedia_pointer = $(this).attr("data_field_id");

        $(".multiload-more").show();
        var multcount = 1;
        $(".carousel_multi").attr('data-count', multcount);


        var sel = document.multiunsel_obj[0]['id'];
        $("#multi_elem_" + multimedia_pointer).siblings().attr('data-select-at', 0);
        if ($(this).hasClass('not_selected') == true) {
            console.log("first if")
            if ($(this).parents().find(".multi-element").siblings().children().find("[id^=select_]").hasClass('selected') == true) {

                $(this).parents().find(".multi-element").siblings().children().find("[id^=select_]").addClass('not_selected').removeClass('selected');
                $(this).addClass('selected').removeClass('not_selected');
                select = 1;

                $("#multi_elem_" + multimedia_pointer).attr('data-select-at', 1);
                get = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
                index = document.multiunsel_obj.findIndex((item) => item.id === get);
                document.multiunsel_obj[0]['selected'] = 0;
                document.multiunsel_obj[index]['selected'] = 1;
                check_sel = document.multiunsel_obj.findIndex((item) => item.selected === 1);
                var b = document.multiunsel_obj[check_sel];
                document.multiunsel_obj[check_sel] = document.multiunsel_obj[0];
                document.multiunsel_obj[0] = b;
                update_version = document.multiunsel_obj;
                document.multiunsel_obj = update_version;
                gets = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
                indexs = document.multiunsel_obj.findIndex((item) => item.id === gets);
                first = document.multiunsel_obj[0]['id'];
                if (sel != first) {
                    var copy_from = $("#multi_elem_" + first).clone(true);
                    var copy_to = $("#multi_elem_" + sel).clone(true);
                    $("#multi_elem_" + first).replaceWith(copy_to);
                    $("#multi_elem_" + sel).replaceWith(copy_from);
                }
            } else {
                console.log("checking")
                select = 1;
                $(this).addClass('selected').removeClass('not_selected');
                $("#multi_elem_" + multimedia_pointer).attr('data-select-at', 1);
                get = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
                index_get = document.multiunsel_obj.findIndex((item) => item.id === get);
                document.multiunsel_obj[index_get]['selected'] = 1;
                var first = document.multiunsel_obj[0]['id'];
                var second = document.multiunsel_obj[index_get]['id'];
                if (first != second) {
                    var copy_from = $("#multi_elem_" + first).clone(true);
                    var copy_to = $("#multi_elem_" + second).clone(true);
                    console.log($("#multi_elem_" + first));
                    console.log($("#multi_elem_" + second));
                    $('.carousel_multi li:nth-child(1)').before($("#multi_elem_" + second))
                }
            }
        }
        else {
            console.log("i am checking this")
            $(this).addClass('not_selected').removeClass('selected');
            $("#multi_elem_" + multimedia_pointer).attr('data-select-at', 0);
            select = 0;
            var get = parseInt($("#multi_elem_" + multimedia_pointer).attr("data_multi_elem_id"));
            index = document.multiunsel_obj.findIndex((item) => item.id === get);
            document.multiunsel_obj[index]['selected'] = 0;


            var sorted = Object.values(document.multiunsel_obj);
            multi_index = document.multiunsel_obj.findIndex((item) => item.selected === 1);
            if (multi_index != -1) {
                var shifted = sorted.splice(multi_index, 1);
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
            selindex = after_update.findIndex((item) => item.id === get);
            if (selindex > 0) {
                console.log("the index is greater than zero")
                var second = after_update[selindex - 1]['id'];
                console.log(second)

                number = [];
                $('.carousel_multi').children().each(function () {
                    number.push(parseInt($(this).attr("data_multi_elem_id")));
                });
                checkitem = number.includes(second);
                console.log(checkitem);

                var copy_from = $("#multi_elem_" + multimedia_pointer).detach();
                console.log($("#multi_elem_" + second))
                console.log(copy_from)

                if(checkitem == false){

                    console.log("this is in check false")
                    $(".carousel_multi li").last().after(copy_from)
                    $(".carousel_multi").attr('data-count', number.length);
                }
                else {
                    console.log("this is in check true")
                    $("#multi_elem_" + second).after(copy_from)
                    $(".carousel_multi").attr('data-count', selindex + 1);
                }

            }

        }


        var selection_count = parseInt($(".carousel_multi").attr('data-count'));
        var selectionleft_width = parseInt($('.multi-element').width());
        var selection_distance = selection_count * selectionleft_width + selection_count * 10;

        $('.all-items-multi').animate({'margin-left': -selection_distance + 'px'}, {
            "duration": 1000,
            "easing": "linear"
        });
        $(window).resize(function () {
            var selection_count = parseInt($(".carousel_multi").attr('data-count'));
            var selectionleft_width = parseInt($('.multi-element').width());
            var selection_distance = selection_count * selectionleft_width + selection_count * 10;
            $('.all-items-multi').css('margin-left', -selection_distance + 'px');
        });

        $.ajax({
            type: "POST",
            url: 'ajax/imagecreator_sel.php',
            data: {multimedia_pointer: multimedia_pointer, lists_pointer: lists_pointer, select: select},
            success: function (data) {
                console.log(data);
                var objects = JSON.parse(data);
                selload = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        selload.push(objects[i]);
                    }

                    // document.multiunsel_obj = selload;
                    //
                    // console.log( document.multiunsel_obj);
                    // console.log(selload.length);
                    if (selection_count === 0) {
                        $(".multiprev-load-more").hide()
                    }

                    if (selection_count == selload.length) {
                        $(".multiload-more").hide();
                    }
                }
            }
        });
        console.log(document.multiunsel_obj)

    });

});