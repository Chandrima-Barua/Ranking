$(document).ready(function () {
    $(".carousel").on('click', '.select', function (e) {
        lists_pointer = parseInt($('.cont').text());

        selectioncount = 1;
        if (!$.trim($('.mainc').html()).length == false) {
            $('.all-items').animate({'margin-left': -532 + 'px'}, {"duration": 1000, "easing": "linear"});

            left = -532;
        } else {
            $('.all-items').animate({'margin-left': -0 + 'px'}, {"duration": 1000, "easing": "linear"});

            left = 0;
        }
        row = 0;
        $(".carousel").attr('data-count', selectioncount);
        $(window).resize(function () {
            if (!$.trim($('.mainc').html()).length == false) {
                left = parseInt($(".all-items").width() - 85);
                $('.all-items').css('margin-left', -left + 'px');

            } else {
                left = 0;
                $('.all-items').css('margin-left', left + 'px');
            }

        });
        $(".load-more").show();
        var sel = document.unsel_obj[0]['id'];
        contributions_pointer = $(this).attr("data_field_id");
        $("#elem_" + contributions_pointer).siblings().attr('data-select-at', 0);
        $("#elem_" + contributions_pointer).attr('data-select-at', 1);
        if ($(this).hasClass('not_selected')) {
            $(this).addClass('selected').removeClass('not_selected');
            // $(this).val('Unselect');
            select = 1;
            console.log($(this).parent().parent().parent().parent().siblings().children().children().find("[id^=select_]"));
            if ($(this).parent().parent().parent().parent().siblings().children().children().find("[id^=select_]").hasClass('selected')) {
                $(this).parent().parent().parent().parent().siblings().children().children().find("[id^=select_]").addClass('not_selected').removeClass('selected');
// console.log( $(this).parent().parent().parent().siblings());
                get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
                // console.log(get);
                index = document.unsel_obj.findIndex((item) => item.id === get);
                document.unsel_obj[0]['selected'] = 0;
                // console.log(sorted_load[0]);
                document.unsel_obj[index]['selected'] = 1;
                check_sel = document.unsel_obj.findIndex((item) => item.selected === 1);
                var b = document.unsel_obj[check_sel];
                document.unsel_obj[check_sel] = document.unsel_obj[0];
                document.unsel_obj[0] = b;
                update_version = document.unsel_obj;
                document.unsel_obj = update_version;
                // console.log(sorted_load);
                gets = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
                indexs = document.unsel_obj.findIndex((item) => item.id === gets);
                first = document.unsel_obj[0]['id'];
                // console.log(first);
                var copy_from = $("#elem_" + first).clone(true);
                var copy_to = $("#elem_" + sel).clone(true);
                // console.log($("#elem_" + sel));
                // console.log($("#elem_" + first));
                $("#elem_" + first).replaceWith(copy_to);
                $("#elem_" + sel).replaceWith(copy_from);
            } else {
                get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
                index_get = document.unsel_obj.findIndex((item) => item.id === get);
                document.unsel_obj[index_get]['selected'] = 1;
                first = document.unsel_obj[0]['id'];
                var copy_from = $("#elem_" + first).clone(true);
                var copy_to = $("#elem_" + get).clone(true);
                console.log($("#elem_" + get));
                console.log($("#elem_" + first));
                // $("#elem_" + get).replaceWith(copy_from);
                $('.carousel li:nth-child(1)').before($("#elem_" + get))
                // $("#elem_" + first).replaceWith(copy_to);
                // $("#elem_" + contributions_pointer).attr('data-select-at', select);
            }
        } else if ($(this).hasClass('selected')) {
            $(this).addClass('not_selected').removeClass('selected');
            lists_pointer = parseInt($('.cont').text());
            select = 0;
            get = parseInt($("#elem_" + contributions_pointer).attr("data_elem_id"));
            index = document.unsel_obj.findIndex((item) => item.id === get);
            document.unsel_obj[index]['selected'] = 0;

        }
        $.ajax({
            type: "POST",
            url: 'ajax/creator_sel.php',
            data: {contributions_pointer: contributions_pointer, lists_pointer: lists_pointer, select: select},
            success: function (data) {
                console.log(data);
            }
        });
        if (left === 0) {
            $(".prev-load-more").hide();
        }
    });

});